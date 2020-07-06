import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, Button, Modal, DropdownButton, Dropdown, Image } from "react-bootstrap";
import { makeStyles } from '@material-ui/core';
import { Link } from "react-router-dom";
import useStyles from "./styles.js";
import store from "../../redux/store";
import { connect } from "react-redux";
import input from "react-validation/build/input";
import validator from 'validator';


function NavigationBar(props) {
    const [showSignin, setSigninShow] = useState(false);
    const [showSignup, setSignupShow] = useState(false);
    const [fullname, setname] = useState("");
    const [mobileno, setmobileno] = useState(0);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [userType, setUserType] = useState("publicUser");
    const [description, setDescription] = useState("");
    const signinClose = () => setSigninShow(false);
    const signinShow = () => setSigninShow(true);
    const signupClose = () => setSignupShow(false);
    const signupShow = () => setSignupShow(true);
    //handle props
    // useEffect(()=>{},[props.logedIn])

    const handleSignIn = () => {
        if(email=="admin"){
            store.dispatch({
                type: "login",
                payload: {
                    email: email,
                    password: password,
                    userType:userType
                }
            })
            signinClose();
        }
        else if(!validator.isEmail(email)) {
            document.getElementById("email").style.borderColor="red";
            return alert("enter credentials correctly ")
        }
        else if(validator.isEmpty(password) || validator.isEmpty(userType)){
            return alert("Complete all the fields ")
        }
        else{store.dispatch({
            type: "login",
            payload: {
                email: email,
                password: password,
                userType:userType
            }
        })
        signinClose();}
    }
    const handleSignUp = () => {
        if(!validator.isEmail(email)){
            document.getElementById("semail").style.borderColor="red";
            return alert("enter correct values ")
        }
        else if(validator.isEmpty(password) || validator.isEmpty(userType) || validator.isEmpty(mobileno) || validator.isEmpty(fullname)){
            return alert("Complete  the remaining fields ")
        }
        store.dispatch({
            type: "signup",
            payload: {
                name: fullname,
                email: email,
                password: password,
                number: mobileno,
                userType: userType,
                description: description
            }
        })
        signupClose()
    }
    const openSignupForm = () => {
        signinClose();
        signupShow()
    }

    const logOut = () => {
        store.dispatch({
            type: "logout",
        })
    }

    const openDashboard = () => {
        console.log("checking user type ")
        const type = props.userinfo.type
        if (type == "architechturer") {
            return <Nav.Link as="div" className={classes.items}><Link className={classes.items} to="/dashboard" >Dasboard</Link></Nav.Link>

        }
    }
    const classes = useStyles();

    return (
        <Navbar collapseOnSelect expand="lg" bg="light">
            <Navbar.Brand href="#home">
                <Link to="/">
                    <Image src={require("../../images/logo.png")} rounded
                        style={{ height: 70, width: 140 }} /></Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto" style={{ backgroundColor: "#0594a9", marginRight: "2%", borderRadius: 5 }} >
                    <Nav.Link as="div" className={classes.items}><Link className={classes.items} to="/">Home</Link></Nav.Link>
                    <Nav.Link as="div" className={classes.items}><Link className={classes.items} to="/materialsPage" >Material Price</Link></Nav.Link>
                    <Nav.Link as="div" className={classes.items}><Link className={classes.items} to="/architecturers" >Architecturers</Link></Nav.Link>
                    <Nav.Link as="div" className={classes.items}><Link className={classes.items} to="/builders" >builders</Link></Nav.Link>
                    <Nav.Link as="div" className={classes.items}><Link className={classes.items} to="/" >Cost Estimator</Link></Nav.Link>
                    <Nav.Link as="div" className={classes.items}><Link className={classes.items} to="/about">About Us</Link></Nav.Link>
                    {/* {
                        props.userinfo!=undefined && props.userinfo.user=="admin"? 
                    <Nav.Link as="div" className={classes.items}><Link className={classes.items} to="/dashboard" >Dasboard</Link></Nav.Link> : null

                    } */}
                    {/* {openDashboard()} */}
                </Nav>
                {props.logedIn ?
                    <Button size="lg" className={classes.signinButton} onClick={logOut}>Logout</Button> :
                    <Button size="lg" className={classes.signinButton} onClick={signinShow}>Sign in/up</Button>
                }
                <Modal show={showSignin} onHide={signinClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control id="email" className={classes.formItems} type="email" placeholder="email" onChange={(e) => { setemail(e.target.value) }} />
                        <Form.Control className={classes.formItems} type="password" placeholder="Password"
                            onChange={(e) => { setpassword(e.target.value) }} />
                        <Form.Control className={classes.formItems} as="select" id="dropdown-basic-button" onChange={(e) => {
                            setUserType(e.target.value)}}>
                            <option value="publicUser" >select one</option>
                            <option value="publicUser" >Open user</option>
                            <option value="architechturer" >Architechturer</option>
                            <option value="builder" >Builder</option>
                            <option value="admin" >Admin</option>
                        </Form.Control>
                        <Button variant="link" onClick={openSignupForm}>Create new account</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={signinClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSignIn}>
                            SignIn
                        </Button>


                    </Modal.Footer>
                </Modal>
                <Modal show={showSignup} onHide={signupClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control className={classes.formItems} type="text" placeholder="Enter fullname" onChange={(e) => { setname(e.target.value) }} />
                        <Form.Control id="semail" className={classes.formItems} type="email" placeholder="Enter your email" onChange={(e) => { setemail(e.target.value) }} />
                        <Form.Control className={classes.formItems} type="password" placeholder="Enter Password" onChange={(e) => { setpassword(e.target.value) }} />
                        <Form.Control className={classes.formItems} type="number" placeholder="Enter your mobile no" onChange={(e) => { setmobileno(e.target.value); }} />
                        <Form.Label className={classes.formItems}>Select user type</Form.Label>
                        <Form.Control  as="select" id="dropdown-basic-button" onChange={(e) => {
                            setUserType(e.target.value)
                            console.log(e.target.value)
                        }}>
                            <option value="publicUser" >select one</option>
                            <option value="publicUser" >Open user</option>
                            <option value="architechturer" >Architechturer</option>
                            <option value="builder" >Builder</option>
                        </Form.Control>
                        <Form.Control as="textarea" className={classes.formItems} type="text" placeholder="Describe yourself(only for architecturers/builders) "
                            onChange={(e) => { setDescription(e.target.value) }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={signupClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSignUp}>
                            SignUp
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Navbar.Collapse>
        </Navbar>
    )
}

const loginStatus = (store) => {
    console.log("login status ", store.loginReducer.logedIn)
    return { logedIn: store.loginReducer.logedIn, user: store.loginReducer.user }


}

let nNavigationBar = connect(loginStatus)(NavigationBar);
export default nNavigationBar;
import React,{useState} from 'react';
import { Container, Row, Col, Button, Image,Modal,Form} from "react-bootstrap";
import { makeStyles } from "@material-ui/core"
import facebook from "../../images/fb.png";
import twitter from "../../images/twitter.png";
import google from "../../images/google.png";
import linkedin from "../../images/linkedin.png";
import { Link } from "react-router-dom";
import store from "../../redux/store";


const useStyles = makeStyles((theme) => ({
    socialIcons: {
        height: "6%",
        width: "6%",
        paddingLeft: "1%",
        paddingRight: "1%",
        marginTop: "2%",
        marginBottom: "2%",
    },
    registerButton: {
        flex: 1,
        justifyContent: "center",
        borderTop: "2px solid "
    },
    registerButtonItems: {
        marginTop: "2%",
        marginBottom: "2%",
    },
    listItems: {
        listStyleType: "circle",
        fontSize: 18,
        color: "#898ba2"
    },
    links: {
        color: "#898ba2"
    },
    formItems:{
        marginTop:"3%"
    }
}));

export default function Footer() {
    const [showSignup, setSignupShow] = useState(false);
    const [fullname, setname] = useState("");
    const [mobileno, setmobileno] = useState(0);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [userType, setUserType] = useState("publicUser");
    const [description, setDescription] = useState("");
    const classes = useStyles();

    const signupClose = () => setSignupShow(false);
    const signupShow = () => setSignupShow(true);

    const handleSignUp = () => {
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

    return (
        <div style={{ backgroundColor: "#0f101a", paddingTop: "4%" }}>
            <Container >
                <Row style={{ color: "#898ba2" }}>
                    <Col md>
                        <h3>Who we are? </h3>
                        <p>
                            H.C.E is one of the Pakistan’s leading property websites,focussed on
                            helping house-hunters in all tiers of the market to find their next home.
                        <br />Our platforms provide an easy to use but sophisticated online property search
                        and other home solutions.
                        </p>
                    </Col >
                    <Col md >
                        <h3 >HCE.pk </h3>
                        <ul>
                            <li className={classes.listItems}><Link className={classes.links} to="/about" >About us</Link></li>
                            <li className={classes.listItems}><Link className={classes.links} to="/contactUs" >Contact us</Link></li>
                            <li className={classes.listItems}><Link className={classes.links} to="/" >Testimonials</Link></li>
                            <li className={classes.listItems}><Link className={classes.links} to="/privacy-policy" >Privacy Policy</Link></li>
                            <li className={classes.listItems}><Link className={classes.links} to="/terms-of-use" >Terms of Use</Link></li>
                        </ul>
                    </Col>
                    <Col md>
                        <h3>Address </h3>
                        <p>
                            PWD Islamabad<br />Office No. 6<br />Furqan Plaza Opposite Taqwa Mall <br />Pakistan
                            <br />Cell: +92-311-0777666 (whatsapp)
                            <br />Email : info@hce.pk
                        </p>
                    </Col>
                </Row>
                <Row className={classes.registerButton}>
                    <h2 style={{ marginRight: "2%", color: "#898ba2", }} className={classes.registerButtonItems}>Register for free</h2>
                    <Button variant="danger" size="lg" style={{ borderRadius: "50px" }} className={classes.registerButtonItems}
                        onClick={signupShow} >Sign UP!
                    </Button>
                </Row>
                <Row style={{ flex: 1, justifyContent: "center", borderTop: "2px solid " }}>
                    <a href="https://www.facebook.com/" className={classes.socialIcons} ><Image src={facebook} roundedCircle /></a>
                    <a href="https://www.twitter.com/" className={classes.socialIcons} ><Image src={twitter} /></a>
                    <a href="https://www.google.com/" className={classes.socialIcons} ><Image src={google} /></a>
                    <a href="https://www.linkedin.com/" className={classes.socialIcons} ><Image src={linkedin} /></a>
                </Row>
            </Container>
            <Modal show={showSignup} onHide={signupClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control className={classes.formItems} type="text" placeholder="Enter fullname" onChange={(e) => { setname(e.target.value) }} />
                    <Form.Control className={classes.formItems} type="email" placeholder="Enter your email" onChange={(e) => { setemail(e.target.value) }} />
                    <Form.Control className={classes.formItems} type="password" placeholder="Enter Password" onChange={(e) => { setpassword(e.target.value) }} />
                    <Form.Control className={classes.formItems} type="number" placeholder="Enter your mobile no" onChange={(e) => { setmobileno(e.target.value) }} />
                    <Form.Label className={classes.formItems}>Select user type</Form.Label>
                    <Form.Control as="select" id="dropdown-basic-button" onChange={(e) => {
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
        </div>
    )
}

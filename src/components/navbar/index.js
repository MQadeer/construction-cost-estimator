import React from 'react';
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { makeStyles } from '@material-ui/core';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    items: {
        color: "white",
        fontSize: 20,
        borderRadius: 5,
        '&:hover': {
            backgroundColor: "black",
            color:"white",
            textDecoration:"none"

            
        }
    },
    signinButton:{
        backgroundColor:"#0594a9",
        '&:hover': {
            color:"#0594a9",
            backgroundColor: "white",
        }
    }

}));

export default function NavigationBar() {
    const classes = useStyles();
    return (
        <Navbar collapseOnSelect expand="lg" bg="light">
            <Navbar.Brand href="#home">H.C.E</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto" style={{backgroundColor:"#0594a9",marginRight:"2%",borderRadius:5}} >
                    <Nav.Link className={classes.items}><Link className={classes.items} to="/">Home</Link></Nav.Link>
                    <Nav.Link className={classes.items}><Link className={classes.items}>Material Price</Link></Nav.Link>
                    <Nav.Link className={classes.items}><Link className={classes.items}>Cost Estimator</Link></Nav.Link>
                    <Nav.Link className={classes.items}><Link className={classes.items} to="/about">About Us</Link></Nav.Link>
                    <Nav.Link className={classes.items}><Link className={classes.items}>Contact</Link></Nav.Link>
                </Nav>
                <Button size="lg" className={classes.signinButton}>Sign in/up</Button>
            </Navbar.Collapse>
        </Navbar>
    )
}

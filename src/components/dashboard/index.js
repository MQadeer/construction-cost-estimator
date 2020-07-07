import React, { useState, useEffect } from 'react';
import { Tab, Nav, Row, Col, Navbar, Button, Image } from "react-bootstrap";
import { makeStyles } from '@material-ui/core';
import useStyles from "./styles.js";
import { Link } from "react-router-dom"
import NavBar from "../navbar/index";
import Architects from "./architects";
import Builders from "./builders";
import Materials from "./materials";
import contactRequest from "./contactRequest";
import Footer from '../footer/index.js';
import store from "../../redux/store";

function Dashboard(props) {
    const classes = useStyles();


    const logOut = () => {
        store.dispatch({
            type: "logout",
        })
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light">
                <Navbar.Brand >
                    <Image src={require("../../images/logo.png")} rounded
                        style={{ height: 70, width: 140 }} />
                </Navbar.Brand>
                <Nav className="ml-auto" style={{ backgroundColor: "#0594a9", marginRight: "2%", borderRadius: 5 }} >
                    <Button size="lg" className={classes.signinButton} onClick={logOut}>Logout</Button>
                </Nav>
            </Navbar>
            <div style={{ backgroundColor: "rgb(5, 148, 169)", marginTop: "2%", marginBottom: "2%", paddingTop: "2%", paddingBottom: "2%" }}>
                <h1 style={{ color: "white", textAlign: "center" }}>Dashboard</h1>
            </div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <Row>
                    <Col sm={2} style={{ backgroundColor: "#0594a9", paddingBottom: "3%" }}>
                        <Nav variant="tabs" className="flex-column"
                            style={{ marginTop: "2%", marginLeft: "2%", backgroundColor: "#0594a9", border: "none" }} >
                            <Nav.Item className={classes.tab}>
                                <Nav.Link className={classes.items} eventKey="first" >Materials</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={classes.tab}>
                                <Nav.Link className={classes.items} eventKey="second" >Architects</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={classes.tab}>
                                <Nav.Link className={classes.items} eventKey="third" >Builders</Nav.Link>
                            </Nav.Item>
                            {/* <Nav.Item className={classes.tab}>
                                <Nav.Link className={classes.items} eventKey="fourth" >Messages</Nav.Link>
                            </Nav.Item> */}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Materials />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Architects />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Builders />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                <contactRequest />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            <Footer />
        </div>
    )
}

export default Dashboard

import React, { Component } from 'react';
import Footer from "../footer/index";
import NavBar from "../navbar/index";
import { Container, Table, Button, Card, Navbar, Image, Nav, Tab, Row, Col } from 'react-bootstrap';
import store from "../../redux/store";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import config from "../../config";
import history from "../../history";
import Chats from "./chats";
import Offers from "./offers";

class Dashboard extends Component {
    state = {}
    componentWillMount() {
        store.dispatch({
            type: "getchats"
        })
    }
    logOut = () => {
        store.dispatch({
            type: "logout",
        })
    }
    startChat = (e) => {
        // let architect = e.target.value.architect
        // console.log(architect)
        // localStorage.setItem("architect", JSON.stringify(architect))
        const room = e.target.value
        // const logeduser=e.target.value.publicUser
        const logeduser = this.props.user
        // config.socket.emit('join',{logeduser,architect,room})
        config.socket.emit('join', { logeduser, room })
        history.push("/chatRoom")
    }

    render() {
        return (
            <div >
                <Navbar collapseOnSelect expand="lg" bg="light">
                    <Navbar.Brand >
                        <Image src={require("../../images/logo.png")} rounded
                            style={{ height: 70, width: 140 }} />
                    </Navbar.Brand>
                    <Nav className="ml-auto" style={{ backgroundColor: "#0594a9", marginRight: "2%", borderRadius: 5 }} >
                        {/* <Nav.Link as="div" ><Link to="/architecturersDshboard/chats">Chats</Link></Nav.Link> */}

                        <Button size="lg" variant="outline-danger" style={{ color: "white", border: "none" }}
                            onClick={this.logOut}>Logout</Button>
                    </Nav>
                </Navbar>
                <div style={{ backgroundColor: "rgb(5, 148, 169)", marginTop: "2%", marginBottom: "2%", paddingTop: "2%", paddingBottom: "2%" }}>
                    <h1 style={{ color: "white", textAlign: "center" }}>Dashboard</h1>
                </div>
                {/* <Offers /> */}
                {/* <Chats/> */}
                <h2 style={{ textAlign: "center" }}>Chats</h2>
                <Container>
                    {this.props.allchats.map((item, index) => {
                        return <Card key={index} style={{ width: '18rem', float: "left", marginRight: "5%", marginTop: "2%" }}>
                            <Card.Body>
                                <Card.Title style={{ textAlign: "center" }}>{item.publicUser.name}</Card.Title>
                                <Card.Text style={{ height: 200, overflow: "auto" }}>{}</Card.Text>
                                <Button variant="primary" value={item.room}
                                    onClick={this.startChat.bind(this)}>continue Chat</Button>
                            </Card.Body>
                        </Card>
                    })}
                </Container>
                {/* <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                    <Row>
                        <Col sm={2} style={{ backgroundColor: "#0594a9", paddingBottom: "3%" }}>
                            <Nav variant="tabs" className="flex-column"
                                style={{ marginTop: "2%", marginLeft: "2%", backgroundColor: "#0594a9", border: "none" }} >
                                <Nav.Item >
                                    <Nav.Link  eventKey="first" >Offers</Nav.Link>
                                </Nav.Item>
                                <Nav.Item >
                                    <Nav.Link  eventKey="second" >Chats</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Offers />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <Chats />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container> */}
            </div>
        )
    }
}

const chatbox = (store) => {
    console.log("chats  ", store.architectsReducer.chats)
    return {
        logedIn: store.loginReducer.logedIn, user: store.loginReducer.user,
        allchats: store.architectsReducer.chats
    }


}

let ArchitectDashboard = connect(chatbox)(Dashboard);
export default ArchitectDashboard;
import React, { Component } from 'react';
import Footer from "../footer/index";
import NavBar from "../navbar/index";
import { Container, Table, Button, Card, Navbar, Image, Nav } from 'react-bootstrap';
import store from "../../redux/store";
import { connect } from "react-redux";
import config from "../../config";
import history from "../../history";
import { Link } from "react-router-dom";

class Dashboard extends Component {
    state = {}

    componentWillMount() {
        store.dispatch({
            type: "getchatsB",
            payload: { user: JSON.parse(localStorage.getItem("logedUser")) }
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
        config.socket.emit('employeeJoin', { logeduser, room })
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
                        <Button size="lg" variant="outline-dark" style={{ border: "none" }}>
                            <Link to="/DashboardBuilders" style={{ color: "white", textDecoration: "none" }}>Offers</Link>
                        </Button>
                        <Button size="lg" variant="outline-dark" style={{ border: "none" }}>
                            <Link to="/buildersDshboard/chats" style={{ color: "white", textDecoration: "none" }}>Chats</Link>
                        </Button>


                    </Nav>
                    <Nav style={{ backgroundColor: "#0594a9", marginRight: "2%", borderRadius: 5 }}>
                        <Button size="lg" variant="outline-danger" style={{ color: "white", border: "none" }}
                            onClick={this.logOut}>Logout</Button>
                    </Nav>
                </Navbar>
                <div style={{ backgroundColor: "rgb(5, 148, 169)", marginBottom: "2%", paddingTop: "2%", paddingBottom: "2%" }}>
                    <h1 style={{ color: "white", textAlign: "center" }}>Dashboard</h1>
                </div>
                <h2 style={{ textAlign: "center" }}>Chats</h2>
                <Container>
                    {this.props.allchats != undefined ? this.props.allchats.map((item, index) => {
                        return <Card key={index} style={{ width: '20rem', float: "left", marginRight: "5%", marginTop: "2%" }}>
                            <Card.Body>
                                <Card.Title style={{ textAlign: "center" }}>{item.publicUser.name}</Card.Title>
                                <Card.Text style={{ height: 200, overflow: "auto" }}>
                                    <ul style={{ listStyle: "none", }}>
                                        {item.chat.map((item, index) => {
                                            return <li key={index}><p style={{ color: "lightgreen", display: "inline" }}>{item.user}: </p>
                                                <p style={{ display: "inline" }}>{item.text}</p></li>
                                        })}
                                    </ul>
                                </Card.Text>
                                <Button variant="primary" value={item.room}
                                    onClick={this.startChat.bind(this)}>continue Chat</Button>
                            </Card.Body>
                        </Card>
                    }) : null}
                </Container>
            </div>
        )
    }
}

const chatbox = (store) => {
    console.log("chats  ", store.architectsReducer.chats)
    return {
        logedIn: store.loginReducer.logedIn, user: store.loginReducer.user,
        allchats: store.buildersReducer.chats
    }


}

let BChats = connect(chatbox)(Dashboard);
export default BChats;
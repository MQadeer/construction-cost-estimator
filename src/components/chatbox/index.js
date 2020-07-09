import React, { Component } from 'react'
import { Container, Card, Button, Modal, Form,Nav,Navbar,Image } from "react-bootstrap"
import { connect } from "react-redux"
import NavigationBar from "../navbar/index";
import Footer from "../footer/index";
import { Icon } from '@material-ui/core';
import store from "../../redux/store";
import io from "socket.io-client";
import config from "../../config";


class NChat extends Component {
    state = {
        message: "",
        messages: [],
        // architect: JSON.parse(localStorage.getItem("employee"))
    }

    // socket = io('localhost:5000');

    componentDidMount() {
        config.socket.on('message', message => {
            this.setState({
                messages: [...this.state.messages, message]
            });
        });
    }

    onchange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    onSendMessage = (e) => {
        const message = this.state.message
        const logeduser = this.props.user
        document.getElementById("msg").value = "";
        config.socket.emit('sendMessage', message, logeduser,)

    }

    logOut = () => {
        store.dispatch({
            type: "logout",
        })
    }
    render() {
        return (
            <>
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
                <Container style={{ marginTop: "3%", marginBottom: "3%" }}>
                    <div style={{ height: 400, width: "100%", border: "1px solid lightblue", borderRadius: 5, }}>
                        <ul style={{ listStyle: "none", }}>
                            {/* <li><p style={{color:"lightgreen"}}>{item.user}: </p><p>{item.user}</p></li> */}
                            {this.state.messages.map((item, index) => {
                                return <li key={index}><p style={{ color: "lightgreen", display: "inline" }}>{item.user}: </p>
                                    <p style={{ display: "inline" }}>{item.text}</p></li>

                            })}
                        </ul>
                    </div>
                    <div style={{ flex: 1, flexDirection: "row", marginTop: "1%" }}>
                        <Form.Control type="text" id="msg" placeholder="type your message" defaultValue={this.state.message} onChange={this.onchange.bind(this)} />
                        <Button variant="success" style={{ width: "10%", marginTop: "1%" }} onClick={this.onSendMessage.bind(this)}>Send</Button>
                    </div>
                </Container>
                <Footer />
            </>
        )
    }
}

const getUsers = (store) => {
    console.log("architectsList ", store.architectsReducer.architects)
    console.log("login status ", store.loginReducer.logedIn)
    console.log("loged in chatbox user ", store.loginReducer.user)
    return {
        architectsList: store.architectsReducer.architects, logedIn: store.loginReducer.logedIn,
        user: store.loginReducer.user
    }


}

let Chatbox = connect(getUsers)(NChat);
export default Chatbox;
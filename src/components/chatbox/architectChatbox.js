import React, { Component } from 'react'
import { Container, Card, Button, Modal, Form } from "react-bootstrap"
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
    }
    componentWillMount() {
        console.log(this.state)
    }

    componentDidMount() {
        config.socket.on('message', message => {
            console.log("did mount  ",message)
            this.setState({
                messages: [...this.state.messages, message]
            });
        });
        console.log("state ",this.state.messages)
    }

    onchange = (e) => {
        this.setState({
            message: e.target.value
        })
        console.log(this.state)
    }

    onSendMessage = (e) => {
        const message = this.state.message
        const logeduser=this.props.user
        config.socket.emit('sendMessage', message,logeduser,() => document.getElementById("msg").value="");
    }
    render() {
        return (
            <>
                <NavigationBar />
                <Container style={{ marginTop: "3%", marginBottom: "3%" }}>
                    <div style={{ height: 400, width: "100%", border: "1px solid lightblue", borderRadius: 5, }}>
                        <ul>
                            <li>hello</li>
                            {this.state.messages.map((item, index) => {
                               return <li key={index}>{`${item.user}: ${item.text}`}</li>
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
    console.log("login status ", store.loginReducer.logedIn)
    console.log("loged in chatbox user ", store.loginReducer.user)
    return {
        architectsList: store.architectsReducer.architects, logedIn: store.loginReducer.logedIn,
        user: store.loginReducer.user
    }


}

let ArchitectsChatbox = connect(getUsers)(NChat);
export default ArchitectsChatbox;
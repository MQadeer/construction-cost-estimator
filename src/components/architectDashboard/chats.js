import React, { Component } from 'react';
import Footer from "../footer/index";
import NavBar from "../navbar/index";
import { Container, Table, Button, Card, Navbar, Image, Nav } from 'react-bootstrap';
import store from "../../redux/store";
import { connect } from "react-redux";
import config from "../../config";
import history from "../../history";

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

let AChats = connect(chatbox)(Dashboard);
export default AChats;
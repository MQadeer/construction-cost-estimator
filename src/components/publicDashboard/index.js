import React, { Component } from 'react';
import Footer from "../footer/index";
import NavBar from "../navbar/index";
import { Container, Table, Button, Card } from 'react-bootstrap';
import store from "../../redux/store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import config from "../../config";
import history from "../../history";

class Pdashboard extends Component {
    state = { allmyChat: JSON.parse(localStorage.getItem("publichats")) }
    componentWillMount() {
        store.dispatch({
            type: "getchatsU",
            payload: { user: JSON.parse(localStorage.getItem("logedUser")) }
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
        config.socket.emit('resumeChat', { logeduser, room })
        history.push("/chatRoom")
    }

    checkChats = () => {
        if (this.state.allmyChat == null) {
           this.checkChats();
        }
        else{
            this.setState({
                allmyChat: JSON.parse(localStorage.getItem("publichats"))
            })
        }

    }
    allmyChat = JSON.parse(localStorage.getItem("publichats"))

    render() {
        return (
            <div >
                <NavBar />
                <div style={{ backgroundColor: "rgb(5, 148, 169)", marginTop: "2%", marginBottom: "2%", paddingTop: "2%", paddingBottom: "2%" }}>
                    <h1 style={{ color: "white", textAlign: "center" }}>Public user Dashboard</h1>
                </div>
                <h2 style={{ textAlign: "center" }}>My Previous Chats</h2>
                <Container>
                    {/* {this.props.allchats != undefined ? this.props.allchats.map((item, index) => { */}
                    {this.state.allmyChat != null ? this.state.allmyChat.map((item, index) => {

                        return <Card key={index} style={{ width: '20rem', float: "left", marginRight: "5%", marginTop: "2%" }}>
                            <Card.Body>
                                <Card.Title style={{ textAlign: "center" }}>{item.employeeName}</Card.Title>
                                <Card.Text style={{ height: 200, overflow: "auto" }}>
                                    <ul style={{ listStyle: "none", }}>
                                        {item.chat.map((item, index) => {
                                            return <li key={index}><p style={{ color: "lightgreen", display: "inline" }}>{item.user}: </p>
                                                <p style={{ display: "inline" }}>{item.text}</p></li>

                                        })}
                                    </ul>
                                </Card.Text>
                                {/* <Button variant="primary" value={item.room}
                                    onClick={this.startChat.bind(this)}>continue Chat</Button> */}
                            </Card.Body>
                        </Card>
                    }) : this.checkChats}
                </Container>
            </div>
        )
    }
}

const chatbox = (store) => {
    console.log("chats  ", store.loginReducer.allChats)
    return {
        logedIn: store.loginReducer.logedIn, user: store.loginReducer.user,
        allchats: store.loginReducer.allChats
    }
}

let PublicDashboard = connect(chatbox)(Pdashboard);
export default PublicDashboard;
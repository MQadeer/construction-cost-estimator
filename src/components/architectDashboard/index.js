import React, { Component } from 'react';
import Footer from "../footer/index";
import NavBar from "../navbar/index";
import { Container, Table, Button,Card } from 'react-bootstrap';
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
    

    startChat = (e) => {
        // let architect = e.target.value.architect
        // console.log(architect)
        // localStorage.setItem("architect", JSON.stringify(architect))
        const room=e.target.value
        // const logeduser=e.target.value.publicUser
        const logeduser=this.props.user
        // config.socket.emit('join',{logeduser,architect,room})
        config.socket.emit('join',{logeduser,room})
        history.push("/chatRoom")
      }

    render() {
        return (
            <div>
                <NavBar />
                <h2 style={{ textAlign: "center" }}>Dashboard</h2>
                <Container>
                    {this.props.chats.map((item, index) => {
                        return <Card key={index} style={{ width: '18rem', float: "left", marginRight: "5%" }}>
                            <Card.Body>
                                <Card.Title style={{ textAlign: "center" }}>{item.publicUser.name}</Card.Title>
                                <Card.Text style={{ height: 200, overflow: "auto" }}>{item.description}</Card.Text>
                                <Button variant="primary" value={item.room}  
                                onClick={this.startChat.bind(this)}>continue Chat</Button>
                            </Card.Body>
                        </Card>
                    })}
                </Container>
                {/* <Footer /> */}
            </div>
        )
    }
}

const chatbox = (store) => {
    console.log("chats  ", store.architectsReducer.chats)
    return { logedIn: store.loginReducer.logedIn,user: store.loginReducer.user,
         chats: store.architectsReducer.chats }


}

let ArchitectDashboard = connect(chatbox)(Dashboard);
export default ArchitectDashboard;
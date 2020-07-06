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
            type: "getOffers"
        })
    }
    
    render() {
        return (
            <div>
                <h2 style={{ textAlign: "center" }}>Offers</h2>
                
            </div>
        )
    }
}

const chatbox = (store) => {
    console.log("chats  ", store.architectsReducer.chats)
    return { logedIn: store.loginReducer.logedIn,user: store.loginReducer.user,
         allchats: store.architectsReducer.chats }


}

let ArchitectDashboard = connect(chatbox)(Dashboard);
export default ArchitectDashboard;
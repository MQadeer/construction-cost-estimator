import React, { Component } from 'react'
import { Container, Card, Button, Modal, Form } from "react-bootstrap"
import store from "../../redux/store"
import { connect } from "react-redux"
import StripeCheckout from "react-stripe-checkout"
import NavigationBar from "../navbar/index";
import Footer from "../footer/index";
import history from "../../history";
import config from "../../config";
import Axios from "axios"



class NArchitechturers extends Component {

  componentWillMount() {
    store.dispatch({
      type: "getArchitects"
    })
  }
  
  onDelete=(e)=>{
    store.dispatch({
      type:"removeArchitect",
      payload:{id:e.target.value}
    })
  }

  render() {
    return (
      <div style={{marginBottom:"50%"}}>
        <h1 style={{ textAlign: "center", marginTop: "2%", paddingBottom: "2%" }}>Architechturers</h1>
        <Container style={{ marginTop: "1%", paddingBottom: "2%" }}>
          {this.props.architectsList.map((item, index) => {
            return <Card key={index} style={{ width: '18rem', float: "left", marginRight: "7%", marginTop: "5%" }}>
              <Card.Img variant="top"/>
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>{item.name}</Card.Title>
                <Card.Text style={{ height: 200, overflow: "auto" }}>{item.description}</Card.Text>
                <Button variant="danger" value={item._id} onClick={this.onDelete.bind(this)} style={{ marginRight: "2%" }}>Remove</Button>
              </Card.Body>
            </Card>
          })}
        </Container>
      </div>

    )
  }
}

const getArchitects = (store) => {
  console.log("architectsList ", store.architectsReducer.architects)
  console.log("login status ", store.loginReducer.logedIn)
  console.log("loged in user ", store.loginReducer.user)
  return {
    architectsList: store.architectsReducer.architects, logedIn: store.loginReducer.logedIn,
    user: store.loginReducer.user
  }


}

let Architects = connect(getArchitects)(NArchitechturers);
export default Architects;
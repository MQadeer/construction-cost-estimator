import React, { Component } from 'react'
import { Container, Card, Button, Modal, Form } from "react-bootstrap"
import store from "../../redux/store"
import { connect } from "react-redux"
import StripeCheckout from "react-stripe-checkout"
import NavigationBar from "../navbar/index";
import Footer from "../footer/index";
import history from "../../history";
import config from "../../config";



class Architechturers extends Component {
  state = {
    show: false,
  }

  componentWillMount() {
    store.dispatch({
      type: "getArchitects"
    })
  }
  handleClose = () => {
    this.setState({ show: false })
  };
  handleShow = () => {
    this.setState({ show: true })
  };

  onchange = (prop, e) => {
    var obj = {};
    obj[prop] = e.target.value;
    this.setState(obj);
    console.log(this.state);
  }
  getoffer = (e) => {

  }
  startChat = (e) => {
    if (this.props.logedIn == false) {
      alert("login to start chat")
    } 
    else {
      let architect = this.props.architectsList.find(o => o._id == e.target.value)
      console.log(architect)
      localStorage.setItem("architect", JSON.stringify(architect))
      const room = architect._id + this.props.user._id
      const logeduser = this.props.user
      // config.socket.emit('join', { logeduser, architect, room })
      config.socket.emit('join', { logeduser, room })
      history.push("/chatRoom")
    }

  }

  handleToken = (token) => {

  }

  render() {
    return (
      <div>
        <NavigationBar />
        <h1 style={{ textAlign: "center", marginTop: "2%", paddingBottom: "2%" }}>Architechturers</h1>
        <Container style={{ marginTop: "3%", paddingBottom: "5%" }}>
          {this.props.architectsList.map((item, index) => {
            return <Card key={index} style={{ width: '18rem', float: "left", marginRight: "7%",marginTop:"5%" }}>
              <Card.Img variant="top" />
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>{item.name}</Card.Title>
                <Card.Text style={{ height: 200, overflow: "auto" }}>{item.description}</Card.Text>
                <Button variant="primary" onClick={this.handleShow} style={{marginRight:"2%"}}>Make an offer</Button>
                <Button variant="primary" value={item._id} onClick={this.startChat.bind(this)}>Start Chat</Button>
                <StripeCheckout
                  stripeKey="pk_test_51Grn9xAcjRPhUTEWkO5IIHfOUgERUfuBsx89c4UQIBVurvSzVe1rDeAQ5O8gDQRmOY3Qdk5GtRNfG3oOZvPCtxK100mUPtL38T"
                  token={this.handleToken} amount={this.state.amount}
                  style={{marginTop:"2%"}}
                />
              </Card.Body>
            </Card>
          })}

        </Container>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Make Offer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control type="text" as="textarea" placeholder="write you project details " style={{ marginBottom: "2%" }}
              onChange={this.onchange.bind(this, "offer")} />
            <Form.Control type="number" placeholder="enter amount" onChange={this.onchange.bind(this, "amount")} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
          </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Submit
          </Button>
          </Modal.Footer>
        </Modal>
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

let NArchitechturers = connect(getArchitects)(Architechturers);
export default NArchitechturers;
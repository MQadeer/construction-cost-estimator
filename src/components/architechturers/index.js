import React, { Component } from 'react'
import { Container, Card, Button, Modal, Form } from "react-bootstrap"
import store from "../../redux/store"
import { connect } from "react-redux"
import StripeCheckout from "react-stripe-checkout"
import NavigationBar from "../navbar/index";
import Footer from "../footer/index";
import history from "../../history";
import config from "../../config";
import Axios from "axios";
import swal from "sweetalert";




class Architechturers extends Component {
  state = {
    show: false,
    showDescription: false,
    offer: "",
    amount: 0,
  }

  componentWillMount() {
    store.dispatch({
      type: "getArchitects"
    })
  }
  handleClose = () => {
    this.setState({ show: false })
  };
  handleShow = (e) => {
    if (this.props.logedIn == false) {
      swal("Oops!", "login first!", "error");

    }
    else {
      this.setState({
        show: true,
        architectsId: e.target.value
      })
    }
  };

  showDescription = (e) => {
    const architects = this.props.architectsList;
    const architect = architects.find(i => i._id === e.target.value)
    this.setState({
      info: architect.description,
      name: architect.name,
      showDescription: true
    })
  }

  closeDescription = () => {
    this.setState({ showDescription: false })
  }

  onchange = (prop, e) => {
    var obj = {};
    obj[prop] = e.target.value;
    this.setState(obj);
    console.log(this.state);
  }
  submitOffer = () => {
    if (this.state.offer == "" || this.state.amount < 500) {
      return swal("Oops!", "please fill the fields and amount should be more the 500 Pkr", "info");

    }
    store.dispatch({
      type: "saveoffer",
      payload: {
        name: this.props.user.name, email: this.props.user.email, description: this.state.offer,
        amount: this.state.amount, architectsId: this.state.architectsId
      }
    })
    this.handleClose();
  }
  startChat = (e) => {
    if (this.props.logedIn == false) {
      swal("Oops!", "login to start chat!", "error");
    }
    else {
      let employee = this.props.architectsList.find(o => o._id == e.target.value)
      console.log(employee)
      localStorage.setItem("employee", JSON.stringify(employee))
      const room = employee._id + this.props.user._id
      const logeduser = this.props.user
      // config.socket.emit('join', { logeduser, architect, room })
      config.socket.emit('publicJoin', { logeduser,employee, room })
      history.push("/chatRoom")
    }

  }

  handleToken = (token) => {
    const amount = (this.state.amount / 167) * 100
    Axios.post("/checkout",
      { token, amount }
    ).then(response => {
      swal( "", "success");
      swal({
        title: "Payment successful!",
        icon: "success",
      });


      // console.log("payment Response:", response.data);
      // if (response == "success") {
      //   alert("Success! ");
      // } else {
      //   alert("Something went wrong");
      // }
    })


  }

  render() {
    return (
      <div>
        <NavigationBar />
        <h1 style={{ textAlign: "center", marginTop: "2%", paddingBottom: "2%" }}>Architechturers</h1>
        <Container fluid style={{ marginTop: "3%", paddingBottom: "5%" }}>
          {this.props.architectsList != undefined ? this.props.architectsList.map((item, index) => {
            return <Card key={index} style={{ width: '25rem', float: "left", marginRight: "3%", marginTop: "5%" }}>
              <Card.Img variant="top" />
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>{item.name}</Card.Title>
                <Card.Text >{item.description.slice(0, 25) + "..."}
                  <Button variant="link" value={item._id} onClick={this.showDescription.bind(this)} style={{ marginRight: "2%" }}>read more</Button>
                </Card.Text>
                <StripeCheckout
                  stripeKey="pk_test_51Grn9xAcjRPhUTEWkO5IIHfOUgERUfuBsx89c4UQIBVurvSzVe1rDeAQ5O8gDQRmOY3Qdk5GtRNfG3oOZvPCtxK100mUPtL38T"
                  token={this.handleToken} amount={(this.state.amount / 167) * 100}
                  style={{ marginTop: "2%" }}
                />
                <Button variant="primary" value={item._id} onClick={this.handleShow.bind(this)} style={{ marginLeft: "2%" }}>Make an offer</Button>
                <Button variant="success" value={item._id} onClick={this.startChat.bind(this)} style={{ marginLeft: "2%" }}>Start Chat</Button>

              </Card.Body>
            </Card>

          }) : null}

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
            <Button variant="primary" onClick={this.submitOffer}>
              Submit
          </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showDescription} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header >
            <Modal.Title id="contained-modal-title-vcenter">
              {this.state.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.state.info}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeDescription}>Close</Button>
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
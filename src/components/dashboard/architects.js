import React, { Component } from 'react'
import { Container, Card, Button, Modal, Table } from "react-bootstrap"
import store from "../../redux/store"
import { connect } from "react-redux"
import StripeCheckout from "react-stripe-checkout"
import NavigationBar from "../navbar/index";
import Footer from "../footer/index";
import history from "../../history";
import config from "../../config";
import Axios from "axios"



class NArchitechturers extends Component {
  state = {
    showDescription: false
  }

  componentWillMount() {
    store.dispatch({
      type: "getArchitects"
    })
  }

  onDelete = (e) => {
    document.getElementById(e.target.value).remove();
    store.dispatch({
      type: "removeArchitect",
      payload: { id: e.target.value }
    })
  }

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

  render() {
    return (
      <div style={{ marginBottom: "5%" }}>
        <h1 style={{ textAlign: "center", marginTop: "2%", paddingBottom: "2%" }}>Architechturers</h1>
        <Container style={{ marginTop: "1%", paddingBottom: "2%" }}>
          {/* {this.props.architectsList.map((item, index) => {
            return <Card key={index} style={{ width: '18rem', float: "left", marginRight: "7%", marginTop: "5%" }}>
              <Card.Img variant="top" />
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>{item.name}</Card.Title>
                <Card.Text style={{ height: 200, overflow: "auto" }}>{item.description}</Card.Text>
                <Button variant="danger" value={item._id} onClick={this.onDelete.bind(this)} style={{ marginRight: "2%" }}>Remove</Button>
              </Card.Body>
            </Card>
          })} */}
          <Table responsive style={{ marginTop: "2%" }}>
            <tbody>
              
              {this.props.architectsList.map((item,index) => {
                return <tr id={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.number}</td>
                  <td>
                    <Button variant="primary" value={item._id} onClick={this.showDescription.bind(this)} style={{ marginRight: "2%" }}>View more</Button>
                    <Button variant="danger"  value={item._id} onClick={this.onDelete.bind(this)} style={{ marginRight: "2%" }}>Remove</Button>
                  </td>
                </tr>
              })}

            </tbody>
          </Table>
        </Container>
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

let Architects = connect(getArchitects)(NArchitechturers);
export default Architects;
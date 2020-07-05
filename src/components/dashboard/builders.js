import React, { Component } from 'react'
import { Container, Card, Button, Modal, Form } from "react-bootstrap"
import store from "../../redux/store"
import { connect } from "react-redux"
import StripeCheckout from "react-stripe-checkout"
import NavigationBar from "../navbar/index";
import Footer from "../footer/index";
import history from "../../history";
import config from "../../config";



class Nbuilders extends Component {
  state = {
    show: false,
  }

  componentWillMount() {
    store.dispatch({
      type: "getBuilders"
    })
  }

  onDelete=(e)=>{
    store.dispatch({
      type:"removeBuilder",
      payload:{id:e.target.value}
    })
  }

  render() {
    return (
      <div style={{marginBottom:"50%"}}>
        <h1 style={{ textAlign: "center", marginTop: "2%", paddingBottom: "2%" }}>Builders</h1>
        <Container style={{ marginTop: "3%", paddingBottom: "5%" }}>
          {this.props.buildersList.map((item, index) => {
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

const getBuilders = (store) => {
  console.log("builders list  ", store.buildersReducer.builders)
  console.log("login status ", store.loginReducer.logedIn)
  console.log("loged in user ", store.loginReducer.user)
  return {
    buildersList: store.buildersReducer.builders, logedIn: store.loginReducer.logedIn,
    user: store.loginReducer.user
  }


}

let Builders = connect(getBuilders)(Nbuilders);
export default Builders;
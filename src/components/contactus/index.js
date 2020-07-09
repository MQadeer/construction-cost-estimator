import React, { Component } from 'react';
import NavigationBar from "../navbar/index";
import Footer from "../footer/index";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import store from "../../redux/store";
import swal from "sweetalert";

export default class ContactUs extends Component {
  state = {

  }

  onchange = (prop, e) => {
    var obj = {};
    obj[prop] = e.target.value;
    this.setState(obj);
    console.log(this.state);
  }

  onSubmit = () => {
    const values=this.state
    if(!values.name || !values.email || !values.message || !values.subject ){
      swal({
        title: "warning!",
        text: "please fill the complete form then submit",
        icon: "info",
      });
    }
    else{
      store.dispatch({
        type: "ContactMessage",
        payload: values
      })
    }
    
  }

  render() {
    return (
      <>
        <NavigationBar />
        <div>
          <h1 style={{ marginTop: "5%", textAlign: "center", color: "rgb(5, 148, 169)" }}>Please contact us if you need our help...</h1>
        </div>
        <div style={{ backgroundColor: "rgb(5, 148, 169)", paddingTop: "3%", paddingBottom: "3%", marginTop: "3%", marginBottom: "3%" }}>
          <Container style={{ width: "70%" }}>
            <Row >
              <Col>
                <Form>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control placeholder="Enter your Name" onChange={this.onchange.bind(this, "name")} />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control placeholder="Enter your Email" onChange={this.onchange.bind(this, "email")} />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control placeholder="Enter Subject" onChange={this.onchange.bind(this, "subject")} />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control as="textarea" placeholder="Enter your message" onChange={this.onchange.bind(this, "message")} />
                  </Form.Group>
                  <Button variant="warning" size="lg" style={{ color: "white" }} onClick={this.onSubmit}>Submit</Button>
                </Form>
              </Col>
              <Col style={{ color: "white" }}>
                <h3>Address... </h3>
                <p>
                  PWD Islamabad<br />Office No. 6<br />Furqan Plaza Opposite Taqwa Mall <br />Pakistan
                            <br />Cell: +92-311-0777666 (whatsapp)
                            <br />Email : info@hce.pk
              </p>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    )
  }
}

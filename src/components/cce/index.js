import React, { Component } from 'react';
import { Container, Row, Col, Form,Button } from "react-bootstrap";
import image1 from "../../images/5.jpg"

export default class CCE extends Component {
    state={

    }
    onchange=(prop,e)=>{
        // console.log(typeof parseFloat(e.target.value))
        // console.log( parseFloat(e.target.value))
        var obj={};
        obj[prop]=parseFloat(e.target.value);
        this.setState(obj);
        console.log(this.state);
    }

    onSubmit=()=>{
        
    }
    render() {
        return (
            <div style={{
                backgroundImage: `url(${image1})`,
                width: "100%", height: "100%", paddingTop: "10%", paddingBottom: "5%"
            }}>
                <Container style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", borderRadius: 10, padding: "1%" }}>
                    <Row><h1 style={{ margin: "auto", verticalAlign: "center", color: "white" }}>Construction Cost Estimator</h1></Row>
                    <Row style={{ marginTop: "3%" }}>
                        <Col md style={{ borderRight: "1px solid white", color: "white" }}>
                            <Row><h5 style={{ color: "#ffd700", margin: "auto", verticalAlign: "center" }}>
                                Please provide plot & gate size</h5>
                            </Row>
                            <Form style={{marginTop:"3%"}} >
                                <Form.Row>
                                    <Col>
                                        <Form.Label>Plot Size in Marla</Form.Label>
                                        <Form.Control defaultValue={0} onChange={this.onchange.bind(this,"plotSize")}/>
                                    </Col>
                                    <Col>
                                        <Form.Label>Sq.Ft In 1 Marla</Form.Label>
                                        <Form.Control defaultValue={0} onChange={this.onchange.bind(this,"marla")}/>
                                    </Col>
                                    <Col>
                                        <Form.Label>Total Area</Form.Label>
                                        <Form.Control defaultValue={0} onChange={this.onchange.bind(this,"totalArea")}/>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Label>Gate Height</Form.Label>
                                        <Form.Control defaultValue={0} onChange={this.onchange.bind(this,"gateHeight")}/>
                                    </Col>
                                    <Col>
                                        <Form.Label>Gate Width</Form.Label>
                                        <Form.Control defaultValue={0} onChange={this.onchange.bind(this,"gateWidth")}/>
                                    </Col>
                                    <Col>
                                        <Form.Label>Gate Size</Form.Label>
                                        <Form.Control defaultValue={0} onChange={this.onchange.bind(this,"gateSize")}/>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>
                        <Col md style={{ borderLeft: "1px solid white", color: "white" }}>
                            <Row><h5 style={{ color: "#ffd700", margin: "auto", verticalAlign: "center" }}>Building</h5></Row>
                            <Form style={{marginTop:"3%"}}>
                                <Form.Row>
                                    <Col>
                                        <Form.Label>No. of Rooms</Form.Label>
                                        <Form.Control defaultValue={0} onChange={this.onchange.bind(this,"rooms")}/>
                                    </Col>
                                    <Col>
                                        <Form.Label>No. of Bathrooms</Form.Label>
                                        <Form.Control defaultValue={0} onChange={this.onchange.bind(this,"bedrooms")}/>
                                    </Col>
                                    <Col>
                                        <Form.Label>Lounge</Form.Label>
                                        <Form.Control defaultValue={0} onChange={this.onchange.bind(this,"lounge")}/>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Label>Drawing</Form.Label>
                                        <Form.Control defaultValue={0} onChange={this.onchange.bind(this,"drawing")}/>
                                    </Col>
                                    <Col>
                                        <Form.Label>Kitchen</Form.Label>
                                        <Form.Control defaultValue={0} onChange={this.onchange.bind(this,"kitchen")}/>
                                    </Col>
                                    <Col>
                                        <Form.Label>Quality Level</Form.Label>
                                        <Form.Control defaultValue={0} onChange={this.onchange.bind(this,"quality")}/>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>
                    </Row>
                    <Row><Button variant="primary" size="lg" style={{margin: "auto",
                    verticalAlign: "center",marginTop:"3%"}}>Click to Calculate</Button></Row>
                </Container>
            </div>

        )
    }
}

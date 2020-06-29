import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal, Table } from "react-bootstrap";
import image1 from "../../images/5.jpg";
import { connect } from "react-redux";
import store from "../../redux/store";

class NCCE extends Component {
    state = {
        show: false,
        materials:[]
    }
    onchange = (prop, e) => {
        // console.log(typeof parseFloat(e.target.value))
        // console.log( parseFloat(e.target.value))

        var obj = {};
        obj[prop] = parseFloat(e.target.value);
        this.setState(obj);
        console.log(this.state);
    }

    onSubmit = () => {
        if(this.state.plotSize==null || this.state.sqft==null){
            return(
            alert("fill the form first")
            )
        }
        const marla = this.state.plotSize
        const sft = this.state.sqft
        const prices = this.props.allMaterials
        const totalCost = ((10000 * marla) * prices[0].priceTo) + ((105 * marla) * prices[1].priceTo) + ((600 * marla) * prices[2].priceTo) + ((630 * marla) * prices[3].priceTo) +
            ((140 * marla) * prices[4].priceTo) + ((180 * marla) * prices[5].priceTo) + ((120 * marla) * prices[6].priceTo) + ((275 * marla) * prices[7].priceTo)
        console.log(totalCost)

        this.setState({
            materials:[["Bricks",(10000 * marla)],["Cement",(105 * marla)],["Iron Bar (Sarya)",(600 * marla)],
            ["Sand Ravi",(630 * marla)],["Sand Chenab",(140 * marla)],["Crush Margalla(Lenter)",(180 * marla)],
            ["Crush Sargodha(Floor)",(120 * marla)],("Labour",275 * marla) ],
            estimatedCost:totalCost,
            show:true

        })
        // alert(`Estimated cost = ${totalCost} \n note: This cost is an estimate of grey structure of a double story house and prices of high quality material were used so, if you want a more detailed or complete estimate please login and contact our architects. Thank you`)
        // store.dispatch({
        //     type:"calculateCost",
        //     payload:{marla,sft}
        // })
        
    }

    close = () => {
        this.setState({
            show: false
        })
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
                            <Form style={{ marginTop: "3%" }} >
                                <Form.Row>
                                    <Col>
                                        <Form.Label>Plot Size in Marla</Form.Label>
                                        <Form.Control type="number"  onChange={this.onchange.bind(this, "plotSize")} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Sq.Ft In 1 Marla</Form.Label>
                                        <Form.Control type="number"  onChange={this.onchange.bind(this, "sqft")} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Total Area</Form.Label>
                                        <Form.Control type="number"  onChange={this.onchange.bind(this, "totalArea")} />
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Label>Gate Height</Form.Label>
                                        <Form.Control type="number"  onChange={this.onchange.bind(this, "gateHeight")} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Gate Width</Form.Label>
                                        <Form.Control type="number"  onChange={this.onchange.bind(this, "gateWidth")} />
                                    </Col>
                                    {/* <Col>
                                        <Form.Label>Gate Size</Form.Label>
                                        <Form.Control type="number"  onChange={this.onchange.bind(this, "gateSize")} />
                                    </Col> */}
                                </Form.Row>
                            </Form>
                        </Col>
                        <Col md style={{ borderLeft: "1px solid white", color: "white" }}>
                            <Row><h5 style={{ color: "#ffd700", margin: "auto", verticalAlign: "center" }}>Building</h5></Row>
                            <Form style={{ marginTop: "3%" }}>
                                <Form.Row>
                                    <Col>
                                        <Form.Label>No. of Rooms</Form.Label>
                                        <Form.Control type="number"  onChange={this.onchange.bind(this, "rooms")} />
                                    </Col>
                                    <Col>
                                        <Form.Label>No. of Bathrooms</Form.Label>
                                        <Form.Control  onChange={this.onchange.bind(this, "bedrooms")} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Lounge</Form.Label>
                                        <Form.Control type="number"  onChange={this.onchange.bind(this, "lounge")} />
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Label>Drawing</Form.Label>
                                        <Form.Control type="number"  onChange={this.onchange.bind(this, "drawing")} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Kitchen</Form.Label>
                                        <Form.Control type="number"  onChange={this.onchange.bind(this, "kitchen")} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Quality Level</Form.Label>
                                        <Form.Control type="number"  onChange={this.onchange.bind(this, "quality")} />
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>
                    </Row>
                    <Row><Button variant="primary" size="lg" style={{ margin: "auto", verticalAlign: "center", marginTop: "3%" }}
                        onClick={this.onSubmit}>Click to Calculate</Button></Row>
                </Container>
                <Modal size="lg" centered show={this.state.show} >
                        <Modal.Title >
                            <h4 style={{textAlign:"center",fontSize:34,color:"#007bff"}}>Estimated Cost</h4>
                            <h3 style={{textAlign:"center",marginTop:"2%"}}>{this.state.estimatedCost} </h3>
                        </Modal.Title>
                        
                    <Modal.Body>
                        <h4 style={{textAlign:"center",color:"#007bff"}}>Materials Used </h4>
                        <Table responsive>
                            <tbody>
                                {this.state.materials.map((item) => {
                                    return <tr>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}</td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                        <h4 style={{textAlign:"center",color:"#007bff"}}>Prices Used </h4>
                        <Table responsive>
                            <tbody>
                                {this.props.allMaterials.slice(0,8).map((item) => {
                                    
                                    return <tr>
                                        {/* <td>{index+1}</td> */}
                                        <td>{item.name}</td>
                                        <td>{item.unit}</td>
                                        {/* <td>{item.priceFrom}</td> */}
                                        <td>{item.priceTo}</td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                        <p>
                        note: This cost is an estimate of grey structure of a double story house and prices of high quality material were used so, 
                        if you want a more detailed or complete estimate please login and contact our architects. Thank you
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
}

const alMaterials = (store) => {
    if (store.materialsReducer.materials) {
        console.log("data in materials page", store.materialsReducer.materials)
        return { allMaterials: store.materialsReducer.materials }
    }
}
let CCE = connect(alMaterials)(NCCE);
export default CCE;
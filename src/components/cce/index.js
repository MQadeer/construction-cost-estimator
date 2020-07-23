import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Modal, Table } from "react-bootstrap";
import image1 from "../../images/5.jpg";
import NavigationBar from "../navbar/index";
import { connect } from "react-redux";
import store from "../../redux/store";
import swal from "sweetalert";

class NCCE extends Component {
    state = {
        show: false,
        materials: [],
        plotSize: 0,
        plotD1: 0,
        plotD2: 0,
        rooms: 0,
        roomD1: 0,
        roomD2: 0,
        baths: 0,
        bathD1: 0,
        bathD2: 0,
        kitchen: 0,
        kitchenD1: 0,
        kitchenD2: 0,
        floor: 1
    }

    componentWillMount() {
        store.dispatch({
            type: "getMaterials"
        })
    }

    onchange = (prop, e) => {
        // console.log(typeof parseFloat(e.target.value))
        // console.log( parseFloat(e.target.value))

        var obj = {};
        if (parseFloat(e.target.value) < 0 || e.target.value==NaN) {
            e.target.value = 0;
            return
        }
        obj[prop] = parseFloat(e.target.value);
        this.setState(obj);
        console.log(this.state);
        // this.setarea()
    }



    calculateRoomCost = (D1, D2, nos) => {
        console.log("nos ",nos)
        if (nos == 0 || isNaN(nos)) {
            return { bricks: 0, cement:0, sand:0 }
        } else {
            let d1 = 2 * (D1 * 12)
            let d2 = 2 * (((D2 * 2) - 3) * 12)
            const area = d1 + d2
            console.log(d1, d2, area)
            const totalBricks = (((area * 144) / 17.5) - 376) 

            const volume = (area * 0.75) - ((121.5 * totalBricks) / 1728)
            const wet = volume / 35.3147
            const dry = wet * 1.33
            const cement = (((1 / 7) * dry) * 28.8) * nos
            const sand = (((6 / 7) * dry) * 35.314) * nos

            console.log("room marterials ", totalBricks*nos, cement, sand);
            return { bricks: (totalBricks* nos), cement, sand }
        }
    }

    calculateRoofCost = (d1, d2, floors) => {
        let w1 = (d1 / 3.229) * ((d1 * 12) / 6) * 0.88
        let w2 = (d2 / 3.229) * ((d2 * 12) / 8) * 0.88
        const totalIron = (w1 + w2) * floors

        const wet = d1 * d2 * 0.416
        const dry = wet * 1.54
        const cement = (((1 / 7) * dry) / 1.25) * floors
        const sand = ((2 / 7) * dry) * floors
        const crush = ((4 / 7) * dry) * floors
        console.log("roof marterials ", totalIron, cement, sand, crush);
        return { iron: totalIron, cement, sand, crush }
    }
    calculateFloorCost = (d1, d2) => {

        const wet = d1 * d2 * 0.16667
        const dry = wet * 1.54
        const cement = ((1 / 7) * dry) / 1.25
        const sand = (2 / 7) * dry
        const crush = (4 / 7) * dry
        console.log("floor marterials ", cement, sand, crush);
        return { cement, sand, crush }
    }
    onSubmit = () => {
        if (this.state.plotSize == 0 || this.state.plotD1 == 0 || this.state.plotD2 == 0 || this.state.floor == 0) {
            return (swal({
                text: "fill the form first!",
                icon: "info",
            })
            )
        }
        const roomsqft = (this.state.roomD1 * this.state.roomD2) * this.state.rooms
        const kitchensqft = (this.state.kitchenD1 * this.state.kitchenD2) * this.state.kitchen
        const bathsqft = (this.state.bathD1 * this.state.bathD2) * this.state.baths
        const totalRoomsqft = roomsqft + kitchensqft + bathsqft

        const marla = this.state.plotSize
        const sft = this.state.plotD1 * this.state.plotD2
        const totalGivensqft = (marla * sft) * this.state.floor
        console.log(totalGivensqft, totalRoomsqft)

        if (totalGivensqft < totalRoomsqft) {
            return swal({
                title: "Warning!",
                text: "Given no of rooms or size of rooms cannot be constructed in the given plotsize either increase the plotsize or add another floor!",
                icon: "info",
            });
        }

        const roofMaterials = this.calculateRoofCost(this.state.plotD1, this.state.plotD2, this.state.floor)
        const floorMaterials = this.calculateFloorCost(this.state.plotD1, this.state.plotD2)
        const roomMaterials = this.calculateRoomCost(this.state.roomD1, this.state.roomD2, this.state.rooms)
        const bathMaterials = this.calculateRoomCost(this.state.bathD1, this.state.bathD2, this.state.baths)
        const kitchenMaterials = this.calculateRoomCost(this.state.kitchenD1, this.state.kitchenD2, this.state.kitchen)

        const totalMaterialsUsed = {
            bricks: parseInt(roomMaterials.bricks + bathMaterials.bricks + kitchenMaterials.bricks),
            cement: parseInt(roomMaterials.cement + bathMaterials.cement + kitchenMaterials.cement + roofMaterials.cement + floorMaterials.cement),
            sand: parseInt(roomMaterials.sand + bathMaterials.sand + kitchenMaterials.sand + roofMaterials.sand + floorMaterials.sand),
            crush: parseInt(roofMaterials.crush + floorMaterials.crush),
            iron: parseInt(roofMaterials.iron)
        }

        const prices = this.props.allMaterials
        let totalCost = (totalMaterialsUsed.bricks * prices[0].priceTo) + (totalMaterialsUsed.cement * prices[1].priceTo) + (totalMaterialsUsed.iron * prices[2].priceTo) +
            (totalMaterialsUsed.sand * prices[3].priceTo) + (totalMaterialsUsed.crush * prices[5].priceTo)
        console.log("total cost and materials",totalCost,totalMaterialsUsed)
        this.setState({
            materials: [["Bricks", totalMaterialsUsed.bricks], ["Cement", totalMaterialsUsed.cement], ["Iron Bar (Sarya) Kg", totalMaterialsUsed.iron],
            ["Sand ", totalMaterialsUsed.sand], ["Crush ", totalMaterialsUsed.crush]],
            estimatedCost: totalCost,
            show: true

        })


    }

    close = () => {
        this.setState({
            show: false
        })
    }
    render() {
        return (
            <div>
                <NavigationBar />
                <div style={{
                    backgroundImage: `url(${image1})`,
                    width: "100%", height: "100%", paddingTop: "10%", paddingBottom: "5%"
                }}>
                    <Container style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", borderRadius: 10, padding: "1%" }}>
                        <Row><h1 style={{ margin: "auto", verticalAlign: "center", color: "white" }}>Construction Cost Estimator</h1></Row>
                        <Row style={{ marginTop: "3%" }}>
                            <Col md style={{ borderRight: "1px solid white", color: "white" }}>
                                <Row><h5 style={{ color: "#ffd700", margin: "auto", verticalAlign: "center" }}>
                                    Please fill the required fields</h5>
                                </Row>
                                <Form style={{ marginTop: "3%" }} >
                                    <Form.Row >
                                        <Col>
                                            <Form.Label>Plot Size in Marla</Form.Label>
                                            <Form.Control type="number" onChange={this.onchange.bind(this, "plotSize")} />
                                        </Col>
                                        <Col>
                                            <Form.Label>Dimensions (e.g 27x40)</Form.Label>
                                            <Form.Control placeholder="27" type="number" onChange={this.onchange.bind(this, "plotD1")} />
                                        </Col>
                                        <Col md>
                                            <Form.Label>Dimensions (e.g 27x40)</Form.Label>
                                            <Form.Control placeholder="40" type="number" onChange={this.onchange.bind(this, "plotD2")} />
                                        </Col>
                                        <Col>
                                            <Form.Label>Total Area</Form.Label>
                                            <Form.Control type="number" id="totalArea" value={(this.state.plotD1 * this.state.plotD2) * this.state.plotSize}
                                                onChange={this.onchange.bind(this, "totalArea")} />
                                        </Col>
                                        <Col >
                                            <Form.Label>No. of Floors</Form.Label>
                                            <Form.Control placeholder={1} type="number" onChange={this.onchange.bind(this, "floor")} />
                                        </Col>
                                    </Form.Row>
                                    <hr style={{ borderBottom: "2px solid white" }} />
                                    <Form.Row>
                                        <Col>
                                            <Form.Label>No. of Rooms</Form.Label>
                                            <Form.Control type="number" onChange={this.onchange.bind(this, "rooms")} />
                                        </Col>
                                        <Col md>
                                            <Form.Label>Dimensions (e.g 12x10)</Form.Label>
                                            <Form.Control placeholder="12" type="number" onChange={this.onchange.bind(this, "roomD1")} />
                                        </Col>
                                        <Col>
                                            <Form.Label>Dimensions (e.g 12x10)</Form.Label>
                                            <Form.Control placeholder="10" type="number" onChange={this.onchange.bind(this, "roomD2")} />
                                        </Col>
                                        
                                    </Form.Row>
                                    <hr style={{ borderBottom: "2px solid white" }} />
                                    <Form.Row>
                                        <Col>
                                            <Form.Label>No. of Bathrooms</Form.Label>
                                            <Form.Control type="number" onChange={this.onchange.bind(this, "baths")} />
                                        </Col>
                                        <Col md>
                                            <Form.Label>Dimensions (e.g 12x10)</Form.Label>
                                            <Form.Control placeholder="12" type="number" onChange={this.onchange.bind(this, "bathD1")} />
                                        </Col>
                                        <Col>
                                            <Form.Label>Dimensions (e.g 12x10)</Form.Label>
                                            <Form.Control placeholder="10" type="number" onChange={this.onchange.bind(this, "bathD2")} />
                                        </Col>
                                        
                                    </Form.Row>
                                    <hr style={{ borderBottom: "2px solid white" }} />
                                    <Form.Row>
                                        <Col>
                                            <Form.Label>No. of Kitchens</Form.Label>
                                            <Form.Control type="number" onChange={this.onchange.bind(this, "kitchen")} />
                                        </Col>
                                        <Col md>
                                            <Form.Label>Dimensions (e.g 12x10)</Form.Label>
                                            <Form.Control placeholder="12" type="number" onChange={this.onchange.bind(this, "kitchenD1")} />
                                        </Col>
                                        <Col>
                                            <Form.Label>Dimensions (e.g 12x10)</Form.Label>
                                            <Form.Control placeholder="10" type="number" onChange={this.onchange.bind(this, "kitchenD2")} />
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
                            <h4 style={{ textAlign: "center", fontSize: 34, color: "#007bff" }}>Estimated Cost</h4>
                            <h3 style={{ textAlign: "center", marginTop: "2%" }}>{this.state.estimatedCost} </h3>
                        </Modal.Title>

                        <Modal.Body>
                            <h4 style={{ textAlign: "center", color: "#007bff" }}>Materials Used </h4>
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
                            <h4 style={{ textAlign: "center", color: "#007bff" }}>Prices Used </h4>
                            <Table responsive>
                                <tbody>
                                    {this.props.allMaterials.slice(0, 8).map((item) => {

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
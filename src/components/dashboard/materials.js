import React, { Component } from 'react';
import Footer from "../footer/index";
import NavBar from "../navbar/index";
import { Container, Table, Button, Tabs, Tab } from 'react-bootstrap';
import store from "../../redux/store";
import { connect } from "react-redux";
import Architects from "./architects";
import Builders from "./builders";

class Dashboard extends Component {
    state = {}
    componentWillMount() {
        console.log("dasboard")
        store.dispatch({
            type: "getMaterials"
        })
    }

    onchange = (prop, e) => {
        var obj = {};
        obj[prop] = e.target.value;
        this.setState(obj);
        console.log("dashboard state ", this.state);
    }
    update = (e) => {
        if (this.state != {}) {
            store.dispatch({
                type: "updateMaterials",
                payload: {
                    id: e.target.id,
                    ...this.state
                }
            })
        }
        else {
            alert("Make some changes first to be updated ")
        }

    }

    render() {
        return (
            <div>
                <NavBar />
                <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" >
                    <Tab eventKey="home" title="Materials">
                        <Container style={{marginTop:"2%"}}>
                            <h2 style={{textAlign:"center"}}>Materials List</h2>
                            <Table responsive style={{marginTop:"2%"}}>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Unit</th>
                                        <th>PKR from</th>
                                        <th>PKR to</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.materials.map((item) => {
                                        return <tr>
                                            <td>{item.name}</td>
                                            <td>{item.unit}</td>
                                            <td><input defaultValue={item.priceFrom} onChange={this.onchange.bind(this, "priceFrom")}></input></td>
                                            <td><input defaultValue={item.priceTo} onChange={this.onchange.bind(this, "priceTo")}></input></td>
                                            <td><Button variant="success" id={item._id} onClick={this.update.bind(this)}>Update</Button></td>
                                        </tr>
                                    })}

                                </tbody>
                            </Table>
                        </Container>
                    </Tab>
                    <Tab eventKey="profile" title="Architects">
                        <Architects/>
                    </Tab>
                    <Tab eventKey="contact" title="Builders" >
                        <Builders/>

                    </Tab>
                </Tabs>

                {/* <Footer /> */}
            </div>
        )
    }
}

const alMaterials = (store) => {
    if (store.materialsReducer.materials) {
        console.log("data in dashboard", store.materialsReducer.materials)
        return { materials: store.materialsReducer.materials }
    }
    else {
        return { materials: {} }
    }
}

let nDashboard = connect(alMaterials)(Dashboard);
export default nDashboard;
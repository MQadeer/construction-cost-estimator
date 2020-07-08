import React, { Component } from 'react';
import Footer from "../footer/index";
import NavBar from "../navbar/index";
import { Container, Table, Button, Modal, Card } from 'react-bootstrap';
import store from "../../redux/store";
import { connect } from "react-redux";
import config from "../../config";
import history from "../../history";

class Aoffers extends Component {
    state = {
        showDescription: false
    }

    componentWillMount() {
        console.log("offers component")
        const user=JSON.parse(localStorage.getItem("logedUser"))
        store.dispatch({
            type: "getOffers",
            payload: { id: user.id}
        })
    }

    // componentDidMount(){
    //         store.dispatch({
    //             type: "getOffers",
    //             payload:{id:}
    //         })  

    // }
    showDescription = (e) => {
        const offers = this.props.offers;
        const offer = offers.find(i => i._id === e.target.value)
        this.setState({
            info: offer.description,
            name: offer.from.name,
            showDescription: true
        })
    }

    closeDescription = () => {
        this.setState({ showDescription: false })
    }
    render() {
        return (
            <div>
                    <h2 style={{ textAlign: "center" }}>Offers</h2>
                <Container style={{ marginTop: "1%", paddingBottom: "2%" }}>
                    {/* {this.props.architeoffersctsList.map((item, index) => {
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
                        <thead>
                            <tr>
                                <th>From</th>
                                <th>email</th>
                                <th>amount</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.offers.map((item, index) => {
                                return <tr id={item._id}>
                                    <td>{item.from.name}</td>
                                    <td>{item.from.email}</td>
                                    <td>{item.amount}</td>
                                    <td>
                                        <Button variant="primary" value={item._id} onClick={this.showDescription.bind(this)} style={{ marginRight: "2%" }}> see description</Button>
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

const myOffers = (store) => {
    console.log("chats  ", store.architectsReducer.chats)
    return {
        logedIn: store.loginReducer.logedIn, user: store.loginReducer.user,
        offers: store.architectsReducer.offers, architectsList: store.architectsReducer.architects
    }


}

let AOffers = connect(myOffers)(Aoffers);
export default AOffers;
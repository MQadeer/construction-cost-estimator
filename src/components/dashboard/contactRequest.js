import React, { Component } from 'react'
import { Container, Button, Modal, Table } from "react-bootstrap"
import store from "../../redux/store"
import { connect } from "react-redux"



class NcontactRequest extends Component {
  state = {
    showDescription: false
  }

  componentWillMount() {
    store.dispatch({
      type: "getContactRequest"
    })
  }

  // onDelete = (e) => {
  //   store.dispatch({
  //     type: "removeBuilder",
  //     payload: { id: e.target.value }
  //   })
  // }
  // showDescription = (e) => {
  //   const builders = this.props.buildersList;
  //   const builder = builders.find(i => i._id === e.target.value)
  //   this.setState({
  //     info: builder.description,
  //     name: builder.name,
  //     showDescription: true
  //   })
  // }

  // closeDescription = () => {
  //   this.setState({ showDescription: false })
  // }
  render() {
    return (
      <div style={{ marginBottom: "5%" }}>
        <h1 style={{ textAlign: "center", marginTop: "2%", paddingBottom: "2%" }}>Contact </h1>
        <Container style={{ marginTop: "1%", paddingBottom: "2%" }}>
          <Table responsive style={{ marginTop: "2%" }}>
            <tbody>

              {this.props.contactRequestsList != undefined ? this.props.contactRequestsList.map((item) => {
                return <tr>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <Button variant="primary" value={item._id} onClick={this.showDescription.bind(this)} style={{ marginRight: "2%" }}>View more</Button>
                    <Button variant="danger" value={item._id} onClick={this.onDelete.bind(this)} style={{ marginRight: "2%" }}>Remove</Button>
                  </td>
                </tr>
              }) : null}

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

const getBuilders = (store) => {
  console.log("contactRequest list  ", store.loginReducer.contactRequest)
  return {
    contactRequestsList: store.loginReducer.contactRequest, logedIn: store.loginReducer.logedIn,
    user: store.loginReducer.user
  }
}

let contactRequest = connect(getBuilders)(NcontactRequest);
export default contactRequest;
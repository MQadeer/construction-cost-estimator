import React, { Component } from 'react';
import Footer from "../footer/index";
import NavBar from "../navbar/index";
import { Container, Table, Button } from 'react-bootstrap';
import store from "../../redux/store";
import { connect } from "react-redux";

class MaterialPricing extends Component {
  componentWillMount() {
    store.dispatch({
      type: "getMaterials"
    })
  }

  render() {
    return (
      <div>
        <NavBar />
        <Container style={{marginTop:"5%",paddingBottom:"5%"}}>
          
          <h2 style={{textAlign:"center",color:"#0594a9",paddingBottom:"5%"}}>Materials List</h2>
          <Table responsive>
            <thead>
              <tr>
                <th>Item</th>
                <th>Unit</th>
                <th>PKR from</th>
                <th>PKR to</th>
              </tr>
            </thead>
            <tbody>
              {this.props.allMaterials.map((item) => {
                return <tr>
                  {/* <td>{index+1}</td> */}
                  <td>{item.name}</td>
                  <td>{item.unit}</td>
                  <td>{item.priceFrom}</td>
                  <td>{item.priceTo}</td>
                </tr>
              })}

            </tbody>
          </Table>
        </Container>
        <Footer />
      </div>
    )
  }
}

const alMaterials = (store) => {
  if (store.materialsReducer.materials) {
    console.log("data in materials page", store.materialsReducer.materials)
    return { allMaterials: store.materialsReducer.materials }
  }
  else {
    return { materials: {} }
  }
}

let newMaterialPricing = connect(alMaterials)(MaterialPricing);
export default newMaterialPricing;
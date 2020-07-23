import React, { Component } from 'react';
import {Carousel} from "react-bootstrap"
import NavigationBar from "../navbar/index";
import CCE from "../cce/index";
import Footer from "../footer/index";
import MultiImageSlider from "../imageSlider/index";
import BuilderMultiImageSlider from "../builderslider/index";
import Testimonials from "../testimonials/index";
import NArchitechturers from "../architechturers/index";
import Dashboard from "../dashboard/materials";
import Chatbox from "../chatbox/index"
import store from "../../redux/store";
import history from "../../history";
import { connect } from "react-redux"

class Home extends Component {
  componentWillMount() {
    store.dispatch({
      type: "getMaterials"
    })
  }
  render() {
    return (
      <>
        <NavigationBar logedIn={this.props.logedIn} userinfo={this.props.user} />
        {/* <CCE /> */}
        <Carousel pause={false} interval={3000}  style={{height:450,width:"100%",overflow:"hidden"}}>
          <Carousel.Item >
          <img src={require(`../../images/7.jpg`)} class="d-block w-100"  alt="..." />
            {/* <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
          <img src={require(`../../images/3.jpg`)} class="d-block w-100" alt="..." />
          </Carousel.Item>
          <Carousel.Item>
          <img src={require(`../../images/4.jpg`)} class="d-block w-100" alt="..." />
          </Carousel.Item>
        </Carousel>
        <MultiImageSlider />
        <BuilderMultiImageSlider />
        <Testimonials />
        <Footer />
      </>
    )
  }
}

const loginStatus = (store) => {
  console.log("loged in user ", store.loginReducer.user)
  console.log("login status ", store.loginReducer.logedIn)
  return { logedIn: store.loginReducer.logedIn, user: store.loginReducer.user }


}

let nHome = connect(loginStatus)(Home);
export default nHome;

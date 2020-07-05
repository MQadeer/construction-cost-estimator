import React, { Component } from 'react';
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
        <CCE />
        <MultiImageSlider />
        <BuilderMultiImageSlider/>
        <Testimonials />
        <Footer />
      </>
    )
  }
}

const loginStatus = (store) => {
  console.log("loged in user ", store.loginReducer.user)
  console.log("login status ", store.loginReducer.logedIn)
  return { logedIn: store.loginReducer.logedIn, user: store.loginReducer.user}


}

let nHome = connect(loginStatus)(Home);
export default nHome;

import React, { Component } from 'react';
import NavigationBar from "../navbar/index";
import CCE from "../cce/index";
import Footer from "../footer/index";
import MultiImageSlider from "../imageSlider/index";
import Testimonials from "../testimonials/index";
import Architechturers from "../architechturers/index"

export default class Home extends Component {
  render() {
    return (
      <>
        <NavigationBar/>
        <CCE/>
        <MultiImageSlider/>
        <Architechturers data={{name:"hello"}}/>
        <Testimonials/>
        <Footer/>

      </>
    )
  }
}

import React, { Component, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { Container, Row } from "react-bootstrap"



export default class MultiImageSlider extends Component {
    state = {
        no: 0,
        company: {
            0: { name: "Six Sigma",properties:"180 properties for sale" },
            1: { name: "Manahil Estate",properties:"160 properties for sale" },
            2: { name: "My Real Estate",properties:"175 properties for sale" },
            3: { name: "Haroons Estate",properties:"98 properties for sale" },
            4: { name: "ilaan",properties:"67 properties for sale" },
            5: { name: "Al AMEER",properties:"190 properties for sale" },
            
        }
    }
    
    onSlideChange = (e) => {
        if(e.item==5){
            this.setState({
                no:0
            })
        }
        else{
        this.setState({
            no:e.item+1
        })}
        
    }
    responsive = {
        0: { items: 5 },
        1000: { items: 5 },
    }
    render() {
        return (
            <div style={{backgroundColor:"#fcfafa"}}>
                <h1 style={{ textAlign: "center", marginTop: "2%", paddingBottom: "2%" }}>Titanium Agencies</h1>
                <Container style={{ alignContent: "center" }}>
                    <AliceCarousel mouseTrackingEnabled autoPlay={true} autoPlayInterval={1200} responsive={this.responsive}
                        mouseDragEnabled={true} buttonsDisabled={true} onSlideChange={this.onSlideChange}>
                        <img src={require("../../images/sliderImages/1.jpg")} style={{height: "100%",width: "100%"}}  />
                        <img src={require("../../images/sliderImages/2.jpg")} style={{height: "100%",width: "100%"}}  />
                        <img src={require("../../images/sliderImages/3.jpg")} style={{height: "100%",width: "100%"}}  />
                        <img src={require("../../images/sliderImages/4.jpg")} style={{height: "100%",width: "100%"}}  />
                        <img src={require("../../images/sliderImages/5.jpg")} style={{height: "100%",width: "100%"}}  />
                        <img src={require("../../images/sliderImages/6.jpg")} style={{height: "100%",width: "100%"}}  />

                    </AliceCarousel>
        <div style={{ textAlign: "center" }}><h3>{this.state.company[this.state.no].name}</h3></div>
                    <div style={{ textAlign: "center" }}>{this.state.company[this.state.no].properties}</div>


                </Container>
            </div>

        )
    }
}
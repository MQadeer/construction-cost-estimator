import React, { Component, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { Container, Row } from "react-bootstrap"



export default class BuilderMultiImageSlider extends Component {
    state = {
        no: 0,
        company: {
            0: { name: "Architecture one Eight",properties:"180 properties for sale" },
            1: { name: "Architecture your Tag line",properties:"160 properties for sale" },
            2: { name: "Architects",properties:"175 properties for sale" },
            3: { name: "Haoustica",properties:"98 properties for sale" },
            4: { name: "Architecture",properties:"67 properties for sale" },
            5: { name: "Architecture award 2012",properties:"190 properties for sale" },
            
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
            <div style={{backgroundColor:"#fcfafa",marginTop:"5%"}}>
                <h1 style={{ textAlign: "center", marginTop: "2%", paddingBottom: "2%" }}>Builder Agencies</h1>
                <Container style={{ alignContent: "center" }}>
                    <AliceCarousel mouseTrackingEnabled autoPlay={true} autoPlayInterval={1200} responsive={this.responsive}
                        mouseDragEnabled={true} buttonsDisabled={true} onSlideChange={this.onSlideChange}>
                        <img src={require("../../images/sliderImages/New folder/1.jpg")} style={{height: "100%",width: "100%"}}  />
                        <img src={require("../../images/sliderImages/New folder/2.jpg")} style={{height: "100%",width: "100%"}}  />
                        <img src={require("../../images/sliderImages/New folder/3.jpg")} style={{height: "100%",width: "100%"}}  />
                        <img src={require("../../images/sliderImages/New folder/4.jpg")} style={{height: "100%",width: "100%"}}  />
                        <img src={require("../../images/sliderImages/New folder/5.jpg")} style={{height: "100%",width: "100%"}}  />
                        <img src={require("../../images/sliderImages/New folder/6.jpg")} style={{height: "100%",width: "100%"}}  />
                    </AliceCarousel>
        <div style={{ textAlign: "center" }}><h3>{this.state.company[this.state.no].name}</h3></div>
                    <div style={{ textAlign: "center" }}>{this.state.company[this.state.no].properties}</div>


                </Container>
            </div>

        )
    }
}
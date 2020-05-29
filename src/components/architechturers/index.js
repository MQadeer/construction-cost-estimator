import React, { Component } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { Container, Card } from "react-bootstrap"
import { makeStyles } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center", marginTop: "2%", paddingBottom: "2%"
  },


}));
export default function MultiImageSlider(props) {

  const classes = useStyles();
  const handleOnDragStart = (e) => e.preven6tDefault()
  const responsive = {
    0: { items: 2 },
    600: { items: 2 },
    800: { items: 4 },
    3000: { items: 5 },
  }
  return (
    <div>
      <h1 className={classes.heading}
      // style={{ textAlign: "center", marginTop: "2%", paddingBottom: "2%" }}
  >{props.name}</h1>
      <Container>
        <AliceCarousel mouseTrackingEnabled autoPlay={true} autoPlayInterval={1000} responsive={responsive}
          mouseDragEnabled={true} buttonsDisabled={true}>


        </AliceCarousel>
      </Container>
    </div>

  )
}
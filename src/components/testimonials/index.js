import React from 'react';
import { Carousel, Container } from "react-bootstrap";
import image1 from "../../images/testimonies/person.jpg";
import { Avatar, makeStyles } from "@material-ui/core";
import backImage from "../../images/testamoniesBackground.png"

const useStyles = makeStyles((theme) => ({

    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        margin: "auto",
        verticalAlign: "center",

    },
    carouselItem: {
        textAlign: "center",
        color: "white"
    },
    carouseItemText: {
        marginTop: "2%"
    }


}));

export default function Testimonials() {
    const classes = useStyles();
    return (
        <div style={{ backgroundImage: `url(${backImage})`, padding: "2% 0 10% 0" }}>
            <h2 style={{ textAlign: "center", color: "white" }}>SUCCESS
            <span style={{ color: 'red', fontSize: 35 }}> STORIES</span></h2>
            <Container style={{ marginTop: "3%" }}>
                <Carousel indicators={false} >
                    <Carousel.Item className={classes.carouselItem}>

                        <Avatar alt="Mona" src={image1} className={classes.large} />
                        <div className={classes.carouseItemText}>
                            <h3>Martha</h3>
                            <p>It was a great a experience and i was finaly able to get my dream house.</p>
                        </div>

                    </Carousel.Item>
                    <Carousel.Item className={classes.carouselItem}>
                        <Avatar alt="Mona" src={image1} className={classes.large} />
                        <div className={classes.carouseItemText}>
                            <h3>Martha</h3>
                            <p>It was a great a experience and i was finaly able to get my dream house.</p>
                        </div>

                    </Carousel.Item>
                    <Carousel.Item className={classes.carouselItem}>

                        <Avatar alt="Mona" src={image1} className={classes.large} />
                        <div className={classes.carouseItemText}>
                            <h3>Martha</h3>
                            <p>It was a great a experience and i was finaly able to get my dream house.</p>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </Container>
        </div>
    )
}

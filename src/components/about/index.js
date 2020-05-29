import React, { Component } from 'react';
import NavigationBar from "../navbar/index";
import Footer from "../footer/index";
import {Container, Row} from "react-bootstrap"

export default class About extends Component {
  render() {
    return (
      <>
        <NavigationBar/>
        <Container style={{width:"50%"}}>
            <Row>
                <h1>
                    <br/>Our Story...
                </h1>
            </Row>
            <Row style={{fontSize:21}}>
                <br/><p>
                Gharsapna.pk aims at becoming one of the Pakistan’s leading property websites, 
                focussed on helping house-hunters in all tiers of the market find their next home with listings advertised
                 by individuals as well as most of the top estate and letting agents across Pakistan. 
                Our platforms provide an easy to use but sophisticated online property search and other home solutions.
                </p>
                <p>
                Apart from property listings, we are going to provide an exciting service to our respected clients
                 who wish to construct their houses. We will empower them to plan their home construction by 
                 knowing the construction cost in advance. This will be based on the information provided by them 
                 and the latest market rates of construction materials. This will enable them to arrange the funds 
                 as per their needs.
                </p>
                <p>
                At Gharsapna.pk, everything we do is aimed at providing an effective medium for users looking to buy,
                 sell, rent or let quality properties, both in Pakistan and, at later stage, overseas. Gharsapna.pk 
                 aims at becoming the leading online destination for property consumers in the Pakistan and abroad 
                 looking to find top quality homes to buy and/or rent and to discover the Pakistan's leading estate 
                 and letting agents.
                </p>
                <p>
                Gharsapna.pk aims to attract millions of visitors a month and advertise properties from all leading
                 and trusted estate and letting agent branches. Our next destinations would be UAE and aim at extending
                  to other Gulf countries in next couple of years in shaa Allah.
                </p>
                <p>
                Gharsapna.pk is founded in 2016 and has a highly-experienced management team including expertise 
                from property and IT sector, led by Founder & CEO, Dost Muhammad.
                </p>
            </Row>
        </Container>
        <Footer/>
      </>
    )
  }
}

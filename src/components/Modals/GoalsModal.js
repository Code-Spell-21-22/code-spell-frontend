import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faStar, faStarHalfStroke, faStarOfLife} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import {Button, Card, Col, Container} from "react-bootstrap";

export class GoalsModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row className="mx-3 my-5">
                    <span style={{fontSize: "0.7vw"}}>VARIABLES</span>
                    <h1 style={{fontSize: "2vw"}}>Lorem ipsum dolor sit amet</h1>

                    <p className="my-4" style={{fontSize: "0.8vw"}}>Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Nullam tincidunt, lacus a dictum tempor, lorem magna venenatis augue, a tempor ante nunc quis est.
                        Phasellus porta non enim non malesuada. In elementum bibendum dui non laoreet.
                        Nam aliquam lacus imperdiet lorem vehicula dictum quis id sapien.</p>

                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi atque cumque debitis, eaque eius
                        eos ex harum ipsam iusto laboriosam perspiciatis quasi, sequi unde ut vero vitae? Repellat,
                        totam?</p>
                </Row>
                <Row className="mx-3 my-5">
                    <Col className="col-2 text-center">
                        <FontAwesomeIcon icon={faStarOfLife} />
                        <p>IN</p>
                    </Col>
                    <Col className="col-3 mx-1 pt-2 text-center rounded" style={{backgroundColor: "rgba(63,115,194,0.31)"}}>
                        <h6>20</h6>
                        <h6>30</h6>
                    </Col>
                    <Col className="col-2 text-center">
                        <FontAwesomeIcon icon={faStar} />
                        <p>OUT</p>
                    </Col>
                    <Col className="col-3 mx-1 pt-2 text-center rounded" style={{backgroundColor: "rgba(63,115,194,0.31)"}}>
                        <h6>20</h6>
                        <h6>30</h6>
                    </Col>
                </Row>
            </Container>

        );
    }
}

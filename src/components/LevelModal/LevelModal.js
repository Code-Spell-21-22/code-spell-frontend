import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import {Button, Card} from "react-bootstrap";

export class LevelModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="shadow px-5 py-4 mb-4 bg-white rounded">
                <Row className="justify-content-end d-flex">
                    <Button className="col-1" style={{backgroundColor: "white", border: "none"}}>
                        <FontAwesomeIcon style={{color: "black"}} icon={faClose}/>
                    </Button>
                </Row>
                <Row className="justify-content-center d-flex m-3">
                    <Card className="shadow justify-content-center align-items-center d-flex w-100"
                          style={{backgroundColor: "#3f73c2", border: "none", height: "6vh", minHeight: "50px"}}>
                        <span style={{color: "#1E4172"}}>GOALS</span>
                    </Card>
                </Row>
                <Row className="mx-3 my-4">
                    <span style={{fontSize: "0.7vw"}}>VARIABLES</span>
                    <h1>Lorem ipsum dolor sit amet</h1>

                    <span className="mb-4" style={{fontSize: "0.8vw"}}>Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Nullam tincidunt, lacus a dictum tempor, lorem magna venenatis augue, a tempor ante nunc quis est.
                        Phasellus porta non enim non malesuada. In elementum bibendum dui non laoreet.
                        Nam aliquam lacus imperdiet lorem vehicula dictum quis id sapien.</span>

                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi atque cumque debitis, eaque eius
                        eos ex harum ipsam iusto laboriosam perspiciatis quasi, sequi unde ut vero vitae? Repellat,
                        totam?</p>

                </Row>


            </Card>

        );
    }
}

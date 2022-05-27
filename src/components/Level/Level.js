import React from 'react';
import {Button, Card, Col, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {faBars, faClose, faGreaterThan} from "@fortawesome/free-solid-svg-icons";
import {NavbarVertical} from "../NavbarVertical/NavbarVertical";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {GenericModal} from "../Modals/GenericModal";

import Level1_1 from "../LevelGraphics/Chapter1_Introduction/Level1_1"

export class Level extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navbarOpen: false,
            selectedOption: undefined
        }
    }

    navbarHandler() {
        let newState = !(this.state.navbarOpen)
        this.setState({
                navbarOpen: newState
            }
        )
    }

    optionHandler(option) {
        this.setState({
            selectedOption: option,
        });
    }
    render() {

        const fadeIn = this.state.selectedOption ? 'fadein' : 'fadein hide';
        const fadeInNavbar = this.state.navbarOpen ? 'fadein' : 'fadein hide'
        
        return (
            <Container className="container-fluid mx-3 mt-5">
                <Row>
                    <Col className="col-1">
                        <Button className="shadow mb-5 justify-content-center align-items-center d-flex"
                                onClick={this.navbarHandler.bind(this)}
                                style={{
                                    border: "none",
                                    backgroundColor: "#3f73c2",
                                    borderRadius: "10px",
                                    width: "5vw",
                                    height: "5vw",
                                    maxHeight: "70px",
                                    maxWidth: "70px"
                                }}>
                            <FontAwesomeIcon icon={faBars} style={{fontSize: "1.5vw", color: "white"}}/>
                        </Button>
                        <div className={fadeInNavbar}>
                            <NavbarVertical is_disabled={!this.state.navbarOpen}
                                            on_option_changed={this.optionHandler.bind(this)}/>
                        </div>
                    </Col>
                    <Col className="col-6">
                        <Card className="shadow p-3 mb-3 bg-white" style={{borderRadius: "10px"}}>
                            <Row className="justify-content-start d-flex m-2">
                                <span className="mb-2" style={{fontSize: "1.1vw", fontWeight: "bold"}}>Level 2.1</span>
                                <span style={{fontSize: "0.8vw"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, lacus a dictum tempor, lorem magna venenatis augue, a tempor ante nunc quis est. Phasellus porta non enim non malesuada. In elementum bibendum dui non laoreet. Nam aliquam lacus imperdiet lorem vehicula dictum
                                   quis id sapien.</span>
                            </Row>
                        </Card>
                        <Card className="shadow p-3 mb-4 bg-white" style={{height: "64vh", borderRadius: "10px"}}>
                            <Row className="justify-content-start d-flex">

                            </Row>
                        </Card>
                        <Row>
                            <Col className="col-3">
                                <Button onClick={this.optionHandler.bind(this, "errors")}
                                        className="w-100 me-5 shadow bg-white justify-content-center align-items-center d-flex"
                                        style={{border: "none", height: "6vh", minHeight: "50px"}}>
                                    <span style={{color: "#2C5AA2"}}>ERRORS</span>
                                </Button>
                            </Col>
                            <Col className="col-3"></Col>
                            <Col className="col-3">
                                <Button className="w-100 shadow justify-content-center align-items-center d-flex"
                                        style={{
                                            border: "none",
                                            height: "6vh",
                                            minHeight: "50px",
                                            backgroundColor: "#3f73c2"
                                        }} href="/">
                                    <span style={{color: "#13305d"}}>RUN</span>
                                </Button>
                            </Col>
                            <Col className="col-3">
                                <Button className="w-100 shadow justify-content-center align-items-center d-flex"
                                        style={{
                                            backgroundColor: "#1E4172",
                                            border: "none",
                                            height: "6vh",
                                            minHeight: "50px"
                                        }}>
                                    <span style={{color: "white"}}>NEXT LEVEL <FontAwesomeIcon icon={faGreaterThan}
                                                                                               style={{color: "white"}}/>
                                    </span>
                                </Button>
                            </Col>
                        </Row>

                    </Col>

                    <Col className="p-3 mb-4 col-4" style={{height: "78vh", borderRadius: "10px"}} >

                        {/* ! nome deste component tem de mudar conforme nivel (Level1_1, Level2_1, etc) */}
                        <Level1_1 className="m-0" />                            
                    </Col>


                </Row>
            </Container>
        );
    }
}
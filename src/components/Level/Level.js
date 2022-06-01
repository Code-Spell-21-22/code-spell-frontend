import React from 'react';
import {Button, Card, Col, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {faBars, faClose, faGreaterThan} from "@fortawesome/free-solid-svg-icons";
import {NavbarVertical} from "../NavbarVertical/NavbarVertical";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {GenericModal} from "../Modals/GenericModal";
import CodeMirror from '@uiw/react-codemirror';
import {java} from "@codemirror/lang-java";
import { oneDark } from '@codemirror/theme-one-dark';
import axios from "axios";
import {ApiHandler} from '../../utils/api/apihandler';

import ThreeCube from "./scene1";

export class Level extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navbarOpen: false,
            selectedOption: undefined,
            code: undefined
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

    generateUUID() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );

      }


    submitCode() {
        console.log(this.state.code);
        console.log(this.generateUUID());
        let solution_id = this.generateUUID(); //generate with Crypto.randomUUID()
        const level_id = 0 //ceninha
        let header= "Bearer " + localStorage.hasOwnProperty("code_spell_token");
        ApiHandler.postLevelSolution(level_id,solution_id,this.state.code,header);


        
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
                                <CodeMirror
                                    height="60vh"
                                    value= {"//Step 1"+ "\n\n\nclass HelloWorldApp \{\n\tpublic static void main(String[] args) \{\n\t\tSystem.out.println('Hello World!')\;\n\t\}\n\}"+ "\n\n\n//Step 2"+"\n\n\n//Step 3"}
                                    extensions={[java()]}
                                    theme={oneDark}
                                    onChange={(value, viewUpdate) => {
                                        this.setState({code: value});
                                    }}
                                />
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
                                        }}>
                                    <span style={{color: "#13305d"}} onClick={this.submitCode.bind(this)}>RUN</span>
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
                            <Row className="justify-content-right d-flex">
                                <span>ola</span>
                                <ThreeCube />
                            </Row>
                            
                    </Col>

                    <Col className={"col-4 ms-4 " + fadeIn}>

                            <GenericModal className={fadeIn} content_type={this.state.selectedOption}
                                          on_option_changed={this.optionHandler.bind(this)}/>

                    </Col>
                </Row>
            </Container>
        );
    }
}

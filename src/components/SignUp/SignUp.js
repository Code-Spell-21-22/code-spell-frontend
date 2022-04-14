import React from "react";
import Row from "react-bootstrap/Row";
import {Button, Container, Form, Image} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {faEdit, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

export class SignUp extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col className="col-7 mx-5" style={{backgroundColor: "rgb(256, 256, 256, 0.5)", height: "100vh"}}>
                <Row className="justify-content-center d-flex">
                    <Image src="/CODESPELL.png" className="w-50" />
                    <Row className="text-center mb-5">
                        <h3 style={{color: "#1E4172", fontWeight: "bold"}}>Sign Up</h3>
                        <span>Do you already have an account? <Link to="login">Login</Link>!</span>
                    </Row>
                    <Row className="w-75">
                        <Form>
                            <Form.Group className="mb-3 shadow" controlId="formBasicUsername">
                                <Form.Control style={{height: "5vh", minHeight: "40px"}} type="username" placeholder="Username" />
                            </Form.Group>

                            <Form.Group className="mb-3 shadow" controlId="formBasicEmail">
                                <Form.Control style={{height: "5vh", minHeight: "40px"}} type="email" placeholder="Email" />
                            </Form.Group>

                            <Form.Group className="mb-3 shadow" controlId="formBasicPassword">
                                <Form.Control style={{height: "5vh", minHeight: "40px"}} type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="By clicking you agree to the Terms and Conditions" />
                            </Form.Group>
                            <Button className="mt-5 w-100 text-white" type="submit" style={{backgroundColor: "#1c93ec", border: "none", height: "6vh"}}>
                                SIGN UP <FontAwesomeIcon  icon={faEdit} style={{color: "white"}} />
                            </Button>
                        </Form>
                    </Row>
                </Row>
            </Col>
        );
    }
}
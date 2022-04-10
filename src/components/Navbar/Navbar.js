import React from 'react';
import Row from "react-bootstrap/Row";
import {Button, Card, Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Navbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Row className="container-fluid my-5">
            <Col className="col-3 justify-content-start d-flex">
                <Button className="shadow w-75 bg-white" style={{border: "none", height: "6vh"}}>
                    <span style={{color: "#2C5AA2"}}>EXIT</span>
                </Button>
            </Col>
            <Col className="col-6">
                <Card className="shadow w-100" style={{backgroundColor: "#507cbe", border: "none", height: "6vh"}}>
                    <Col className="align-items-center justify-content-center align-items-center d-flex">
                        <span style={{color: "#1E4172"}}>MENU</span>
                    </Col>
                </Card>
            </Col>
            <Col className="col-3 justify-content-end d-flex">
                <Button className="shadow w-75 justify-content-center align-items-center d-flex" style={{backgroundColor: "#1E4172", border: "none", height: "6vh"}}>
                    <span style={{color: "white"}}><FontAwesomeIcon  icon={faUser} style={{color: "white"}} /> ACCOUNT</span>
                </Button>
            </Col>
        </Row>);
    }
}

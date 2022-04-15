import React from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

export class SquareButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col className="text-center">
                <Button className="shadow p-3 mb-5 bg-white p-5 justify-content-center d-flex" style={{border: "none", borderRadius: "20px"}}>
                    <FontAwesomeIcon icon={this.props.icon || faHome} style={{fontSize: "4vw", color: "#1E4172"}}/>
                </Button>
            </Col>
        );
    }
}
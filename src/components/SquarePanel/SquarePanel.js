import React from 'react';
import {Button, Card, Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import * as PropTypes from "prop-types";
import {faHome, faUser} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class SquarePanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col className="text-center">
                <Button className="shadow p-3 mb-5 bg-white w-100 p-5 justify-content-center d-flex" style={{border: "none", borderRadius: "20px"}}>
                    <FontAwesomeIcon icon={this.props.icon || faHome} style={{fontSize: "4vw", color: "#1E4172"}}/>
                </Button>
                <h3 style={{color: "white", fontSize: "1.1vw"}}>{this.props.title}</h3>
            </Col>
        );
    }
}
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
            <Col>
                <Button className="shadow mb-4 bg-white justify-content-center align-items-center d-flex"
                        style={{border: "none", borderRadius: "10px", width: "5vw", height: "5vw", maxHeight: "70px", maxWidth: "70px"}}>
                    <FontAwesomeIcon icon={this.props.icon || faHome} style={{fontSize: "1.5vw", color: "#1E4172"}}/>
                </Button>
            </Col>
        );
    }
}
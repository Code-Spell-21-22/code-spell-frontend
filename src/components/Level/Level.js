import React from 'react';
import {Button, Card, Col, Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {SquarePanel} from "../SquarePanel/SquarePanel";
import {SquareButton} from "../SquareButton/SquareButton";
import {NavbarVertical} from "../NavbarVertical/NavbarVertical";

export class Level extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container className="container-fluid m-4">
                <NavbarVertical />
                <Col>

                </Col>
            </Container>
        );
    }
}
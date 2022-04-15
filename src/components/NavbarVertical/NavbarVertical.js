import React from 'react';
import {Button, Col, Container} from "react-bootstrap";
import {SquareButton} from "../SquareButton/SquareButton";
import {
    faCheck,
    faFile,
    faLightbulb,
    faSignOut,
    faTrophy
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class NavbarVertical extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
    }

    render() {
        return (
            <Col className="col-1">
                <SquareButton icon={faCheck}/>
                <SquareButton icon={faLightbulb}/>
                <SquareButton icon={faTrophy}/>
                <SquareButton icon={faFile}/>
                <SquareButton icon={faSignOut}/>
            </Col>

        );
    }
}
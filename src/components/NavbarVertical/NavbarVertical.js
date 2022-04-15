import React from 'react';
import {Col, Container} from "react-bootstrap";
import {SquareButton} from "../SquareButton/SquareButton";
import {faPlay} from "@fortawesome/free-solid-svg-icons";

export class NavbarVertical extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col className="col-1">
                <SquareButton icon={faPlay}
                />
                <SquareButton icon={faPlay}
                />
                <SquareButton icon={faPlay}
                />
                <SquareButton icon={faPlay}
                />
            </Col>

        );
    }
}
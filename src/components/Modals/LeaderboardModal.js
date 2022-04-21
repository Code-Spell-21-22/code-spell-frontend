import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faStar, faStarHalfStroke, faStarOfLife} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import {Button, Card, Col, Container} from "react-bootstrap";
import {ScoresPanelsList} from "../ScoresPanelsList/ScoresPanelsList";

export class LeaderboardModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Container>
                <Row className="mx-1 mt-4">
                    <span style={{fontSize: "0.7vw"}}>Hello World - JAVA</span>
                    <h1 style={{fontSize: "1.7vw"}}>Level 2.1</h1>
                </Row>
                <ScoresPanelsList />
            </Container>

        );
    }
}

import React from "react";
import Row from "react-bootstrap/Row";
import {Col, Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

export class ErrorsModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let errors = [];

        let nErrors = 4;
        for (let i = 0; i < nErrors; i++) {
            errors.push(
                <Row>
                    <p className="mb-2" style={{fontSize: "1.1vw", fontWeight: "bold"}}>
                        <span style={{fontSize: "0.7vw"}}>Error {i}</span> Lorem ipsum dolor sit amet
                    </p>
                    <p className="mb-5" style={{fontSize: "0.8vw"}}>
                        Nullam tincidunt, lacus a dictum tempor, lorem magna venenatis augue, a tempor ante nunc
                        quis est..</p>
                </Row>)
        }

        return (
            <Container>
                <Row className="mx-1 my-4">
                    <span style={{fontSize: "0.7vw"}}>Hello World - JAVA</span>
                    <h1 style={{fontSize: "1.7vw"}}>4 Errors</h1>
                </Row>
                <Row className="mx-1">
                    {errors}
                </Row>
            </Container>

        );
    }
}

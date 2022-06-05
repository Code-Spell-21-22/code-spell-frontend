import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faGreaterThan,
} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import {Card, Col, Container} from "react-bootstrap";

const DocumentationModal = () => {
    return (
        <Container>
            <Row className="mx-2 mt-5 mb-4 justify-content-center d-flex">
                <Col className="col-6">
                    <Row className="align-items-center d-flex">
                        <Col className="col-2 justify-content-center d-flex">
                            <p className="px-2 py-1 text-white text-center rounded-circle"
                               style={{fontSize: "0.6vw", backgroundColor: "#3f73c2"}}>1</p>
                        </Col>
                        <Col>
                            <p className="mb-3" style={{fontSize: "1.1vw", fontWeight: "bold"}}>Variables</p>
                        </Col>
                    </Row>
                    <p style={{fontSize: "0.8vw"}}>Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit.<br/><br/>
                        Nullam tincidunt, lacus a dictum tempor, lorem magna venenatis augue, a tempor ante nunc
                        quis est..<br/><br/>
                        In elementum dui non laoreet. Nam aliquam lacus
                        imperdiet lorem vehicula dictum
                        quis id sapien.</p>
                </Col>
                <Col className="col-6">
                    <Row className="align-items-center d-flex">
                        <Col className="col-2 justify-content-center d-flex">
                            <p className="px-2 py-1 text-white text-center rounded-circle"
                               style={{fontSize: "0.6vw", backgroundColor: "#3f73c2"}}>2</p>
                        </Col>
                        <Col>
                            <p className="mb-3" style={{fontSize: "1.1vw", fontWeight: "bold"}}>Expressions</p>
                        </Col>
                    </Row>
                    <p style={{fontSize: "0.8vw"}}>Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit.<br/><br/>
                        Nullam tincidunt, lacus a dictum tempor, lorem magna venenatis augue, a tempor ante nunc
                        quis est..<br/><br/>
                        In elementum dui non laoreet. Nam aliquam lacus
                        imperdiet lorem vehicula dictum
                        quis id sapien.</p>
                </Col>
            </Row>
            <Row className="justify-content-center d-flex mb-3">
                <Col className="col-6">
                    <Card className="p-3">
                        <p className="mb-1"
                           style={{fontSize: "0.8vw", fontWeight: "bold", textTransform: "uppercase"}}>Variables</p>
                        <p style={{fontSize: "0.7vw"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                        <h3 className="align-items-center d-flex" style={{fontSize: "0.8vw", color: "#3f73c2"}}>Learn More
                            <FontAwesomeIcon className="rounded-circle text-white p-2 ms-2"
                                             style={{fontSize: "0.4vw", backgroundColor: "#3f73c2"}}
                                             icon={faGreaterThan}/></h3>
                    </Card>
                </Col>
                <Col className="col-6">
                    <Card className="p-3">
                        <p className="mb-1"
                           style={{fontSize: "0.8vw", fontWeight: "bold", textTransform: "uppercase"}}>Expressions</p>
                        <p style={{fontSize: "0.7vw"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                        <h3 className="align-items-center d-flex" style={{fontSize: "0.8vw", color: "#3f73c2"}}>Learn More
                            <FontAwesomeIcon className="rounded-circle text-white p-2 ms-2"
                                             style={{fontSize: "0.4vw", backgroundColor: "#3f73c2"}}
                                             icon={faGreaterThan}/></h3>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DocumentationModal;

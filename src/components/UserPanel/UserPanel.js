import React from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";

export class UserPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="shadow p-3 mb-5 bg-white rounded">
                <Row className="justify-content-start d-flex">
                    <Col className="col-3 align-items-center d-flex">
                        <Image src="/python.png" style={{width: "100%", maxWidth: "140px"}}/>
                    </Col>
                    <Col>
                        <span style={{fontSize: "1.2vw", color: "#1E4172"}}>USERNAME</span>
                        <h3 style={{fontSize: "0.8vw"}}>USER0000@GMAIL.COM</h3>

                        <span style={{fontSize: "0.8vw"}}>PROGRESS</span>
                        <h3 style={{fontSize: "0.8vw"}}>JAVA 80%</h3>

                    </Col>
                </Row>
            </Card>
        );
    }
}
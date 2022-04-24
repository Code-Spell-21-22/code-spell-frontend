import React from 'react';
import Row from "react-bootstrap/Row";
import {Card, Container, FormSelect} from "react-bootstrap";
import {Navbar} from "../Navbar/Navbar";
import {AchievementPanelsList} from "../AchievementPanelsList/AchievementPanelsList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";

export class Achievements extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: "Java"
        }
    }

    updated(event) {
        this.setState({language: event.target.value});
    }

    render() {
        return (
            <Container>
                <Container className="container-fluid">
                    <Row className="justify-content-center d-flex">
                        <Navbar title={"Achievements"} />
                    </Row>
                    <Col className="col-3 mb-3">
                        <FormSelect onChange={this.updated.bind(this)}>
                            <option key={0} value={"Java"}>Java</option>
                            <option key={1} value={"Python"}>Python</option>
                        </FormSelect>
                    </Col>
                    <AchievementPanelsList language={this.state.language}/>
                </Container>
            </Container>
        );
    }
}
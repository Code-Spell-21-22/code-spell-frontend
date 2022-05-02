import React from 'react';
import Row from "react-bootstrap/Row";
import {Card, Col, Container} from "react-bootstrap";
import {faHome, faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export class DifficultyPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clickBehavior: props.clickBehavior,
            active: props.active,
            title: props.title.toUpperCase(),
            description: props.description
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.active !== this.props.active) {
            this.setState(
                {active: this.props.active}
            )
        }
    }

    render() {

        let active = this.state.active;
        if (active !== undefined && active === this.state.title) {
            return (
                <Card className="btn shadow p-3 mb-3 bg-white" style={{borderRadius: "10px", border: "none"}}>
                    <Row className="justify-content-start d-flex m-3">
                    <span className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold", color: "#1E4172"}}>
                        <FontAwesomeIcon icon={faStar}/> {this.state.title}
                    </span>
                        <span style={{fontSize: "0.8vw"}}>{this.state.description}</span>
                    </Row>
                </Card>
            );
        }

        return (
            <Card className="btn shadow p-3 mb-3 bg-white" style={{opacity: "0.6", borderRadius: "10px", border: "none"}} onClick={this.state.clickBehavior}>
                <Row className="justify-content-start d-flex m-3">
                    <span className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold", color: "#1E4172"}}>
                        <FontAwesomeIcon icon={faStar}/> {this.state.title}
                    </span>
                    <span style={{fontSize: "0.8vw"}}>{this.state.description}</span>
                </Row>
            </Card>
        );
    }
}
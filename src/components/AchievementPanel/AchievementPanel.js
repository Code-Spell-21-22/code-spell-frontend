import React from 'react';
import Row from "react-bootstrap/Row";
import {Card, Image} from "react-bootstrap";

export class AchievementPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: this.props.language,
            title: this.props.title,
            description: this.props.description,
            completed: this.props.completed
        }
    }

    render() {

        if (!this.state.completed) {
            return (
                <Card className="shadow p-4 mb-3 rounded" style={{opacity: "0.6"}}>
                    <Row className="justify-content-center d-flex">
                        <Image src="/placeholder.png" style={{width: "100%"}}/>
                    </Row>
                    <span className="mt-4" style={{fontSize: "0.7vw"}}>{this.state.language}</span>
                    <span className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold"}}>{this.state.title}</span>
                    <span style={{fontSize: "0.8vw"}}>{this.state.description}</span>
                </Card>
            );
        }

        return (
            <Card className="shadow p-4 mb-3 rounded">
                <Row className="justify-content-center d-flex">
                    <Image src="/python.png" style={{width: "100%"}}/>
                </Row>
                <span className="mt-4" style={{fontSize: "0.7vw"}}>{this.state.language}</span>
                <span className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold"}}>{this.state.title}</span>
                <span style={{fontSize: "0.8vw"}}>{this.state.description}</span>
            </Card>
        );
    }
}
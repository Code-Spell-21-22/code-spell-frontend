import React from 'react';
import Row from "react-bootstrap/Row";
import {Card, Image} from "react-bootstrap";

export class LanguagePanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: this.props.active,
            category: this.props.category,
            title: this.props.title,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.active !== this.props.active) {
            this.setState(
                {active: this.props.active}
            )
        }
    }

    languagePanelClicked() {
        if (this.props.on_language_changed !== undefined) {
            this.props.on_language_changed(this.state.title);
        }
    }

    render() {

        if (this.state.active !== undefined && this.state.active === this.state.title) {
            return (
                <Card className="btn shadow p-4 mb-3 text-center" style={{borderRadius: "10px"}}>
                    <Row className="justify-content-center d-flex">
                        <Image src="/python.png" style={{width: "100%"}}/>
                    </Row>
                    <span className="mt-4" style={{fontSize: "0.7vw"}}>{this.state.category}</span>
                    <span className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold"}}>{this.state.title}</span>
                </Card>
            );
        }

        return (
            <Card className="btn shadow p-4 mb-3 text-center" style={{opacity: "0.6", borderRadius: "10px"}} onClick={this.languagePanelClicked.bind(this)}>
                <Row className="justify-content-center d-flex">
                    <Image src="/placeholder.png" style={{width: "100%"}}/>
                </Row>
                <span className="mt-4" style={{fontSize: "0.7vw"}}>{this.state.category}</span>
                <span className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold"}}>{this.state.title}</span>
            </Card>
        );
    }
}
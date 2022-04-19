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
import {Link} from "react-router-dom";

export class NavbarVertical extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: undefined
        }
    }

    buttonClicked(option) {
        this.setState({ selectedOption: option });
        if (this.props.on_option_changed !== undefined)
            this.props.on_option_changed(option);
    }

    render() {
        return (
            <Col className="col-1">
                <SquareButton icon={faCheck} click_behaviour={this.buttonClicked.bind(this, "goals")} is_disabled={this.props.is_disabled}/>
                <SquareButton icon={faLightbulb} click_behaviour={this.buttonClicked.bind(this, "tips")} is_disabled={this.props.is_disabled}/>
                <SquareButton icon={faTrophy} click_behaviour={this.buttonClicked.bind(this, "leaderboard")} is_disabled={this.props.is_disabled}/>
                <SquareButton icon={faFile} click_behaviour={this.buttonClicked.bind(this, "documentation")} is_disabled={this.props.is_disabled}/>
                <Link to="/">
                    <SquareButton icon={faSignOut} is_disabled={this.props.is_disabled}/>
                </Link>
            </Col>
        );
    }
}
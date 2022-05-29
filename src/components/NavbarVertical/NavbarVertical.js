import React from "react";
import {Col} from "react-bootstrap";
import SquareButton from "../SquareButton/SquareButton";
import {
    faCheck,
    faFile,
    faLightbulb,
    faSignOut,
    faTrophy
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const NavbarVertical = (props) => {

    const buttonClicked = (option) => {
        if (props.on_option_changed !== undefined)
            props.on_option_changed(option);
    };

    return (
        <Col className="col-1">
            <SquareButton icon={faCheck} click_behaviour={buttonClicked.bind(this, "goals")} is_disabled={props.is_disabled}/>
            <SquareButton icon={faLightbulb} click_behaviour={buttonClicked.bind(this, "tips")} is_disabled={props.is_disabled}/>
            <SquareButton icon={faTrophy} click_behaviour={buttonClicked.bind(this, "leaderboard")} is_disabled={props.is_disabled}/>
            <SquareButton icon={faFile} click_behaviour={buttonClicked.bind(this, "documentation")} is_disabled={props.is_disabled}/>
            <Link to="/">
                <SquareButton icon={faSignOut} is_disabled={props.is_disabled}/>
            </Link>
        </Col>
    );
};

export default NavbarVertical;
import React from "react";
import {Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

const SquareButton = (props) => {

    if (props.is_disabled) {
        return (
            <Col>
                <Button className="shadow mb-4 bg-white justify-content-center align-items-center d-flex disabled"
                        style={{border: "none", borderRadius: "10px", width: "5vw", height: "5vw", maxHeight: "70px", maxWidth: "70px"}}>
                    <FontAwesomeIcon icon={props.icon || faHome} style={{fontSize: "1.5vw", color: "#1E4172"}}/>
                </Button>
            </Col>
        );
    }

    if (props.click_behaviour !== undefined) {
        return (
            <Col>
                <Button className="shadow mb-4 bg-white justify-content-center align-items-center d-flex" onClick={props.click_behaviour}
                        style={{border: "none", borderRadius: "10px", width: "5vw", height: "5vw", maxHeight: "70px", maxWidth: "70px"}}>
                    <FontAwesomeIcon icon={props.icon || faHome} style={{fontSize: "1.5vw", color: "#1E4172"}}/>
                </Button>
            </Col>
        );
    }

    return (
        <Col>
            <Button className="shadow mb-4 bg-white justify-content-center align-items-center d-flex"
                    style={{border: "none", borderRadius: "10px", width: "5vw", height: "5vw", maxHeight: "70px", maxWidth: "70px"}}>
                <FontAwesomeIcon icon={props.icon || faHome} style={{fontSize: "1.5vw", color: "#1E4172"}}/>
            </Button>
        </Col>
    );
};

export default SquareButton;
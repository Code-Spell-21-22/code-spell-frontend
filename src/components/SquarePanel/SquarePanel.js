import React from "react";
import {Button, Col} from "react-bootstrap";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from "react-router-dom";

const SquarePanel = (props) => {

    const enabled = props.link !== undefined;
    if (!enabled) {
        return (
            <Col className="text-center justify-content-center d-flex">
                <Link to="/" style={{textDecoration: "none"}}>
                    <Button
                        className="shadow mb-5 bg-white p-5 justify-content-center align-items-center d-flex disabled"
                        style={{border: "none", borderRadius: "20px", width: "11vw", height: "11vw", maxWidth:"180px", maxHeight:"180px"}}>
                        <FontAwesomeIcon icon={props.icon || faHome}
                                         style={{fontSize: "4vw", color: "#1E4172"}}/>
                    </Button>
                    <h3 style={{color: "white", fontSize: "1.1vw"}}>{props.title}</h3>
                </Link>
            </Col>);
    }


    return (
        <Col className="text-center justify-content-center d-flex">
            <Link to={props.link} style={{textDecoration: "none"}}>
                <Button className="shadow p-3 mb-5 bg-white p-5 justify-content-center align-items-center d-flex"
                        style={{border: "none", borderRadius: "20px", width: "11vw", height: "11vw", maxWidth:"180px", maxHeight:"180px"}}>
                    <FontAwesomeIcon icon={props.icon || faHome} style={{fontSize: "4vw", color: "#1E4172"}}/>
                </Button>
                <h3 style={{color: "white", fontSize: "1.1vw"}}>{props.title}</h3>
            </Link>
        </Col>
    );

};

export default SquarePanel;
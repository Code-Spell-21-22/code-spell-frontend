import React, {useEffect} from 'react';
import Row from "react-bootstrap/Row";
import {Card} from "react-bootstrap";
import {faStar} from "@fortawesome/free-solid-svg-icons";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DifficultyPanel = (props) => {

    const [active, setActive] = React.useState(props.active);
    const [title] = React.useState(props.title);
    const [description] = React.useState(props.description);

    useEffect(() => {
        setActive(props.active);
    }, [props.active]);

    if (props.disabled) {
        return (
            <Card className="btn shadow p-3 mb-3 bg-white disabled" style={{opacity: "0.6", borderRadius: "10px", border: "none"}}>
                <Row className="justify-content-start d-flex m-3">
                    <span className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold", color: "#1E4172"}}>
                        <FontAwesomeIcon icon={faStar}/> {title.toUpperCase()}
                    </span>
                    <span style={{fontSize: "0.8vw"}}>{description}</span>
                </Row>
            </Card>
        );
    }

    if (active !== undefined && active === title) {
        return (
            <Card className="btn shadow p-3 mb-3 bg-white" style={{borderRadius: "10px", border: "none"}}>
                <Row className="justify-content-start d-flex m-3">
                    <span className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold", color: "#1E4172"}}>
                        <FontAwesomeIcon icon={faStar}/> {title.toUpperCase()}
                    </span>
                    <span style={{fontSize: "0.8vw"}}>{description}</span>
                </Row>
            </Card>
        );
    }

    return (
        <Card className="btn shadow p-3 mb-3 bg-white" style={{opacity: "0.6", borderRadius: "10px", border: "none"}} onClick={props.clickBehavior}>
            <Row className="justify-content-start d-flex m-3">
                    <span className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold", color: "#1E4172"}}>
                        <FontAwesomeIcon icon={faStar}/> {title.toUpperCase()}
                    </span>
                <span style={{fontSize: "0.8vw"}}>{description}</span>
            </Row>
        </Card>
    );
};

export default DifficultyPanel;
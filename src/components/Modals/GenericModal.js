import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import {Button, Card} from "react-bootstrap";
import GoalsModal from "./GoalsModal";
import TipsModal from "./TipsModal";
import LeaderboardModal from "./LeaderboardModal";
import DocumentationModal from "./DocumentationModal";
import ErrorsModal from "./ErrorsModal";

const GenericModal = (props) => {

    const closeClicked = () => {
        if (props.on_option_changed !== undefined)
            props.on_option_changed(undefined);
    };

    let content;
    switch (props.content_type) {
        case "goals":
            content = <GoalsModal/>;
            break;
        case "tips":
            content = <TipsModal/>;
            break;
        case "leaderboard":
            content = <LeaderboardModal level={props.level}/>;
            break;
        case "documentation":
            content = <DocumentationModal/>;
            break;
        case "errors":
            content = <ErrorsModal level={props.level}/>;
            break;
    }

    // const fadeIn = selectedOption ? 'fadein' : 'fadein hide';

    return (
        <Card className="shadow px-5 pt-4 pb-5 bg-white rounded" style={{minHeight: "91vh"}}>
            <Row className="justify-content-end d-flex">
                <Button className="col-1" style={{backgroundColor: "white", border: "none"}}
                        onClick={closeClicked.bind(this)}>
                    <FontAwesomeIcon style={{color: "black"}} icon={faClose}/>
                </Button>
            </Row>
            <Row className="justify-content-center d-flex m-3">
                <Card className="shadow justify-content-center align-items-center d-flex w-100"
                      style={{backgroundColor: "#3f73c2", border: "none", height: "6vh", minHeight: "50px"}}>
                    <span style={{color: "#1E4172", textTransform: "uppercase"}}>{props.content_type}</span>
                </Card>
            </Row>
            {content}
        </Card>

    );
};

export default GenericModal;
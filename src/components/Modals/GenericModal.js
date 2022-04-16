import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faStar, faStarHalfStroke, faStarOfLife} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import {Button, Card, Col, Container} from "react-bootstrap";
import {GoalsModal} from "./GoalsModal";
import {TipsModal} from "./TipsModal";
import {LeaderboardModal} from "./LeaderboardModal";
import {DocumentationModal} from "./DocumentationModal";
import {ErrorsModal} from "./ErrorsModal";

export class GenericModal extends React.Component {

    constructor(props) {
        super(props);
    }

    closeClicked() {
        if (this.props.on_option_changed !== undefined)
            this.props.on_option_changed(undefined);
    }

    render() {

        let content;
        switch (this.props.content_type) {
            case "goals":
                content = <GoalsModal/>;
                break;
            case "tips":
                content = <TipsModal/>;
                break;
            case "leaderboard":
                content = <LeaderboardModal/>;
                break;
            case "documentation":
                content = <DocumentationModal/>;
                break;
            case "errors":
                content = <ErrorsModal/>;
                break;
        }

        return (
            <Card className="shadow px-5 pt-4 pb-5 mb-4 bg-white rounded" style={{minHeight: "91vh"}}>
                <Row className="justify-content-end d-flex">
                    <Button className="col-1" style={{backgroundColor: "white", border: "none"}}
                            onClick={this.closeClicked.bind(this)}>
                        <FontAwesomeIcon style={{color: "black"}} icon={faClose}/>
                    </Button>
                </Row>
                <Row className="justify-content-center d-flex m-3">
                    <Card className="shadow justify-content-center align-items-center d-flex w-100"
                          style={{backgroundColor: "#3f73c2", border: "none", height: "6vh", minHeight: "50px"}}>
                        <span style={{color: "#1E4172", textTransform: "uppercase"}}>{this.props.content_type}</span>
                    </Card>
                </Row>
                {content}
            </Card>

        );
    }
}

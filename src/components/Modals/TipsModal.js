import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faCheck} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import {Col, Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import {faClose} from "@fortawesome/free-solid-svg-icons/faClose";

const TipsModal = () => {

    const steps = useSelector(state => state.code.steps);
    let stepPanels = [];

    if (steps) {
        for (let idx in steps) {
            let step = steps[idx];

            if (parseInt(idx) === steps.length - 1) {
                if (step.successful) {
                    stepPanels.push(
                        <Col key={idx} className="col-6">
                            <p className="mb-3" style={{fontSize: "1.1vw", fontWeight: "bold"}}>
                                <FontAwesomeIcon style={{color: "green"}}
                                                 icon={faCheck}/> <span className="me-5">Step {idx}</span>
                            </p>
                            <p className="mb-5" style={{fontSize: "0.8vw"}}>Success</p>
                        </Col>);
                } else {
                    stepPanels.push(
                        <Col key={idx} className="col-6">
                            <p className="mb-3" style={{fontSize: "1.1vw", fontWeight: "bold"}}>
                                <FontAwesomeIcon style={{color: "red"}}
                                                 icon={faClose}/> <span className="me-5">Step {idx}</span>
                            </p>
                            <p className="mb-5" style={{fontSize: "0.8vw"}}>Failed</p>
                        </Col>);
                }
            } else {
                if (step.successful) {
                    stepPanels.push(
                        <Col key={idx} className="col-6">
                            <p className="mb-3" style={{fontSize: "1.1vw", fontWeight: "bold"}}>
                                <FontAwesomeIcon style={{color: "green"}}
                                                 icon={faCheck}/> <span
                                className="me-5">Step {idx}</span><FontAwesomeIcon style={{color: "grey"}}
                                                                                   icon={faArrowRight}/>
                            </p>
                            <p className="mb-5" style={{fontSize: "0.8vw"}}>Success</p>
                        </Col>);
                } else {
                    stepPanels.push(
                        <Col key={idx} className="col-6">
                            <p className="mb-3" style={{fontSize: "1.1vw", fontWeight: "bold"}}>
                                <FontAwesomeIcon style={{color: "red"}}
                                                 icon={faClose}/> <span
                                className="me-5">Step {idx}</span><FontAwesomeIcon style={{color: "grey"}}
                                                                                   icon={faArrowRight}/>
                            </p>
                            <p className="mb-5" style={{fontSize: "0.8vw"}}>Failed</p>
                        </Col>);
                }
            }
        }
    } else {
        stepPanels.push(
            <p className="mb-2" style={{fontSize: "0.8vw"}}>No current tips. Try running your code.</p>
        );
    }

    return (
        <Container>
            <Row className="mx-1 mt-5 justify-content-start d-flex">
                {stepPanels}
            </Row>
        </Container>

    );
};

export default TipsModal;
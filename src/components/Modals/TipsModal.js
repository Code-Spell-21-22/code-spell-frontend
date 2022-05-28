import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import {Col, Container} from "react-bootstrap";

const TipsModal = () => {
    let stepPanels = [];

    let nSteps = 6;
    for (let i = 0; i < nSteps; i++) {
        stepPanels.push(
            <Col key={i} className="col-6">
                <p className="mb-3" style={{fontSize: "1.1vw", fontWeight: "bold"}}>
                    <span className="me-5">Step {i}</span><FontAwesomeIcon style={{color: "grey"}} icon={faArrowRight} />
                </p>
                <p className="mb-5" style={{fontSize: "0.8vw"}}>
                    Nullam tincidunt, lacus a dictum tempor, lorem magna venenatis augue, a tempor ante nunc
                    quis est..</p>
            </Col>)
    }

    return (
        <Container>
            <Row className="mx-1 mt-5 justify-content-center d-flex">
                {stepPanels}
            </Row>
        </Container>

    );
};

export default TipsModal;
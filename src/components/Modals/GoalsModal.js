import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faStarOfLife} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import {Col, Container} from "react-bootstrap";
import {getLevelGoals} from "../../utils/api/apihandler";

const GoalsModal = (props) => {

    const [level, setLevel] = React.useState(props.level);
    const [goals, setGoals] = React.useState([]);

    useEffect(() => {
        getLevelGoals(level.id).then(res => {
            setGoals(res.data);
        });
    }, [level]);

    let goalPanels = [];
    if (goals) {
        for (let idx in goals) {
            let goal = goals[idx];

            goalPanels.push(
                <Row key={idx} className="mx-3 my-5">
                    <span style={{fontSize: "0.7vw"}}>{level.title}</span>
                    <h1 style={{fontSize: "2vw"}}>{goal.title}</h1>

                    <p className="my-4" style={{fontSize: "0.8vw"}}>{goal.description}</p>
                </Row>
            );
        }
    }

    return (
        <Container>
            {goalPanels}
            <Row className="mx-3 my-5">
                <Col className="col-2 text-center">
                    <FontAwesomeIcon icon={faStarOfLife} />
                    <p>IN</p>
                </Col>
                <Col className="col-3 mx-1 pt-2 text-center rounded" style={{backgroundColor: "rgba(63,115,194,0.31)"}}>
                    <h6>20</h6>
                    <h6>30</h6>
                </Col>
                <Col className="col-2 text-center">
                    <FontAwesomeIcon icon={faStar} />
                    <p>OUT</p>
                </Col>
                <Col className="col-3 mx-1 pt-2 text-center rounded" style={{backgroundColor: "rgba(63,115,194,0.31)"}}>
                    <h6>20</h6>
                    <h6>30</h6>
                </Col>
            </Row>
        </Container>
    );
}

export default GoalsModal;

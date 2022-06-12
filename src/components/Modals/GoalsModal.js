import React, {useEffect} from "react";
import Row from "react-bootstrap/Row";
import {Container} from "react-bootstrap";
import {getLevelGoals} from "../../utils/api/apihandler";
import {useDispatch, useSelector} from "react-redux";
import {fetchLanguage, selectLanguage} from "../../features/settings/settingsSlice";

const GoalsModal = (props) => {

    const language = useSelector(selectLanguage);
    const [level] = React.useState(props.level);
    const [goals, setGoals] = React.useState([]);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(fetchLanguage());

        getLevelGoals(level.id).then(res => {
            setGoals(res.data);
        });
    }, [level]);

    let goalPanels = [];
    if (goals) {
        for (let idx in goals) {
            let goal = goals[idx];

            goalPanels.push(
                <Row key={idx} className="mx-1 my-2">
                    <h1 style={{fontSize: "1.7vw"}}>{goal.title}</h1>
                    <p style={{fontSize: "0.8vw"}}>{goal.description}</p>
                </Row>
            );
        }
    }

    return (
        <Container>
            <Row className="mt-4">
                <Row className="mx-1">
                    <span style={{fontSize: "0.7vw"}}>{level.title} - {language}</span>
                </Row>
                {goalPanels}
            </Row>
            {/*
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
            */}
        </Container>
    );
}

export default GoalsModal;

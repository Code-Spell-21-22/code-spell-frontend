import React, {useEffect, useState} from "react";
import {Card, Col, Image, Row} from "react-bootstrap";
import {getAllSolutionsForLevel} from "../../utils/api/apihandler";
import SolutionPanel from "../SolutionPanel/SolutionPanel";
import {toast} from "react-toastify";

const SolutionsPanelsList = (props) => {

    const [currentLevel, setCurrentLevel] = useState(props.completed);
    const [level, setLevel] = useState(props.level);
    const [solutions, setSolutions] = useState(undefined);
    const [solutionPanels, setSolutionPanels] = useState([]);

    useEffect(() => {
        setLevel(props.level);
        setCurrentLevel(props.completed);
    }, [props.level, props.completed]);

    useEffect(() => {

        if (level && currentLevel) {
            getAllSolutionsForLevel(level.id).then(res => {
                setSolutions(res.data);
            });
        }
    }, [level, currentLevel]);

    useEffect(() => {
        if (solutions && level.id >= currentLevel.id) {
            toast.warning("You must complete this level to unlock other solutions");
        }

        let panels = [];
        if (solutions && level && currentLevel) {
            if (level.id < currentLevel.id) {
                for (let solutionIdx in solutions) {
                    let solution = solutions[solutionIdx];
                    panels.push(
                        <Col key={solutionIdx} className="col-6 my-3">
                            <SolutionPanel solution={solution}/>
                        </Col>
                    );
                }
            } else {
                for (let solutionIdx in solutions) {
                    let solution = solutions[solutionIdx];
                    panels.push(
                        <Col key={solutionIdx} className="col-6 my-3">
                            <SolutionPanel solution={solution} hidden={true}/>
                        </Col>
                    );
                }
            }
        }
        setSolutionPanels(panels);

    }, [solutions]);


    return (
        <Row>
            {solutionPanels}
        </Row>
    );
};

export default SolutionsPanelsList;
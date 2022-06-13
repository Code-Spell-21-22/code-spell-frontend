import React from "react";
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import DifficultyPanel from "../DifficultyPanel/DifficultyPanel";
import {useEffect, useState} from "react";

const DifficultyPanelsList = (props) => {

    const [selectedDifficulty, setSelectedDifficulty] = useState(props.selectedDifficulty);

    useEffect(() => {
        setSelectedDifficulty(props.selectedDifficulty);
    }, [props.selectedDifficulty]);

    const difficultyPanelClicked = (title) => {
        if (props.on_difficulty_changed !== undefined)
            props.on_difficulty_changed(title);
    };

    return (
        <Row className="my-4 justify-content-center d-flex">
            <Col>
                <DifficultyPanel
                    active={selectedDifficulty}
                    title={"Novice"}
                    description={"Choose Novice difficulty if you are new to programming and you want to focus on just learning."}
                    clickBehavior={difficultyPanelClicked.bind(this, "Novice")}
                />
            </Col>
            <Col>
                <DifficultyPanel
                    disabled={true}
                    active={selectedDifficulty}
                    title={"Experienced"}
                    description={"Choose Experienced difficulty if you already have experience with programming and you want to improve your coding."}
                    clickBehavior={difficultyPanelClicked.bind(this, "Experienced")}
                />
            </Col>
            <Col>
                <DifficultyPanel
                    disabled={true}
                    active={selectedDifficulty}
                    title={"Advanced"}
                    description={"Choose Advanced difficulty if you are already familiar with programming and you want to give yourself a challenge."}
                    clickBehavior={difficultyPanelClicked.bind(this, "Advanced")}
                />
            </Col>
        </Row>
    );
};

export default DifficultyPanelsList;
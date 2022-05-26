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
                    description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, lacus a dictum tempor, lorem magna venenatis augue."}
                    clickBehavior={difficultyPanelClicked.bind(this, "Novice")}
                />
            </Col>
            <Col>
                <DifficultyPanel
                    active={selectedDifficulty}
                    title={"Experienced"}
                    description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, lacus a dictum tempor, lorem magna venenatis augue."}
                    clickBehavior={difficultyPanelClicked.bind(this, "Experienced")}
                />
            </Col>
            <Col>
                <DifficultyPanel
                    active={selectedDifficulty}
                    title={"Advanced"}
                    description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, lacus a dictum tempor, lorem magna venenatis augue."}
                    clickBehavior={difficultyPanelClicked.bind(this, "Advanced")}
                />
            </Col>
        </Row>
    );
};

export default DifficultyPanelsList;
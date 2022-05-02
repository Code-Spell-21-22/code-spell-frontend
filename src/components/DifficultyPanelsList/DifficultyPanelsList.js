import React from 'react';
import {Col} from "react-bootstrap";
import {AchievementPanel} from "../AchievementPanel/AchievementPanel";
import Row from "react-bootstrap/Row";
import {DifficultyPanel} from "../DifficultyPanel/DifficultyPanel";

export class DifficultyPanelsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDifficulty: props.selectedDifficulty
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedDifficulty !== this.props.selectedDifficulty) {
            this.setState(
                {selectedDifficulty: this.props.selectedDifficulty}
            )
        }
    }

    difficultyPanelClicked(title) {
        if (this.props.on_difficulty_changed !== undefined)
            this.props.on_difficulty_changed(title);
    }

    render() {
        return(
            <Row className="my-4 justify-content-center d-flex">
                <Col>
                    <DifficultyPanel
                        active={this.state.selectedDifficulty}
                        title={"Novice"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, lacus a dictum tempor, lorem magna venenatis augue."}
                        clickBehavior={this.difficultyPanelClicked.bind(this, "NOVICE")}
                    />
                </Col>
                <Col>
                    <DifficultyPanel
                        active={this.state.selectedDifficulty}
                        title={"Experienced"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, lacus a dictum tempor, lorem magna venenatis augue."}
                        clickBehavior={this.difficultyPanelClicked.bind(this, "EXPERIENCED")}
                    />
                </Col>
                <Col>
                    <DifficultyPanel
                        active={this.state.selectedDifficulty}
                        title={"Advanced"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, lacus a dictum tempor, lorem magna venenatis augue."}
                        clickBehavior={this.difficultyPanelClicked.bind(this, "ADVANCED")}
                    />
                </Col>
            </Row>
        );
    }
}
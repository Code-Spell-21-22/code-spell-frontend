import React from "react";
import {Button, Card, Col} from "react-bootstrap";

export class LevelsPanelsList extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            levels: this.props.levels,
            selectedLevel: undefined,
            currentLevel: {"id": "4", "nLv": 2.4, "title": 'More on Classes'}
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.levels != this.props.levels) {
            this.setState(
                {levels: this.props.levels,
                    selectedLevel: undefined}
            )
        }
    }

    levelPanelClicked(level) {
        this.setState({ selectedLevel: level });
        if (this.props.on_level_changed !== undefined)
            this.props.on_level_changed(level);
    }

    render() {

        let levels = this.state.levels;

        let levelPanels = [];

        for (let levelIdx in levels) {

            let level = levels[levelIdx];

            if (this.state.selectedLevel !== undefined && level.id === this.state.selectedLevel.id) {
                levelPanels.push(
                    <Card className="shadow p-3 mb-3 rounded text-center"
                          style={{backgroundColor: "#4b86e0", border: "none"}}
                          onClick={this.levelPanelClicked.bind(this, level)}>
                        <span style={{fontSize: "0.8vw", color: "white"}}>{level.nLv} {level.title}</span>
                    </Card>
                )
            } else if (this.state.currentLevel !== undefined && level.nLv > this.state.currentLevel.nLv) {
                levelPanels.push(
                    <Card className="shadow p-3 mb-3 bg-white rounded text-center" style={{opacity: "0.6"}}>
                        <span style={{fontSize: "0.8vw", color: "#1E4172"}}>{level.nLv} {level.title}</span>
                    </Card>
                )

            } else {
                levelPanels.push(
                    <Card className="shadow p-3 mb-3 bg-white rounded text-center" onClick={this.levelPanelClicked.bind(this, level)}>
                        <span style={{fontSize: "0.8vw", color: "#1E4172"}}>{level.nLv} {level.title}</span>
                    </Card>
                )
            }
        }
        return(
            <Col className="col-3 mx-2">
                {levelPanels}
            </Col>
        );
    }
}
import {Card, Col} from "react-bootstrap";
import {useEffect, useState} from "react";

const LevelsPanelsList = (props) => {

    const [levels, setLevels] = useState(props.levels);
    const [selectedLevel, setSelectedLevel] = useState(undefined);

    // TODO: Obtain current level
    const [currentLevel, setCurrentLevel] = useState({"id": "4", "nLv": 2.4, "title": 'More on Classes'});

    useEffect(() => {
        setLevels(props.levels);
        setSelectedLevel(undefined);
    }, [props.levels]);

    const levelPanelClicked = (level) => {
        setSelectedLevel(level);
        if (props.on_level_changed !== undefined)
            props.on_level_changed(level);
    };

    let levelPanels = [];
    for (let levelIdx in levels) {

        let level = levels[levelIdx];

        if (selectedLevel !== undefined && level.id === selectedLevel.id) {
            levelPanels.push(
                <Card className="shadow p-3 mb-3 rounded text-center"
                      style={{backgroundColor: "#4b86e0", border: "none"}}
                      onClick={levelPanelClicked.bind(this, level)}>
                    <span style={{fontSize: "0.8vw", color: "white"}}>{level.nLv} {level.title}</span>
                </Card>
            )
        } else if (currentLevel !== undefined && level.nLv > currentLevel.nLv) {
            levelPanels.push(
                <Card className="shadow p-3 mb-3 bg-white rounded text-center" style={{opacity: "0.6"}}>
                    <span style={{fontSize: "0.8vw", color: "#1E4172"}}>{level.nLv} {level.title}</span>
                </Card>
            )

        } else {
            levelPanels.push(
                <Card className="shadow p-3 mb-3 bg-white rounded text-center" onClick={levelPanelClicked.bind(this, level)}>
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
};

export default LevelsPanelsList;
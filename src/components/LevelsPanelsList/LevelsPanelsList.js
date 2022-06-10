import React from "react";
import {Card, Col} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchLevels, selectLevels} from "../../features/levels/levelsSlice";
import {fetchDifficulty, fetchLanguage, selectDifficulty, selectLanguage} from "../../features/settings/settingsSlice";

const LevelsPanelsList = (props) => {

    const language = useSelector(selectLanguage);
    const difficulty = useSelector(selectDifficulty);
    const levels = useSelector(selectLevels);

    const [chapter, setChapter] = useState(props.chapter);
    const [selectedLevel, setSelectedLevel] = useState(undefined);
    const [filteredLevels, setFilteredLevels] = useState([]);

    // TODO: Obtain current level
    const [currentLevel, setCurrentLevel] = useState(
        {
            "id": "2",
            "title": "Classes",
            "description": "Description about Classes level.",
            "language": "JAVA",
            "skill": "NOVICE",
            "number": 2.2,
            "chapter": "89a2183ja126a71er2j"
        }
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLanguage());
        dispatch(fetchDifficulty());
    }, [dispatch]);

    useEffect(() => {
        setChapter(props.chapter);
    }, [props.chapter]);

    useEffect(() => {
        dispatch(fetchLevels(language, difficulty));
        setSelectedLevel(undefined);
    }, [language, difficulty]);

    useEffect(() => {
        if (chapter && levels) {
            setFilteredLevels(levels.filter(level => level.chapterId === chapter.id));
        }
    }, [chapter, levels]);


    const levelPanelClicked = (level) => {
        setSelectedLevel(level);
        if (props.on_level_changed !== undefined)
            props.on_level_changed(level);
    };

    let levelPanels = [];
    for (let levelIdx in filteredLevels) {

        let level = filteredLevels[levelIdx];

        if (selectedLevel !== undefined && level.id === selectedLevel.id) {
            levelPanels.push(
                <Card key={levelIdx} className="shadow p-3 mb-3 rounded text-center"
                      style={{backgroundColor: "#4b86e0", border: "none"}}
                      onClick={levelPanelClicked.bind(this, level)}>
                    <span style={{fontSize: "0.8vw", color: "white"}}>{level.number}. {level.title}</span>
                </Card>
            )
        } else if (currentLevel !== undefined && level.number > currentLevel.number) {
            levelPanels.push(
                <Card key={levelIdx} className="shadow p-3 mb-3 bg-white rounded text-center" style={{opacity: "0.6"}}>
                    <span style={{fontSize: "0.8vw", color: "#1E4172"}}>{level.number}. {level.title}</span>
                </Card>
            )

        } else {
            levelPanels.push(
                <Card key={levelIdx} className="shadow p-3 mb-3 bg-white rounded text-center" onClick={levelPanelClicked.bind(this, level)}>
                    <span style={{fontSize: "0.8vw", color: "#1E4172"}}>{level.number}. {level.title}</span>
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
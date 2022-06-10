import React from "react";
import {useEffect, useState} from 'react';
import {Col} from "react-bootstrap";
import AchievementPanel from "../AchievementPanel/AchievementPanel";
import Row from "react-bootstrap/Row";
import {getAllAchievements, getUserAchievements} from "../../utils/api/apihandler";

const AchievementPanelsList = (props) => {

    const [language, setLanguage] = useState(props.language);
    const [allAchievements, setAllAchievements] = useState([]);
    const [userAchievements, setUserAchievements] = useState([]);

    useEffect(() => {

        getUserAchievements().then(res => {
            setUserAchievements(res.data);
        })

        getAllAchievements().then(res => {
            setAllAchievements(res.data);
        });
    }, []);

    useEffect(() => {
        setLanguage(props.language);
    }, [props.language]); // Only re-run the effect if props.language changes

    let achievementsPanels = [];

    for (let achievementIdx in allAchievements) {

        let achievement = allAchievements[achievementIdx];
        let completed = userAchievements.find(a => a.id === achievement.id);

        achievementsPanels.push(
            <Col className="col-2">
                <AchievementPanel key={achievement.id} language={language} title={achievement.title} description={achievement.description} completed={completed}/>
            </Col>

        );
    }

    return (
        <Row>
            {achievementsPanels}
        </Row>
    );
}

export default AchievementPanelsList;
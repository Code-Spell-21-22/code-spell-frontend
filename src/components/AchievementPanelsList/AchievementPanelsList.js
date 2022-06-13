import React from "react";
import {useEffect, useState} from 'react';
import {Col} from "react-bootstrap";
import AchievementPanel from "../AchievementPanel/AchievementPanel";
import Row from "react-bootstrap/Row";
import {getAllAchievements, getUserAchievements} from "../../utils/api/apihandler";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserDetails, selectEmail} from "../../features/userDetails/userDetailsSlice";

const AchievementPanelsList = (props) => {

    const email = useSelector(selectEmail);
    const [language, setLanguage] = useState(props.language);
    const [allAchievements, setAllAchievements] = useState([]);
    const [userAchievements, setUserAchievements] = useState(undefined);
    const [achievementPanels, setAchievementPanels] = useState(undefined);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserDetails());
    }, []);

    useEffect(() => {

        if (email) {
            getUserAchievements(email).then(res => {
                console.log(res.data);
                setUserAchievements(res.data);
            }).catch(err => {
                console.log(err);
            });

            getAllAchievements().then(res => {
                console.log(res.data);
                setAllAchievements(res.data);
            }).catch(err => {
                console.log(err);
            });
        }

    }, [email]);

    useEffect(() => {
        setLanguage(props.language);
    }, [props.language]); // Only re-run the effect if props.language changes

    useEffect(() => {
        let panels = [];
        for (let achievementIdx in allAchievements) {

            let achievement = allAchievements[achievementIdx];
            let completed = userAchievements.filter(a => a.id === achievement.id).length > 0;

            panels.push(
                <Col key={achievementIdx} className="col-2">
                    <AchievementPanel key={achievement.id} language={language} title={achievement.title} description={achievement.description} completed={completed}/>
                </Col>
            );
        }

        setAchievementPanels(panels);

    }, [userAchievements]);

    return (
        <Row>
            {achievementPanels}
        </Row>
    );
}

export default AchievementPanelsList;
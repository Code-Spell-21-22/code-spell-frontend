import {useEffect} from 'react';
import {Col} from "react-bootstrap";
import AchievementPanel from "../AchievementPanel/AchievementPanel";
import Row from "react-bootstrap/Row";

const AchievementPanelsList = (props) => {

    const [language, setLanguage] = React.useState(props.language);

    const achievementsJava = [{"id": 0, "title": "Achievement 1", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": true},
        {"id": 1, "title": "Achievement 2", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": false},
        {"id": 2, "title": "Achievement 3", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": false},
        {"id": 3, "title": "Achievement 4", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": false},
        {"id": 4, "title": "Achievement 5", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": false},
        {"id": 5, "title": "Achievement 6", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": true},
        {"id": 6, "title": "Achievement 7", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": false},
        {"id": 7, "title": "Achievement 8", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": false},
        {"id": 8, "title": "Achievement 9", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": true},
        {"id": 9, "title": "Achievement 10", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": false},
        {"id": 10, "title": "Achievement 11", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": true},
        {"id": 11, "title": "Achievement 12", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": false}];

    const achievementsPython = [{"id": 12, "title": "Achievement 1", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": true},
        {"id": 13, "title": "Achievement 2", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": false},
        {"id": 14, "title": "Achievement 3", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": false},
        {"id": 15, "title": "Achievement 4", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": false},
        {"id": 16, "title": "Achievement 5", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": false},
        {"id": 17, "title": "Achievement 6", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": true},
        {"id": 18, "title": "Achievement 7", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": false},
        {"id": 19, "title": "Achievement 8", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": false},
        {"id": 20, "title": "Achievement 9", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": true},
        {"id": 21, "title": "Achievement 10", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": false},
        {"id": 22, "title": "Achievement 11", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": true},
        {"id": 23, "title": "Achievement 12", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "completed": false}];

    useEffect(() => {
        setLanguage(props.language);
    }, [props.language]); // Only re-run the effect if props.language changes

    let achievementsPanels = [];
    let achievements = [];

    if (language === "Java") {
        achievements = achievementsJava;
    } else if (language === "Python") {
        achievements = achievementsPython;
    }

    for (let achievementIdx in achievements) {

        let achievement = achievements[achievementIdx];
        achievementsPanels.push(
            <Col className="col-2">
                <AchievementPanel key={achievement.id} language={language} title={achievement.title} description={achievement.description} completed={achievement.completed}/>
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
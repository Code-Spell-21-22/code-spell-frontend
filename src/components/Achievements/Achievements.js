import React from "react";
import Row from "react-bootstrap/Row";
import {Container} from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import AchievementPanelsList from "../AchievementPanelsList/AchievementPanelsList";
import {useState} from "react";

const Achievements = () => {

    const [language, setLanguage] = useState("Java");

    const updatedLanguage = (event) => {
        setLanguage(event.target.value);
    }

    return (
        <Container>
            <Container className="container-fluid">
                <Row className="justify-content-center d-flex">
                    <Navbar title={"Achievements"} />
                </Row>
                <AchievementPanelsList language={language}/>
            </Container>
        </Container>
    );
};

export default Achievements;
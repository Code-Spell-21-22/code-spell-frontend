import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import {Button, Col, Container} from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import LanguagePanel from "../LanguagePanel/LanguagePanel";
import DifficultyPanelsList from "../DifficultyPanelsList/DifficultyPanelsList";
import { useSelector, useDispatch } from 'react-redux';
import {
    updateDifficulty,
    updateLanguage,
    selectDifficulty,
    selectLanguage,
    fetchLanguage, fetchDifficulty
} from "../../features/settings/settingsSlice";

const Settings = () => {

    const difficulty = useSelector(selectDifficulty);
    const language = useSelector(selectLanguage);

    const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);
    const [selectedLanguage, setSelectedLanguage] = useState(language);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLanguage());
        dispatch(fetchDifficulty());
    }, [dispatch]);

    useEffect(() => {
        setSelectedDifficulty(difficulty);
        setSelectedLanguage(language);
    }, [difficulty, language]);

    const difficultyChangedHandler = (title) => {
        setSelectedDifficulty(title);
    }

    const languageChangedHandler = (title) => {
        setSelectedLanguage(title);
    }

    const saveChanges = () => {
        dispatch(updateDifficulty(selectedDifficulty));
        dispatch(updateLanguage(selectedLanguage));

        // TODO: API Handler
    };

    const saveButton = () => {
        if (selectedDifficulty !== undefined && selectedLanguage !== undefined) {
            return (
                <Button className="w-100 shadow justify-content-center align-items-center d-flex text-white"
                        style={{
                            border: "none",
                            height: "6vh",
                            minHeight: "50px",
                            backgroundColor: "#1e5ebb"
                        }} onClick={saveChanges}>
                    <span>SAVE</span>
                </Button>
            );
        } else {
            return (
                <Button className="w-100 shadow justify-content-center align-items-center d-flex text-white disabled"
                        style={{
                            border: "none",
                            height: "6vh",
                            minHeight: "50px",
                            backgroundColor: "#1e5ebb"
                        }}>
                    <span>SAVE</span>
                </Button>
            );
        }
    }

    return (
        <Container>
            <Container className="container-fluid">
                <Row className="justify-content-center d-flex">
                    <Navbar title={"Settings"}/>
                </Row>
                <DifficultyPanelsList selectedDifficulty={selectedDifficulty} on_difficulty_changed={difficultyChangedHandler.bind(this)}/>
                <Row className="my-4 justify-content-center d-flex">
                    <Col>
                        <LanguagePanel
                            active={selectedLanguage}
                            category={"Coming soon"}
                            title={"Python"}
                            on_language_changed={languageChangedHandler.bind(this)}
                        />
                    </Col>
                    <Col>
                        <LanguagePanel
                            active={selectedLanguage}
                            category={"Coming soon"}
                            title={"Java"}
                            on_language_changed={languageChangedHandler.bind(this)}
                        />
                    </Col>
                    <Col>
                        <LanguagePanel
                            active={selectedLanguage}
                            category={"Coming soon"}
                            title={"Javascript"}
                            on_language_changed={languageChangedHandler.bind(this)}
                        />
                    </Col>
                    <Col>
                        <LanguagePanel
                            active={selectedLanguage}
                            category={"Coming soon"}
                            title={"C"}
                            on_language_changed={languageChangedHandler.bind(this)}
                        />
                    </Col>
                </Row>
                <Row className="my-4 justify-content-center d-flex">
                    <Col className="col-3">
                        {saveButton()}
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default Settings;
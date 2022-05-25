import React, {useState} from 'react';
import Row from "react-bootstrap/Row";
import {Button, Col, Container} from "react-bootstrap";
import {Navbar} from "../Navbar/Navbar";
import {LanguagePanel} from "../LanguagePanel/LanguagePanel";
import {DifficultyPanelsList} from "../DifficultyPanelsList/DifficultyPanelsList";
import { useSelector, useDispatch } from 'react-redux';
import { updateDifficulty, updateLanguage, selectDifficulty, selectLanguage } from "../../features/settings/settingsSlice";

const Settings = () => {

    const [selectedDifficulty, setSelectedDifficulty] = useState(useSelector(selectDifficulty));
    const [selectedLanguage, setSelectedLanguage] = useState(useSelector(selectedLanguage));

    const dispatch = useDispatch();

    const difficultyChangedHandler = (title) => {
        dispatch(updateDifficulty(title));
        setSelectedLanguage(useSelector(selectDifficulty()));
        // setSelectedDifficulty(title);
    }

    const languageChangedHandler = (title) => {
        dispatch(updateLanguage(title));
        setSelectedLanguage(useSelector(selectLanguage()));
        // setSelectedLanguage(title);
    }

    const saveButton = () => {
        if (selectedDifficulty !== undefined && selectedLanguage !== undefined) {
            return (
                <Button className="w-100 shadow justify-content-center align-items-center d-flex text-white"
                        style={{
                            border: "none",
                            height: "6vh",
                            minHeight: "50px",
                            backgroundColor: "#1e5ebb"
                        }} href="/">
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
import React from 'react';
import Row from "react-bootstrap/Row";
import {Button, Col, Container} from "react-bootstrap";
import {Navbar} from "../Navbar/Navbar";
import {DifficultyPanel} from "../DifficultyPanel/DifficultyPanel";
import {LanguagePanel} from "../LanguagePanel/LanguagePanel";
import {DifficultyPanelsList} from "../DifficultyPanelsList/DifficultyPanelsList";


export class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDifficulty: undefined,
            selectedLanguage: undefined
        }
    }

    difficultyChangedHandler(title) {
        this.setState({
            selectedDifficulty: title
        })
    }

    languageChangedHandler(title) {
        console.log(title)
        this.setState({
            selectedLanguage: title
        })
    }

    render() {

        let saveButton;
        if (this.state.selectedDifficulty !== undefined && this.state.selectedLanguage !== undefined) {
            saveButton =
                <Button className="w-100 shadow justify-content-center align-items-center d-flex text-white"
                        style={{
                            border: "none",
                            height: "6vh",
                            minHeight: "50px",
                            backgroundColor: "#1e5ebb"
                        }} href="/">
                    <span>SAVE</span>
                </Button>;
        } else {
            saveButton =
                <Button className="w-100 shadow justify-content-center align-items-center d-flex text-white disabled"
                        style={{
                            border: "none",
                            height: "6vh",
                            minHeight: "50px",
                            backgroundColor: "#1e5ebb"
                        }}>
                    <span>SAVE</span>
                </Button>;
        }

        return (
            <Container>
                <Container className="container-fluid">
                    <Row className="justify-content-center d-flex">
                        <Navbar title={"Settings"}/>
                    </Row>
                    <DifficultyPanelsList selectedDifficulty={this.state.selectedDifficulty} on_difficulty_changed={this.difficultyChangedHandler.bind(this)}/>
                    <Row className="my-4 justify-content-center d-flex">
                        <Col>
                            <LanguagePanel
                                active={this.state.selectedLanguage}
                                category={"Coming soon"}
                                title={"Python"}
                                on_language_changed={this.languageChangedHandler.bind(this)}
                            />
                        </Col>
                        <Col>
                            <LanguagePanel
                                active={this.state.selectedLanguage}
                                category={"Coming soon"}
                                title={"Java"}
                                on_language_changed={this.languageChangedHandler.bind(this)}
                            />
                        </Col>
                        <Col>
                            <LanguagePanel
                                active={this.state.selectedLanguage}
                                category={"Coming soon"}
                                title={"Javascript"}
                                on_language_changed={this.languageChangedHandler.bind(this)}
                            />
                        </Col>
                        <Col>
                            <LanguagePanel
                                active={this.state.selectedLanguage}
                                category={"Coming soon"}
                                title={"C"}
                                on_language_changed={this.languageChangedHandler.bind(this)}
                            />
                        </Col>
                    </Row>
                    <Row className="my-4 justify-content-center d-flex">
                        <Col className="col-3">
                            {saveButton}
                        </Col>
                    </Row>
                </Container>
            </Container>
        );
    }
}
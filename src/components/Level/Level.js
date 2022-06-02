import React from "react";
import {Button, Card, Col, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {faBars, faGreaterThan} from "@fortawesome/free-solid-svg-icons";
import NavbarVertical from "../NavbarVertical/NavbarVertical";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GenericModal from "../Modals/GenericModal";

import CodeMirror from '@uiw/react-codemirror';
import {java} from "@codemirror/lang-java";
import { oneDark } from '@codemirror/theme-one-dark';
import axios from "axios";

import ThreeCube from "./scene1"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchLevels, selectLevels} from "../../features/levels/levelsSlice";
import {fetchDifficulty, fetchLanguage, selectDifficulty, selectLanguage} from "../../features/settings/settingsSlice";
import {connect, disconnect, isStompClientConnected} from "../../web_sockets/WebSocket";

const Level = () => {

    const levels = useSelector(selectLevels);
    const language = useSelector(selectLanguage);
    const difficulty = useSelector(selectDifficulty);

    const initialCode = "//Step 1"+ '\n\n\nclass HelloWorldApp \{\n\tpublic static void main(String[] args) \{\n\t\tSystem.out.println("Hello World!")\;\n\t\}\n\}' + "\n\n\n//Step 2"+"\n\n\n//Step 3";

    const [navbarOpen, setNavbarOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(undefined);
    const [level, setLevel] = useState(undefined);
    const [code, setCode] = useState(initialCode);

    let { levelNumber } = useParams();

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

        if (!isStompClientConnected())
            connect();

    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchLevels(language, difficulty));
    }, [language, difficulty]);

    useEffect(() => {
        if (levels.length > 0) {
            setLevel(levels.find(level => level.number.toString() === levelNumber));
        }
    }, [levels, levelNumber]);

    const navbarHandler = () => {
        setNavbarOpen(!navbarOpen);
    };

    const optionHandler = (option) => {
        setSelectedOption(option);
    };

    const generateUUID = () => {
        return(
        ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)));
    };

    const submitCode = () => {

        let solutionId = generateUUID(); //generate with Crypto.randomUUID()
        const URL = 'http://dev.codespell.live:8080/api/level/' + level.id + '/submit/' + solutionId;
        axios.post(URL, code, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('code_spell_token'),
                'Content-Type': 'text/plain'
            }
        }).then(r => {
            console.log(r);
        }).catch(e => {
            console.log(e);
        });
    }

    const fadeInNavbar = navbarOpen ? 'fadein' : 'fadein hide';

    if (level === undefined || levelNumber > currentLevel.number) {
        return (
            <Container className="container-fluid mx-3 mt-5">
                <Row>
                    <Col className="col-1">
                        <Button className="shadow mb-5 justify-content-center align-items-center d-flex"
                                onClick={navbarHandler.bind(this)}
                                style={{
                                    border: "none",
                                    backgroundColor: "#3f73c2",
                                    borderRadius: "10px",
                                    width: "5vw",
                                    height: "5vw",
                                    maxHeight: "70px",
                                    maxWidth: "70px"
                                }}>
                            <FontAwesomeIcon icon={faBars} style={{fontSize: "1.5vw", color: "white"}}/>
                        </Button>
                        <div className={fadeInNavbar}>
                            <NavbarVertical is_disabled={!navbarOpen}
                                            on_option_changed={optionHandler.bind(this)}/>
                        </div>
                    </Col>
                    <Col className="col-6">
                        <Card className="shadow p-3 mb-3 bg-white" style={{borderRadius: "10px"}}>
                            <Row className="justify-content-start d-flex m-2">
                                <span className="mb-2" style={{fontSize: "1.1vw", fontWeight: "bold"}}>Loading...</span>
                                <span style={{fontSize: "0.8vw"}}>Loading...</span>
                            </Row>
                        </Card>
                        <Card className="shadow p-3 mb-4 bg-white" style={{height: "64vh", borderRadius: "10px"}}>
                            <Row className="justify-content-start d-flex">

                            </Row>
                        </Card>
                        <Row>
                            <Col className="col-3">
                                <Button
                                        className="disabled w-100 me-5 shadow bg-white justify-content-center align-items-center d-flex"
                                        style={{border: "none", height: "6vh", minHeight: "50px"}}>
                                    <span style={{color: "#2C5AA2"}}>ERRORS</span>
                                </Button>
                            </Col>
                            <Col className="col-3"></Col>
                            <Col className="col-3">
                                <Button className="disabled w-100 shadow justify-content-center align-items-center d-flex"
                                        style={{
                                            border: "none",
                                            height: "6vh",
                                            minHeight: "50px",
                                            backgroundColor: "#3f73c2"
                                        }}>
                                    <span style={{color: "#13305d"}}>RUN</span>
                                </Button>
                            </Col>
                            <Col className="col-3">
                                <Button className="disabled w-100 shadow justify-content-center align-items-center d-flex"
                                        style={{
                                            backgroundColor: "#1E4172",
                                            border: "none",
                                            height: "6vh",
                                            minHeight: "50px"
                                        }}>
                                    <span style={{color: "white"}}>NEXT LEVEL <FontAwesomeIcon icon={faGreaterThan}
                                                                                               style={{color: "white"}}/>
                                    </span>
                                </Button>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Container>
        );
    }

    return (
        <Container className="container-fluid mx-3 mt-5">
            <Row>
                <Col className="col-1">
                    <Button className="shadow mb-5 justify-content-center align-items-center d-flex"
                            onClick={navbarHandler.bind(this)}
                            style={{
                                border: "none",
                                backgroundColor: "#3f73c2",
                                borderRadius: "10px",
                                width: "5vw",
                                height: "5vw",
                                maxHeight: "70px",
                                maxWidth: "70px"
                            }}>
                        <FontAwesomeIcon icon={faBars} style={{fontSize: "1.5vw", color: "white"}}/>
                    </Button>
                    <div className={fadeInNavbar}>
                        <NavbarVertical is_disabled={!navbarOpen}
                                        on_option_changed={optionHandler.bind(this)}/>
                    </div>
                </Col>
                <Col className="col-6">
                    <Card className="shadow p-3 mb-3 bg-white" style={{borderRadius: "10px"}}>
                        <Row className="justify-content-start d-flex m-2">
                            <span className="mb-2" style={{fontSize: "1.1vw", fontWeight: "bold"}}>Level {level.number}</span>
                            <span style={{fontSize: "0.8vw"}}>{level.description}</span>
                        </Row>
                    </Card>
                    <Card className="shadow p-3 mb-4 bg-white" style={{height: "64vh", borderRadius: "10px"}}>
                        <Row className="justify-content-start d-flex">
                            <CodeMirror
                                height="60vh"
                                value= {initialCode}
                                extensions={[java()]}
                                theme={oneDark}
                                onChange={(value, viewUpdate) => {
                                    setCode(value);
                                }}
                            />
                        </Row>
                    </Card>
                    <Row>
                        <Col className="col-3">
                            <Button onClick={optionHandler.bind(this, "errors")}
                                    className="w-100 me-5 shadow bg-white justify-content-center align-items-center d-flex"
                                    style={{border: "none", height: "6vh", minHeight: "50px"}}>
                                <span style={{color: "#2C5AA2"}}>ERRORS</span>
                            </Button>
                        </Col>
                        <Col className="col-3"></Col>
                        <Col className="col-3">
                            <Button className="w-100 shadow justify-content-center align-items-center d-flex"
                                    style={{
                                        border: "none",
                                        height: "6vh",
                                        minHeight: "50px",
                                        backgroundColor: "#3f73c2"
                                    }} onClick={submitCode.bind(this)}>
                                <span style={{color: "#13305d"}}>RUN</span>
                            </Button>
                        </Col>
                        <Col className="col-3">
                            <Button className="w-100 shadow justify-content-center align-items-center d-flex"
                                    style={{
                                        backgroundColor: "#1E4172",
                                        border: "none",
                                        height: "6vh",
                                        minHeight: "50px"
                                    }}>
                                    <span style={{color: "white"}}>NEXT LEVEL <FontAwesomeIcon icon={faGreaterThan}
                                                                                               style={{color: "white"}}/>
                                    </span>
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col className="mx-3 p-0 mb-4 col-4" style={{minHeight: "50vh", borderRadius: "10px", backgroundColor: "white"}} >
                    {!selectedOption &&
                        <Row className="justify-content-right d-flex">
                            <ThreeCube />
                        </Row>
                    }

                    {selectedOption !== undefined &&
                        <GenericModal content_type={selectedOption} level={level}
                                      on_option_changed={optionHandler.bind(this)}/>
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default Level;
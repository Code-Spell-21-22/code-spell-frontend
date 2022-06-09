import React from "react";
import {Button, Card, Col, Container, Spinner} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {faBars, faGreaterThan} from "@fortawesome/free-solid-svg-icons";
import NavbarVertical from "../NavbarVertical/NavbarVertical";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GenericModal from "../Modals/GenericModal";

import CodeMirror from '@uiw/react-codemirror';
import {java} from "@codemirror/lang-java";
import { oneDark } from '@codemirror/theme-one-dark';
import {postLevelSolution} from '../../utils/api/apihandler';

import Level1_1 from "../LevelGraphics/Chapter1_Introduction/Level1_1"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchLevels, selectLevels} from "../../features/levels/levelsSlice";
import {fetchDifficulty, fetchLanguage, selectDifficulty, selectLanguage} from "../../features/settings/settingsSlice";
import {connect, isStompClientConnected, updateListenableCodeId} from "../../web_sockets/WebSocket";
import {
    selectErrors,
    selectExecutionStatus,
    selectId,
    selectSteps
} from "../../features/code/codeSlice";

const Level = () => {

    const levels = useSelector(selectLevels);
    const language = useSelector(selectLanguage);
    const difficulty = useSelector(selectDifficulty);

    const steps = useSelector(selectSteps);
    const executionStatus = useSelector(selectExecutionStatus);
    const codeReportId = useSelector(selectId);
    const errors = useSelector(selectErrors);

    const initialCode = "//Step 1"+ '\n\n\nclass HelloWorldApp \{\n\tpublic static void main(String[] args) \{\n\t\tSystem.out.println("Hello World!")\;\n\t\}\n\}' + "\n\n\n//Step 2"+"\n\n\n//Step 3";

    const [navbarOpen, setNavbarOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(undefined);
    const [level, setLevel] = useState(undefined);
    const [code, setCode] = useState(initialCode);
    const [errorFound, setErrorFound] = useState(false);
    const [loading, setLoading] = useState(false);

    const output = useSelector(state => state.code.output);

    let { levelNumber } = useParams();

    // TODO: Obtain current level
    const [currentLevel, setCurrentLevel] = useState(
        {
            "id": "628c9c42cc425b74e59c3658",
            "title": "Variables",
            "description": "Description about variables level.",
            "language": "JAVA",
            "skill": "NOVICE",
            "number": 1.1,
            "chapter": "89a2183ja126a712j"
        }
    );

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(fetchLanguage());
        dispatch(fetchDifficulty());

        if (!isStompClientConnected())
            connect();

        dispatch(fetchLevels(language, difficulty));

        /*
        if (levels.length > 0)
            setLevel(levels.find(level => level.number.toString() === levelNumber));
        */

    }, []);

    useEffect(() => {
        setLoading(false);
    }, [codeReportId]);

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

        if (!isStompClientConnected())
            connect();

        let solutionId = generateUUID(); //generate with Crypto.randomUUID()
        let header = "Bearer " + localStorage.hasOwnProperty("code_spell_token");

        updateListenableCodeId(solutionId); // Update Websockets

        postLevelSolution(currentLevel.id, solutionId, code, header)
            .then(r => {
                console.log(r);
                setLoading(true)
            })
            .catch(e => {console.log(e); setLoading(false)});

    }

    const fadeInNavbar = navbarOpen ? 'fadein' : 'fadein hide';

    if (!currentLevel) return;

    let outputPanels = [];
    if (!output) {
        outputPanels.push(<span style={{fontSize: "0.8vw"}}>---</span>)
    } else {
        for (let o of output) {
            outputPanels.push(<span style={{fontSize: "0.8vw"}}>{o}</span>);
        }
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
                            <span className="mb-2" style={{fontSize: "1.1vw", fontWeight: "bold"}}>Level {currentLevel.number}</span>
                            <span style={{fontSize: "0.8vw"}}>{currentLevel.description}</span>
                        </Row>
                    </Card>
                    <Card className="shadow p-3 mb-3 bg-white" style={{height: "48vh", borderRadius: "10px"}}>
                        <Row className="justify-content-start d-flex">
                            <CodeMirror
                                height="44vh"
                                value= {'class HelloWorldApp \{\n\tpublic static void main(String[] args) \{\n\t\tSystem.out.println("Hello World!")\;\n\t\}\n\}'}
                                extensions={[java()]}
                                theme={oneDark}
                                onChange={(value, viewUpdate) => {
                                    setCode(value);
                                }}
                            />
                        </Row>
                    </Card>
                    <Card className="shadow p-3 mb-3 bg-white" style={{borderRadius: "10px", minHeight: "150px"}}>
                        <Row className="justify-content-start d-flex m-2">
                            <span className="mb-2" style={{fontSize: "1.1vw", fontWeight: "bold"}}>Output</span>
                            <Row style={{maxHeight: "70px", overflowY: "auto"}}>
                                {outputPanels}
                            </Row>
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
                        <Col className="col-3 align-items-center justify-content-end d-flex">
                            {loading &&
                                <Spinner animation="border" variant="light"/>
                            }
                        </Col>
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
                            <Level1_1 executionStatus={executionStatus} steps={steps}/>
                        </Row>
                    }

                    {selectedOption !== undefined &&
                        <GenericModal content_type={selectedOption} level={currentLevel}
                                      on_option_changed={optionHandler.bind(this)}/>
                    }

                </Col>
            </Row>
        </Container>
    );
};

export default Level;
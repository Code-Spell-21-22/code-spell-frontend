import React from "react";
import {Button, Card, Col, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import ChapterPanelsList from "../ChapterPanelsList/ChapterPanelsList";
import LevelsPanelsList from "../LevelsPanelsList/LevelsPanelsList";
import Navbar from "../Navbar/Navbar";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserDetails, fetchUserProgress, selectProgress} from "../../features/userDetails/userDetailsSlice";
import {useEffect, useState} from "react";
import {fetchDifficulty, fetchLanguage, selectDifficulty, selectLanguage} from "../../features/settings/settingsSlice";

const Levels = () => {

    const language = useSelector(selectLanguage);
    const difficulty = useSelector(selectDifficulty);
    const progress = useSelector(selectProgress);

    const [selectedChapter, setSelectedChapter] = useState(undefined);
    const [selectedLevel, setSelectedLevel] = useState(undefined);
    const [selectedProgress, setSelectedProgress] = useState(undefined);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLanguage());
        dispatch(fetchDifficulty());
        dispatch(fetchUserDetails());
    }, [dispatch]);

    useEffect(() => {
        if (language && difficulty) {
            dispatch(fetchUserProgress(language, difficulty));
        }
    }, [language, difficulty]);

    useEffect(() => {
        for (let idx in progress) {
            if (progress[idx].language === language.toUpperCase()) {
                setSelectedProgress(progress[idx]);
            }
        }
    }, [progress]);

    const chapterChangedHandler = (chapter) => {
        setSelectedChapter(chapter);
        setSelectedLevel(undefined);
    }

    const levelChangedHandler = (level) => {
        setSelectedLevel(level);
    }

    // Progress Data

    let completed = 0;
    let notCompleted = 0;
    let total = 0;
    let percentage = 0;

    if (progress) {
        completed = progress.Completed;
        total = progress.Total;
        notCompleted = total - completed
        percentage = Math.round(completed / total * 100);
    }

    const data = {
        labels: ['Completed', 'Not Completed'],
        datasets: [
            {
                label: 'Progress',
                data: [completed, notCompleted],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    let start;
    if (selectedChapter !== undefined && selectedLevel !== undefined) {
        start =
            <Button className="shadow w-75 justify-content-center align-items-center d-flex"
                    style={{backgroundColor: "#3f73c2", border: "none", height: "6vh"}}
                    href={"/levels/" + selectedLevel.id}>
                <span style={{color: "white"}}>START</span>
            </Button>;
    } else {
        start = <Button className="shadow w-75 justify-content-center align-items-center d-flex disabled"
                        style={{backgroundColor: "#3f73c2", border: "none", height: "6vh"}}>
            <span style={{color: "white"}}>START</span>
        </Button>
    }

    ChartJS.register(ArcElement, Tooltip, Legend);

    return (
        <Container>
            <Container className="container-fluid">
                <Row className="justify-content-center d-flex">
                    <Navbar title={"Levels"}/>
                </Row>
                <Row className="my-4 justify-content-center d-flex">
                    <ChapterPanelsList on_chapter_changed={chapterChangedHandler.bind(this)}/>
                    <LevelsPanelsList on_level_changed={levelChangedHandler.bind(this)}
                                      chapter={selectedChapter}/>
                    <Col className="col-5">
                        <Card className="shadow p-3 mb-3 text-center" style={{border: "none", borderRadius: "20px"}}>
                            <span>Progress</span>
                            <span className="mb-3" style={{color: 'rgba(54, 162, 235, 0.8)'}}>{language}</span>
                            <Col className="mx-5 my-3">
                                <Doughnut data={data}/>
                            </Col>
                            <span style={{fontSize: "0.8vw", color: "#1E4172"}}>{completed}/{total} Levels</span>
                            <span className="mb-4" style={{fontSize: "0.8vw", color: "#1E4172"}}>{percentage}%</span>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-center d-flex">
                    <Col className="col-3">
                        {start}
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default Levels;
import React from "react";
import {Button, Card, Col, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {ChapterPanelsList} from "../ChapterPanelsList/ChapterPanelsList";
import {LevelsPanelsList} from "../LevelsPanelsList/LevelsPanelsList";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Navbar} from "../Navbar/Navbar";

export class Levels extends React.Component {

    data = {
        labels: ['Completed', 'Not Completed'],
        datasets: [
            {
                label: 'Progress',
                data: [12, 8],
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

    constructor(props) {
        super(props);
        this.state = {
            selectedChapter: undefined,
            selectedLevel: undefined
        }
    }

    chapterChangedHandler(chapter) {
        this.setState({
            selectedChapter: chapter,
            selectedLevel: undefined
        });
    }

    levelChangedHandler(level) {
        this.setState({
            selectedLevel: level,
        });
    }

    render() {

        let start;
        if (this.state.selectedChapter !== undefined && this.state.selectedLevel !== undefined) {
            start =
                <Button className="shadow w-75 justify-content-center align-items-center d-flex" style={{backgroundColor: "#3f73c2", border: "none", height: "6vh"}}
                href={"/levels/" + this.state.selectedLevel.id}>
                    <span style={{color: "white"}}>START</span>
                </Button>;
        } else {
            start = <Button className="shadow w-75 justify-content-center align-items-center d-flex disabled" style={{backgroundColor: "#3f73c2", border: "none", height: "6vh"}}>
                <span style={{color: "white"}}>START</span>
            </Button>
        }

        let selectedChapter = this.state.selectedChapter || "";
        ChartJS.register(ArcElement, Tooltip, Legend);

        return (
            <Container>
                <Container className="container-fluid">
                    <Row className="justify-content-center d-flex">
                        <Navbar title={"Levels"} />
                    </Row>
                    <Row className="my-4 justify-content-center d-flex">
                        <ChapterPanelsList on_chapter_changed={this.chapterChangedHandler.bind(this)}/>
                        <LevelsPanelsList on_level_changed={this.levelChangedHandler.bind(this)} levels={selectedChapter.levels}/>
                        <Col className="col-5">
                            <Card className="shadow p-3 mb-3 text-center" style={{border: "none", borderRadius: "20px"}}>
                                <span>Progress</span>
                                <span className="mb-3" style={{color: 'rgba(54, 162, 235, 0.8)'}}>JAVA</span>
                                <Col className="mx-5 my-3">
                                    <Doughnut  data={this.data}/>
                                </Col>
                                <span style={{fontSize: "0.8vw", color: "#1E4172"}}>12/20 Levels</span>
                                <span className="mb-4" style={{fontSize: "0.8vw", color: "#1E4172"}}>60%</span>
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
    }
}
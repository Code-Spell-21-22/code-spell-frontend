import React from "react";
import {Card, Col, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {ChapterPanelsList} from "../ChapterPanelsList/ChapterPanelsList";
import {LevelsPanelsList} from "../LevelsPanelsList/LevelsPanelsList";

export class Levels extends React.Component {

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

        let selectedChapter = this.state.selectedChapter || "";

        return (
            <Container className="container-fluid">
                <Row className="my-5 justify-content-center d-flex">
                    <ChapterPanelsList on_chapter_changed={this.chapterChangedHandler.bind(this)} chapters={this.state.chapters}/>
                    <LevelsPanelsList on_level_changed={this.levelChangedHandler.bind(this)} levels={selectedChapter.levels}/>
                    <Col className="col-5">
                        <Card className="shadow p-3 mb-3 rounded text-center">

                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
import React from "react";
import {Card, Col} from "react-bootstrap";
import {LevelsPanelsList} from "../LevelsPanelsList/LevelsPanelsList";
import Row from "react-bootstrap/Row";
import {faGreaterThan, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class ChapterPanelsList extends React.Component {

    chaptersList = [{"id": "0", "title": "1. Introduction", "levels": [{"id": "0", "title": '1.1. Hello World'}]},
        {"id": "1", "title": "2. Object-Oriented Programming Concepts", "levels":
                [{"id": "0", "title": '2.1. Objects'}, {"id": "1", "title": '2.2. Classes'}, {"id": "2", "title": '2.3. Inheritance'}]},
        {"id": "2", "title": "3. Annotations", "levels":
                [{"id": "0", "title": '3.1. Basics'}, {"id": "1", "title": '3.2. Predefined Annotation Types'}]},
    ];

    constructor(props) {

        super(props);
        this.state = {
            chapters: this.chaptersList,
            selectedChapter: undefined
        };

    }

    chapterPanelClicked(chapter) {
        this.setState({ selectedChapter: chapter });
        if (this.props.on_chapter_changed !== undefined)
            this.props.on_chapter_changed(chapter);
    }

    render() {

        let chapters = this.state.chapters;

        let chapterPanels = [];

        for (let chapterIdx in chapters) {

            let chapter = chapters[chapterIdx];
            if (this.state.selectedChapter !== undefined && chapter.id === this.state.selectedChapter.id) {
                chapterPanels.push(
                    <Card className="shadow p-3 mb-3 rounded text-center" style={{backgroundColor: "#4b86e0", border: "none"}} onClick={this.chapterPanelClicked.bind(this, chapter)}>
                        <Row className="align-items-center d-flex">
                            <Col className="col-9">
                                <span style={{fontSize: "0.8vw", color: "white"}}>{chapter.title}</span>
                            </Col>
                            <Col className="me-3">
                                <FontAwesomeIcon  icon={faGreaterThan} style={{color: "white"}} />
                            </Col>
                        </Row>
                    </Card>
                )
            } else {
                chapterPanels.push(
                    <Card className="shadow p-3 mb-3 rounded text-center" onClick={this.chapterPanelClicked.bind(this, chapter)}>
                       <Row className="align-items-center d-flex">
                           <Col className="col-9">
                               <span style={{fontSize: "0.8vw", color: "#1E4172"}}>{chapter.title}</span>
                           </Col>
                           <Col className="me-3">
                               <FontAwesomeIcon  icon={faGreaterThan} style={{color: "#1E4172"}} />
                           </Col>
                       </Row>

                    </Card>
                )
            }
        }

        return(
           <Col className="col-3">
               {chapterPanels}
           </Col>
        );
    }
}
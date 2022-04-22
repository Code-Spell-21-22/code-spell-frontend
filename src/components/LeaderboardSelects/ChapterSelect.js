import React from 'react';
import {Card, FormSelect} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export class ChapterSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chapters: this.props.chapters
        };
    }

    chapterUpdated(event) {
        let chapter = event.target.value;
        if (this.props.on_chapter_changed !== undefined)
            this.props.on_chapter_changed(chapter);
    }

    render() {

        if (this.props.is_disabled) {
            return (
                <Col className="col-3">
                    <Card className="shadow w-100 px-4 pt-4 pb-5" style={{opacity: "0.6"}}>
                               <span className="mb-3" style={{color: "#2e78e1", fontSize: "1.6vh", fontWeight: "bold", textTransform: "uppercase"}}>
                                   <FontAwesomeIcon  icon={faStar} style={{color: "#2e78e1"}} /> Chapter</span>
                        <FormSelect disabled={true} onChange={this.chapterUpdated.bind(this)}>
                            <option>---</option>
                        </FormSelect>
                    </Card>
                </Col>
            );
        }

        let chapters = this.state.chapters;

        let chaptersSelect = [];
        chaptersSelect = chapters.map(option => <option key={option.id} value={option.id}>
            {option.title}
        </option>);

        return (
            <Col className="col-3">
                <Card className="shadow w-100 px-4 pt-4 pb-5">
                               <span className="mb-3" style={{color: "#2e78e1", fontSize: "1.6vh", fontWeight: "bold", textTransform: "uppercase"}}>
                                   <FontAwesomeIcon  icon={faStar} style={{color: "#2e78e1"}} /> Chapter</span>
                    <FormSelect onChange={this.chapterUpdated.bind(this)}>
                        <option>---</option>
                        {chaptersSelect}
                    </FormSelect>
                </Card>
            </Col>
        );
    }
}

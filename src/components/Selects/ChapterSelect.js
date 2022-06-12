import React from "react";
import {Card, FormSelect} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState} from "react";

const ChapterSelect = (props) => {

    const [chapters, setChapters] = useState(props.chapters);

    useEffect(() => {
        setChapters(props.chapters);
    }, [props.chapters]);

    const chapterUpdated = (event) => {
        let chapter = event.target.value;
        if (props.on_chapter_changed !== undefined)
            props.on_chapter_changed(chapter);
    };

    if (props.is_disabled) {
        return (
            <Col className="col-3">
                <Card className="shadow w-100 px-4 pt-4 pb-5" style={{opacity: "0.6"}}>
                               <span className="mb-3" style={{color: "#2e78e1", fontSize: "1.6vh", fontWeight: "bold", textTransform: "uppercase"}}>
                                   <FontAwesomeIcon  icon={faStar} style={{color: "#2e78e1"}} /> Chapter</span>
                    <FormSelect disabled={true} onChange={chapterUpdated.bind(this)}>
                        <option>---</option>
                    </FormSelect>
                </Card>
            </Col>
        );
    }

    let chaptersSelect = [];

    chaptersSelect = chapters.map(option => <option key={option.id} value={option.id}>
        {option.title}
    </option>);

    return (
        <Col className="col-3">
            <Card className="shadow w-100 px-4 pt-4 pb-5">
                               <span className="mb-3" style={{color: "#2e78e1", fontSize: "1.6vh", fontWeight: "bold", textTransform: "uppercase"}}>
                                   <FontAwesomeIcon  icon={faStar} style={{color: "#2e78e1"}} /> Chapter</span>
                <FormSelect onChange={chapterUpdated.bind(this)}>
                    <option>---</option>
                    {chaptersSelect}
                </FormSelect>
            </Card>
        </Col>
    );
};

export default ChapterSelect;
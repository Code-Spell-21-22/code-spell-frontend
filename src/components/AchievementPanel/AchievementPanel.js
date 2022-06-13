import React from "react";
import {useState} from 'react';
import Row from "react-bootstrap/Row";
import {Card, Image} from "react-bootstrap";

const AchievementPanel = (props) => {

    const [language] = useState(props.language);
    const [title] = useState(props.title);
    const [description] = useState(props.description);
    const [completed] = useState(props.completed);

    if (!completed) {
        return (
            <Card className="shadow p-4 mb-3 rounded h-100" style={{opacity: "0.6"}}>
                <Row className="justify-content-center d-flex">
                    <Image src="/placeholder.png" style={{width: "100%"}}/>
                </Row>
                <span className="mt-4" style={{fontSize: "0.7vw"}}>{language}</span>
                <span className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold"}}>{title}</span>
                <span style={{fontSize: "0.8vw"}}>{description}</span>
            </Card>
        );
    }
    return (
        <Card className="shadow p-4 mb-3 rounded h-100">
            <Row className="justify-content-center d-flex">
                <Image src="/python.png" style={{width: "100%"}}/>
            </Row>
            <span className="mt-4" style={{fontSize: "0.7vw"}}>{language}</span>
            <span className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold"}}>{title}</span>
            <span style={{fontSize: "0.8vw"}}>{description}</span>
        </Card>
    );
};

export default AchievementPanel;
import React from "react";
import Row from "react-bootstrap/Row";
import {Card, Image} from "react-bootstrap";

import {useEffect, useState} from "react";

const LanguagePanel = (props) => {

    const [active, setActive] = useState(props.active);
    const [category, setCategory] = useState(props.category);
    const [title, setTitle] = useState(props.title);

    useEffect(() => {
        setActive(props.active);
    }, [props.active]);

    const languagePanelClicked = () => {
        if (props.on_language_changed !== undefined) {
            props.on_language_changed(title);
        }
    };

    if (props.disabled && props.disabled === true) {
        return (
            <Card className="btn shadow p-4 mb-3 text-center disabled" style={{opacity: "0.6", borderRadius: "10px"}}>
                <Row className="justify-content-center d-flex">
                    <Image src="/placeholder.png" style={{width: "100%"}}/>
                </Row>
                <span className="mt-4" style={{fontSize: "0.7vw"}}>{category}</span>
                <span className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold"}}>{title}</span>
            </Card>
        );
    }

    if (active !== undefined && active === title) {
        return (
            <Card className="btn shadow p-4 mb-3 text-center" style={{borderRadius: "10px"}}>
                <Row className="justify-content-center d-flex">
                    <Image src="/python.png" style={{width: "100%"}}/>
                </Row>
                <span className="mt-4" style={{fontSize: "0.7vw"}}>{category}</span>
                <span className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold"}}>{title}</span>
            </Card>
        );
    }

    return (
        <Card className="btn shadow p-4 mb-3 text-center" style={{opacity: "0.6", borderRadius: "10px"}} onClick={languagePanelClicked.bind(this)}>
            <Row className="justify-content-center d-flex">
                <Image src="/placeholder.png" style={{width: "100%"}}/>
            </Row>
            <span className="mt-4" style={{fontSize: "0.7vw"}}>{category}</span>
            <span className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold"}}>{title}</span>
        </Card>
    );
};

export default LanguagePanel;
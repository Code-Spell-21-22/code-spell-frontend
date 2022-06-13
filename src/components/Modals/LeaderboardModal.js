import React from "react";
import Row from "react-bootstrap/Row";
import {Container} from "react-bootstrap";
import ScoresPanelsList from "../ScoresPanelsList/ScoresPanelsList";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchLanguage, selectLanguage} from "../../features/settings/settingsSlice";

const LeaderboardModal = (props) => {

    const language = useSelector(selectLanguage);
    const [level, setLevel] = useState(props.level);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLanguage());
    }, [dispatch]);

    useEffect(() => {
        setLevel(props.level);
    }, [props.level]);

    return (
        <Container>
            <Row className="mx-1 mt-4">
                <span style={{fontSize: "0.7vw"}}>{level.title} - {language}</span>
                <h1 className="mt-2" style={{fontSize: "1.7vw"}}>Level {level.number}</h1>
            </Row>
            <ScoresPanelsList level={level}/>
        </Container>

    );
}

export default LeaderboardModal;
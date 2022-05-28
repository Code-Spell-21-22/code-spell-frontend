import Row from "react-bootstrap/Row";
import {Container} from "react-bootstrap";
import ScoresPanelsList from "../ScoresPanelsList/ScoresPanelsList";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchLevels, selectLevels} from "../../features/levels/levelsSlice";
import {selectChapters} from "../../features/chapters/chaptersSlice";
import {useEffect, useState} from "react";
import {fetchDifficulty, fetchLanguage, selectLanguage} from "../../features/settings/settingsSlice";

const LeaderboardModal = (props) => {

    const { levelNumber } = useParams();

    const language = useSelector(selectLanguage);
    const chapters = useSelector(selectChapters);
    const levels = useSelector(selectLevels);

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
                <h1 style={{fontSize: "1.7vw"}}>Level {level.number}</h1>
            </Row>
            <ScoresPanelsList level={level}/>
        </Container>

    );
}

export default LeaderboardModal;
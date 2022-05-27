import {Card, Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {faGreaterThan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {fetchChapters, selectChapters} from "../../features/chapters/chaptersSlice";
import {useEffect, useState} from "react";
import {fetchDifficulty, fetchLanguage, selectDifficulty, selectLanguage} from "../../features/settings/settingsSlice";

const ChapterPanelsList = (props) => {

    const chapters = useSelector(selectChapters);
    const language = useSelector(selectLanguage);
    const difficulty = useSelector(selectDifficulty);

    const [selectedChapter, setSelectedChapter] = useState(undefined);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLanguage);
        dispatch(fetchDifficulty);
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchChapters(language, difficulty));
    }, [language, difficulty]);

    const chapterPanelClicked = (chapter) => {
        setSelectedChapter(chapter);
        if (props.on_chapter_changed !== undefined)
            props.on_chapter_changed(chapter);
    }

    const chapterPanels = [];
    for (const chapterIdx in chapters) {

        const chapter = chapters[chapterIdx];
        if (selectedChapter !== undefined && chapter.id === selectedChapter.id) {
            chapterPanels.push(
                <Card key={chapter.id} className="shadow p-3 mb-3 rounded text-center" style={{backgroundColor: "#4b86e0", border: "none"}} onClick={chapterPanelClicked.bind(this, chapter)}>
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
                <Card key={chapter.id} className="shadow p-3 mb-3 rounded text-center" onClick={chapterPanelClicked.bind(this, chapter)}>
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

    return (
        <Col className="col-3">
            {chapterPanels}
        </Col>
    );
};

export default ChapterPanelsList;
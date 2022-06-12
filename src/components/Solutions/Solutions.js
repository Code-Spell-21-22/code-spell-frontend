import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Navbar from "../Navbar/Navbar";
import SolutionsPanelsList from "../SolutionsPanelsList/SolutionsPanelsList";
import {getLevels} from "../../utils/api/apihandler";
import ChapterSelect from "../Selects/ChapterSelect";
import LevelSelect from "../Selects/LevelSelect";
import {useDispatch, useSelector} from "react-redux";
import {fetchDifficulty, fetchLanguage, selectDifficulty, selectLanguage} from "../../features/settings/settingsSlice";
import {fetchChapters, selectChapters} from "../../features/chapters/chaptersSlice";
import {fetchLevels, selectLevels} from "../../features/levels/levelsSlice";
import {fetchUserDetails, fetchUserProgress, selectProgress} from "../../features/userDetails/userDetailsSlice";



const Solutions = () => {

    const language = useSelector(selectLanguage);
    const difficulty = useSelector(selectDifficulty);

    const chapters = useSelector(selectChapters);
    const levels = useSelector(selectLevels);
    const progress = useSelector(selectProgress);

    const [chapter, setChapter] = useState(undefined);
    const [level, setLevel] = useState(undefined);
    const [filteredLevels, setFilteredLevels] = useState([]);

    const [currentLevel, setCurrentLevel] = useState(undefined);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLanguage());
        dispatch(fetchDifficulty());
        dispatch(fetchUserDetails());
    }, [dispatch]);

    useEffect(() => {
        if (language && difficulty) {
            dispatch(fetchUserProgress(language, difficulty));
        }
    }, [language, difficulty]);

    useEffect(() => {
        dispatch(fetchChapters(language, difficulty));
        dispatch(fetchLevels(language, difficulty));
    }, [language, difficulty]);

    useEffect(() => {
        if (chapter && levels) {
            setFilteredLevels(levels.filter(l => l.chapterId === chapter.id));
        }
    }, [chapter, levels]);

    useEffect(() => {

        if (progress.Completed !== undefined && levels) {
            if (progress.Completed !== progress.Total)
                setCurrentLevel(levels[progress.Completed]);
            else
                setCurrentLevel(levels[progress.Completed - 1]);
        }
    }, [progress, levels]);

    const chapterChangedHandler = (chapter_id) => {
        let selectedChapter = chapters.filter(c => c.id === chapter_id)[0];
        setChapter(selectedChapter);
        setLevel(undefined);
    }

    const levelChangedHandler = (level_id) => {
        let selectedLevel = levels.filter(l => l.id === level_id)[0];
        setLevel(selectedLevel);
    }

    return (
        <Container>
            <Container className="container-fluid">
                <Row className="justify-content-center d-flex">
                    <Navbar title={"Solutions"} />
                </Row>
                <Row className="mx-5 mt-4 mb-5">
                    <ChapterSelect chapters={chapters} on_chapter_changed={chapterChangedHandler}/>
                    <LevelSelect levels={filteredLevels} on_level_changed={levelChangedHandler}/>
                </Row>

                <SolutionsPanelsList level={level} completed={currentLevel}/>

            </Container>
        </Container>
    );
};

export default Solutions;
import React from "react";
import Row from "react-bootstrap/Row";
import {Container} from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import ScoresPanelsList from "../ScoresPanelsList/ScoresPanelsList";
import ChapterSelect from "../Selects/ChapterSelect";
import LevelSelect from "../Selects/LevelSelect";
import CategorySelect from "../Selects/CategorySelect";
import DifficultySelect from "../Selects/DifficultySelect";
import {useDispatch, useSelector} from "react-redux";
import {fetchChapters, selectChapters} from "../../features/chapters/chaptersSlice";
import {useEffect, useState} from "react";
import {fetchDifficulty, fetchLanguage, selectDifficulty, selectLanguage} from "../../features/settings/settingsSlice";
import {fetchLevels, selectLevels} from "../../features/levels/levelsSlice";

const Leaderboards = () => {

    const language = useSelector(selectLanguage);
    const gameDifficulty = useSelector(selectDifficulty);
    const chapters = useSelector(selectChapters);
    const levels = useSelector(selectLevels);

    const [category, setCategory] = useState(undefined);
    const [chapter, setChapter] = useState(undefined);
    const [level, setLevel] = useState(undefined);
    const [difficulty, setDifficulty] = useState(undefined);
    const [filteredLevels, setFilteredLevels] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(fetchLanguage());
       dispatch(fetchDifficulty());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchChapters(language, gameDifficulty));
        dispatch(fetchLevels(language, gameDifficulty));
    }, [language, gameDifficulty]);

    useEffect(() => {
        if (chapter && levels) {
            setFilteredLevels(levels.filter(l => l.chapterId === chapter.id));
        }
    }, [chapter, levels]);

    const categoryChangedHandler = (category) => {
        setCategory(category);
        if (category === "Overall") {
            setChapter(undefined);
            setLevel(undefined);
        }
    }

    const chapterChangedHandler = (chapter_id) => {
        let selectedChapter = chapters.filter(c => c.id === chapter_id)[0];
        setChapter(selectedChapter);
        setLevel(undefined);
    }

    const levelChangedHandler = (level_id) => {
        let selectedLevel = levels.filter(l => l.id === level_id)[0];
        setLevel(selectedLevel);
    }

    const difficultyChangedHandler = (difficulty) => {
        setDifficulty(difficulty);
    }

    return (
        <Container>
            <Container className="container-fluid">
                <Row className="justify-content-center d-flex">
                    <Navbar title={"Leaderboards"} />
                </Row>
                <Row className="mx-5 mt-4 mb-5">
                    <CategorySelect on_category_changed={categoryChangedHandler.bind(this)}/>
                    <ChapterSelect chapters={chapters} on_chapter_changed={chapterChangedHandler} is_disabled={category !== "Chapter" && category !== "Level"}/>
                    <LevelSelect levels={filteredLevels} on_level_changed={levelChangedHandler} is_disabled={category !== "Level"}/>
                    <DifficultySelect on_difficulty_changed={difficultyChangedHandler} />
                </Row>
                <Container className="px-5">
                    {category !== undefined &&
                        <ScoresPanelsList chapter={chapter} level={level} difficulty={difficulty}/>
                    }
                </Container>
            </Container>
        </Container>
    );
};

export default Leaderboards;
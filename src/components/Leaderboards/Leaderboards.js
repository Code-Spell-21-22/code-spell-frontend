import Row from "react-bootstrap/Row";
import {Container} from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import ScoresPanelsList from "../ScoresPanelsList/ScoresPanelsList";
import ChapterSelect from "../LeaderboardSelects/ChapterSelect";
import LevelSelect from "../LeaderboardSelects/LevelSelect";
import CategorySelect from "../LeaderboardSelects/CategorySelect";
import DifficultySelect from "../LeaderboardSelects/DifficultySelect";
import {useSelector} from "react-redux";
import {selectChapters} from "../../features/chapters/chaptersSlice";
import {useState} from "react";

const Leaderboards = () => {

    const chapters = useSelector(selectChapters);
    const [category, setCategory] = useState(undefined);
    const [chapter, setChapter] = useState(undefined);
    const [level, setLevel] = useState(undefined);
    const [difficulty, setDifficulty] = useState(undefined);

    let levels = [];
    if (chapter !== undefined) {
        levels = chapter.levels;
    }

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
        let selectedLevel = chapter.levels.filter(l => l.id === level_id)[0];
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
                    <ChapterSelect chapters={chapters} on_chapter_changed={chapterChangedHandler.bind(this)} is_disabled={category !== "Chapter" && category !== "Level"}/>
                    <LevelSelect levels={levels} on_level_changed={levelChangedHandler.bind(this)} is_disabled={category !== "Level"}/>
                    <DifficultySelect on_difficulty_changed={difficultyChangedHandler.bind(this)} />
                </Row>
                <Container className="px-5">
                    {category !== undefined &&
                        <ScoresPanelsList/>
                    }
                </Container>
            </Container>
        </Container>
    );
};

export default Leaderboards;
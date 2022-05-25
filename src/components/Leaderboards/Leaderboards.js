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

const Leaderboards = () => {

    /*
      const chaptersList = [{"id": "0", "title": "1. Introduction", "levels": [{"id": "0", "nLv": 1.1, "title": 'Hello World'}]},
          {"id": "1", "title": "2. Object-Oriented Programming Concepts", "levels":
                  [{"id": "1", "nLv": 2.1, "title": 'Objects'}, {"id": "2", "nLv": 2.2, "title": 'Classes'}, {"id": "3", "nLv": 2.3, "title": 'Inheritance'},
                      {"id": "4", "nLv": 2.4, "title": 'More on Classes'}, {"id": "5", "nLv": 2.5, "title": 'Nested Classes'}]},
          {"id": "2", "title": "3. Annotations", "levels":
                  [{"id": "6", "nLv": 3.1, "title": 'Basics'}, {"id": "7", "nLv": 3.2, "title": 'Predefined Annotation Types'}]},
          {"id": "3", "title": "4. Interfaces and Inheritance", "levels":
                  [{"id": "8", "nLv": 4.1, "title": 'Defining an Interface'}, {"id": "9", "nLv": 4.2, "title": 'Implementing an Interface'}, {"id": "10", "nLv": 4.3, "title": 'Using an Interface as a Type'}]},
          {"id": "4", "title": "5. Numbers and Strings", "levels": []},

      ];
       */

    const chapters = useSelector(selectChapters);
    const [category, setCategory] = React.useState(undefined);
    const [chapter, setChapter] = React.useState(undefined);
    const [level, setLevel] = React.useState(undefined);
    const [difficulty, setDifficulty] = React.useState(undefined);

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
        let selectedChapter = chaptersList.filter(c => c.id === chapter_id)[0];
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
import React from 'react';
import Row from "react-bootstrap/Row";
import {Container} from "react-bootstrap";
import {Navbar} from "../Navbar/Navbar";
import {ScoresPanelsList} from "../ScoresPanelsList/ScoresPanelsList";
import {ChapterSelect} from "../LeaderboardSelects/ChapterSelect";
import {LevelSelect} from "../LeaderboardSelects/LevelSelect";
import {CategorySelect} from "../LeaderboardSelects/CategorySelect";
import {DifficultySelect} from "../LeaderboardSelects/DifficultySelect";

export class Leaderboards extends React.Component {

    chaptersList = [{"id": "0", "title": "1. Introduction", "levels": [{"id": "0", "nLv": 1.1, "title": 'Hello World'}]},
        {"id": "1", "title": "2. Object-Oriented Programming Concepts", "levels":
                [{"id": "1", "nLv": 2.1, "title": 'Objects'}, {"id": "2", "nLv": 2.2, "title": 'Classes'}, {"id": "3", "nLv": 2.3, "title": 'Inheritance'},
                    {"id": "4", "nLv": 2.4, "title": 'More on Classes'}, {"id": "5", "nLv": 2.5, "title": 'Nested Classes'}]},
        {"id": "2", "title": "3. Annotations", "levels":
                [{"id": "6", "nLv": 3.1, "title": 'Basics'}, {"id": "7", "nLv": 3.2, "title": 'Predefined Annotation Types'}]},
        {"id": "3", "title": "4. Interfaces and Inheritance", "levels":
                [{"id": "8", "nLv": 4.1, "title": 'Defining an Interface'}, {"id": "9", "nLv": 4.2, "title": 'Implementing an Interface'}, {"id": "10", "nLv": 4.3, "title": 'Using an Interface as a Type'}]},
        {"id": "4", "title": "5. Numbers and Strings", "levels": []},

    ];

    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: undefined,
            selectedChapter: undefined,
            selectedLevel: undefined,
            selectedDifficulty: undefined
        };
    }

    categoryChangedHandler(category) {
        if (category === "Overall") {
            this.setState({
                selectedCategory: category,
                selectedChapter: undefined,
                selectedLevel: undefined
            });

        } else {
            this.setState({
                selectedCategory: category,
            });
        }
    }

    chapterChangedHandler(chapter_id) {
        let chapter = this.chaptersList.filter(chapter => chapter.id === chapter_id)[0];
        this.setState({
            selectedChapter: chapter,
            selectedLevel: undefined
        });
    }

    levelChangedHandler(level_id) {
        let level = this.state.selectedChapter.levels.filter(level => level.id === level_id)[0];
        this.setState({
            selectedLevel: level,
        });
    }

    difficultyChangedHandler(difficulty) {
        this.setState({
            selectedDifficulty: difficulty
        });
    }

    render() {

        let category = this.state.selectedCategory;

        let levels = [];
        if (this.state.selectedChapter !== undefined) {
            levels = this.state.selectedChapter.levels;
        }

        return (
            <Container>
                <Container className="container-fluid">
                    <Row className="justify-content-center d-flex">
                        <Navbar title={"Leaderboards"} />
                    </Row>
                    <Row className="mx-5 mt-4 mb-5">
                        <CategorySelect on_category_changed={this.categoryChangedHandler.bind(this)}/>
                        <ChapterSelect chapters={this.chaptersList} on_chapter_changed={this.chapterChangedHandler.bind(this)} is_disabled={category !== "Chapter" && category !== "Level"}/>
                        <LevelSelect levels={levels} on_level_changed={this.levelChangedHandler.bind(this)} is_disabled={category !== "Level"}/>
                        <DifficultySelect on_difficulty_changed={this.difficultyChangedHandler.bind(this)} />
                    </Row>
                    <Container className="px-5">
                        {this.state.selectedCategory !== undefined &&
                            <ScoresPanelsList/>
                        }
                    </Container>
                </Container>
            </Container>
        );
    }
}
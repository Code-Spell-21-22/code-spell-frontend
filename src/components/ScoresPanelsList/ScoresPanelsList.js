import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import {Card, Col, Container} from "react-bootstrap";

const ScoresPanelsList = (props) => {

    const [chapter, setChapter] = useState(props.chapter);
    const [level, setLevel] = useState(props.level);
    const [difficulty, setDifficulty] = useState(props.difficulty);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        setChapter(props.chapter);
        setLevel(props.level);
        setDifficulty(props.difficulty);
    }, [props]);

    useEffect(() => {
        if (level !== undefined) {
            // TODO: API call to get scores
            const levelScores = [{"id": "0", "email": "user1@gmail.com", "username": "USER_1", "score": 100},
                {"id": "1", "email": "user2@gmail.com", "username": "USER_2", "score": 90},
                {"id": "2", "email": "user3@gmail.com", "username": "USER_3", "score": 150},
                {"id": "3", "email": "userXX@gmail.com", "username": "USER_XX", "score": 200},
                {"id": "4", "email": "useryy@gmail.com",  "username": "USER_YY", "score": 190}];
            setScores(levelScores);
        } else if (chapter !== undefined) {
            // TODO: API call to get scores
            const chapterScores = [{"id": "0", "email": "user1@gmail.com", "username": "USER_1", "score": 2000},
                {"id": "1", "email": "user2@gmail.com", "username": "USER_2", "score": 1300},
                {"id": "2", "email": "user3@gmail.com", "username": "USER_3", "score": 900},
                {"id": "3", "email": "userXX@gmail.com", "username": "USER_XX", "score": 2100},
                {"id": "4", "email": "useryy@gmail.com",  "username": "USER_YY", "score": 1800}];
            setScores(chapterScores);
        }
    }, [chapter, level]);


    let userPanels = [];

    let users = scores.sort((function (u1, u2){
        return u2.score - u1.score;
    }))

    for (let userIdx in users) {
        let user = users[userIdx];

        let content = <Row className="h-100 px-3">
            <Col className="col-2 align-items-center d-flex">
                <p className="mb-0" style={{fontSize: "0.8vw"}}>{parseInt(userIdx) + 1}</p>
            </Col>
            <Col className="col-8 align-items-center d-flex">
                <p className="mb-0" style={{fontSize: "0.8vw"}}>{user.username}</p>
            </Col>
            <Col className="col-2 align-items-center d-flex">
                <p className="mb-0" style={{fontSize: "0.9vw"}}>{user.score}</p>
            </Col>
        </Row>;

        if (userIdx === "0") {
            userPanels.push(
                <Card key={user.id} className="w-100 text-white mb-3" style={{height: "6vh", minHeight:"50px", backgroundColor: "#1d4f8f"}}>
                    {content}
                </Card>);
        } else {
            userPanels.push(
                <Card key={user.id} className="w-100 bg-white mb-3" style={{height: "6vh", minHeight: "50px"}}>
                    {content}
                </Card>
            )
        }
    }

    return (
        <Container>
            <Row className="mx-4 mt-4">
                {userPanels}
            </Row>
            <Row className="mx-4 mt-5 mb-4">
                <Card className="w-100 bg-white mb-3" style={{height: "6vh", minHeight:"50px"}}>
                    <Row className="h-100 px-3">
                        <Col className="col-2 align-items-center d-flex">
                            <p className="mb-0" style={{fontSize: "0.8vw"}}>900</p>
                        </Col>
                        <Col className="col-8 align-items-center d-flex">
                            <p className="mb-0" style={{fontSize: "0.8vw"}}>CURRENT_USER</p>
                        </Col>
                        <Col className="col-2 align-items-center d-flex">
                            <p className="mb-0" style={{fontSize: "0.9vw"}}>---</p>
                        </Col>
                    </Row>
                </Card>
            </Row>
        </Container>
    );
};

export default ScoresPanelsList;

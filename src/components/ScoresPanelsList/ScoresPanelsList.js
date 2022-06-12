import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import {Card, Col, Container} from "react-bootstrap";
import {getLevelLeaderboard} from "../../utils/api/apihandler";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserDetails, selectUsername} from "../../features/userDetails/userDetailsSlice";

const ScoresPanelsList = (props) => {

    const username = useSelector(selectUsername);

    const [level, setLevel] = useState(props.level);
    const [scores, setScores] = useState([]);

    const [userScore, setUserScore] = useState("---");
    const [userRank, setUserRank] = useState("---");

    const dispatch = useDispatch();

    useEffect(() => {
        setLevel(props.level);
        dispatch(fetchUserDetails());
    }, [props]);

    useEffect(() => {
        if (level) {
            getLevelLeaderboard(level.id).then(res => {
                setScores(res.data);
            });
        }
    }, [level]);

    useEffect(() => {
        if (scores) {

            for (let i = 0; i < scores.length; i++) {
                if (scores[i].username === username) {
                    setUserScore(scores[i].points);
                    setUserRank(i + 1);
                }
            }
        }
    }, [scores]);

    let userPanels = [];
    let users = scores.sort((function (u1, u2){
        return parseInt(u2.score) - parseInt(u1.score);
    }))

    for (let userIdx in users) {

        if (parseInt(userIdx) >= 10) {
            break;
        }

        let user = users[userIdx];

        let content = <Row className="h-100 px-3">
            <Col className="col-3 align-items-center d-flex">
                <p className="mb-0" style={{fontSize: "0.8vw"}}>{parseInt(userIdx) + 1}</p>
            </Col>
            <Col className="col-6 align-items-center d-flex">
                <p className="mb-0" style={{fontSize: "0.8vw"}}>{user.username}</p>
            </Col>
            <Col className="col-3 align-items-center d-flex">
                <p className="mb-0" style={{fontSize: "0.9vw"}}>{user.points}</p>
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
            <Row className="mx-1 mt-4">
                {userPanels}
            </Row>
            <Row className="mx-1 mt-5 mb-4">
                <Card className="w-100 bg-white mb-3" style={{height: "6vh", minHeight:"50px"}}>
                    <Row className="h-100 px-3">
                        <Col className="col-3 align-items-center d-flex">
                            <p className="mb-0" style={{fontSize: "0.8vw"}}>{userRank}</p>
                        </Col>
                        <Col className="col-6 align-items-center d-flex">
                            <p className="mb-0" style={{fontSize: "0.8vw"}}>{username}</p>
                        </Col>
                        <Col className="col-3 align-items-center d-flex">
                            <p className="mb-0" style={{fontSize: "0.9vw"}}>{userScore}</p>
                        </Col>
                    </Row>
                </Card>
            </Row>
        </Container>
    );
};

export default ScoresPanelsList;

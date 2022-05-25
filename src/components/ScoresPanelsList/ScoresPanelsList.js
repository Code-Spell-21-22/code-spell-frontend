import React from 'react';
import Row from "react-bootstrap/Row";
import {Card, Col, Container} from "react-bootstrap";

const ScoresPanelsList = () => {

    const allUsers = [{"id": "0", "username": "USER_1", "score": 100},
        {"id": "1", "username": "USER_2", "score": 90},
        {"id": "2", "username": "USER_3", "score": 150},
        {"id": "3", "username": "USER_XX", "score": 200},
        {"id": "4", "username": "USER_YY", "score": 190}]

    let userPanels = [];

    let users = allUsers.sort((function (u1, u2){
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
                <Card className="w-100 text-white mb-3" style={{height: "6vh", minHeight:"50px", backgroundColor: "#1d4f8f"}}>
                    {content}
                </Card>);
        } else {
            userPanels.push(
                <Card className="w-100 bg-white mb-3" style={{height: "6vh", minHeight: "50px"}}>
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

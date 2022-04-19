import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faStar, faStarHalfStroke, faStarOfLife} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import {Button, Card, Col, Container} from "react-bootstrap";

export class LeaderboardModal extends React.Component {

    users = [{"id": "0", "username": "USER_1", "score": 100},
        {"id": "1", "username": "USER_2", "score": 90},
        {"id": "2", "username": "USER_3", "score": 150},
        {"id": "3", "username": "USER_XX", "score": 200},
        {"id": "4", "username": "USER_YY", "score": 190}]

    constructor(props) {
        super(props);
    }

    render() {

        let userPanels = [];

        let users = this.users.sort((function (u1, u2){
            return u2.score - u1.score;
        }))

        for (let userIdx in users) {
            let user = users[userIdx];
            userPanels.push(
                <Card className="w-100 bg-white mb-3" style={{borderColor: "#3f73c2", height: "6vh", minHeight:"50px"}}>
                   <Row className="h-100 px-3">
                       <Col className="col-2 align-items-center d-flex">
                           <p className="mb-0" style={{fontSize: "0.8vw"}}>{++userIdx}</p>
                       </Col>
                       <Col className="col-8 align-items-center d-flex">
                           <p className="mb-0" style={{fontSize: "0.8vw"}}>{user.username}</p>
                       </Col>
                       <Col className="col-2 align-items-center d-flex">
                           <p className="mb-0" style={{fontSize: "0.9vw"}}>{user.score}</p>
                       </Col>
                   </Row>
                </Card>
            )
        }

        return (
            <Container>
                <Row className="mx-1 mt-4">
                    <span style={{fontSize: "0.7vw"}}>Hello World - JAVA</span>
                    <h1 style={{fontSize: "1.7vw"}}>Level 2.1</h1>
                </Row>
                <Row className="mx-3 mt-4">
                    {userPanels}
                </Row>
                <Row className="mx-3 mt-5 mb-4">
                    <Card className="w-100 bg-white mb-3" style={{borderColor: "#3f73c2", height: "6vh", minHeight:"50px"}}>
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
    }
}

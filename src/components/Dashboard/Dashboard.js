import React from 'react';
import {SmallPanel} from "../SmallPanel/SmallPanel";
import Row from "react-bootstrap/Row";
import {Button, Card, Col, Container} from "react-bootstrap";
import {faEdit, faGear, faPlay, faPlug, faPowerOff, faRocket, faTrophy} from "@fortawesome/free-solid-svg-icons";
import {SquarePanel} from "../SquarePanel/SquarePanel";
import {UserPanel} from "../UserPanel/UserPanel";

export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container className="container-fluid">
                <Row className="my-5 justify-content-center d-flex">
                    <Col className="col-2 mx-2">
                        <SquarePanel icon={faPlay}
                                     title={'PLAY'}
                                     link="/levels"
                        />
                    </Col>
                    <Col className="col-2 mx-2">
                        <SquarePanel icon={faEdit}
                                     title={'CREATE'}

                        />
                    </Col>
                    <Col className="col-2 mx-2">
                        <SquarePanel icon={faTrophy}
                                     title={'LEADERBOARDS'}
                                     link="/leaderboards"
                        />
                    </Col>
                    <Col className="col-2 mx-2">
                        <SquarePanel icon={faRocket}
                                     title={'ACHIEVEMENTS'}
                                     link="/achievements"
                        />
                    </Col>
                    <Col className="col-2 mx-2">
                        <SquarePanel icon={faGear}
                                     title={'SETTINGS'}
                                     link="/settings"
                        />
                    </Col>
                </Row>
                <Row></Row>
                <Row className="mt-5 justify-content-center">
                    <Col className="col-2 mt-4 mx-2">
                        <Button className="disabled w-100 mb-3">
                            <span style={{fontSize: "0.9vw"}}>JAVA</span>
                        </Button>
                        <Button className="disabled w-100">
                            <span style={{fontSize: "0.9vw"}}>EXPERIENCED</span>
                        </Button>
                    </Col>

                    <Col className="col-8 ms-5 me-2">
                        <UserPanel />
                    </Col>
                </Row>
            </Container>
        );
    }
}
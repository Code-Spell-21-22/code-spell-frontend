import Row from "react-bootstrap/Row";
import {Col, Container} from "react-bootstrap";
import {
    faEdit,
    faGear,
    faPlay,
    faRocket,
    faTrophy
} from "@fortawesome/free-solid-svg-icons";
import SquarePanel from "../SquarePanel/SquarePanel";
import UserPanel from "../UserPanel/UserPanel";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {

    return (
        <Container>
            <Container className="container-fluid">
                <Row className="justify-content-center d-flex">
                    <Navbar title={"Dashboard"} />
                </Row>
                <Row className="my-4 justify-content-center d-flex">
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
                <Row className="justify-content-center d-flex" style={{marginTop: "15vh"}}>
                    <Col className="col-8 ms-5 me-2">
                        <UserPanel/>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default Dashboard;
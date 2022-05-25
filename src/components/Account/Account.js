import {Button, Card, Col, Container, Form, ProgressBar} from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import UserPanel from "../UserPanel/UserPanel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faEdit, faStar} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";

const Account = () => {
    return (
        <Container>
            <Container className="container-fluid">
                <Row className="justify-content-center d-flex">
                    <Navbar title={"Account"} />
                </Row>
                <Row className="my-4 justify-content-center d-flex">
                    <Col className="col-7 ms-5 me-5">
                        <Row>
                            <UserPanel/>
                        </Row>
                        <Row>
                            <Card className="shadow p-4 mb-3 rounded" style={{border: "none", backgroundColor: "rgb(256, 256, 256, 0.8)"}}>
                                <Row className="justify-content-start d-flex m-3">
                                    <p className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold", color: "#1E4172"}}>
                                        <FontAwesomeIcon icon={faStar}/> Username
                                    </p>
                                    <Form className="mb-5">
                                        <Form.Group className="shadow" controlId="formBasicUsername">
                                            <Form.Control style={{height: "5vh", minHeight: "40px", border: "none"}} type="username" placeholder="Username" />
                                        </Form.Group>
                                        <Button className="mt-4 w-50 text-white" style={{backgroundColor: "#1e5ebb", border: "none", height: "6vh"}}>
                                            <span style={{fontSize: "0.8vw"}}>CHANGE USERNAME</span> <FontAwesomeIcon  icon={faEdit} style={{color: "white"}} />
                                        </Button>
                                    </Form>
                                    <p className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold", color: "#1E4172"}}>
                                        <FontAwesomeIcon icon={faStar}/> Password
                                    </p>
                                    <Form className="mb-3">
                                        <Form.Group className="shadow" controlId="formBasicPassword">
                                            <Form.Control style={{height: "5vh", minHeight: "40px"}} type="password" placeholder="Password" />
                                        </Form.Group>
                                        <Button className="mt-4 w-50 text-white" style={{backgroundColor: "#1e5ebb", border: "none", height: "6vh"}}>
                                            <span style={{fontSize: "0.8vw"}}>CHANGE PASSWORD</span> <FontAwesomeIcon  icon={faEdit} style={{color: "white"}} />
                                        </Button>
                                    </Form>
                                </Row>
                            </Card>
                        </Row>
                    </Col>
                    <Col>
                        <Card className="shadow p-3 mb-3 rounded" style={{border: "none"}}>
                            <Row className="justify-content-start d-flex m-3">
                                <Card className="shadow w-100"
                                      style={{border: "none", height: "6vh", minHeight: "50px", backgroundColor: "rgba(39,109,210,0.53)"}}>
                                    <Col className="align-items-center justify-content-center align-items-center d-flex">
                                        <span style={{color: "#1E4172", textTransform: "uppercase"}}>Progress</span>
                                    </Col>
                                </Card>
                                <Row className="mb-5">
                                    <p className="mb-0 mt-5" style={{fontSize: "0.9vw", fontWeight: "bold", color: "#1E4172"}}>
                                        <FontAwesomeIcon icon={faCircleCheck}/> Python
                                    </p>
                                    <p className="text-end" style={{fontSize: "0.8vw"}}>80%</p>
                                    <ProgressBar animated now={80} />
                                    <p className="mb-0 mt-5" style={{fontSize: "0.9vw", fontWeight: "bold", color: "#1E4172"}}>
                                        <FontAwesomeIcon icon={faCircleCheck}/> Java
                                    </p>
                                    <p className="text-end" style={{fontSize: "0.8vw"}}>60%</p>
                                    <ProgressBar animated now={60} />
                                    <p className="mb-0 mt-5" style={{fontSize: "0.9vw", fontWeight: "bold", color: "#1E4172"}}>
                                        <FontAwesomeIcon icon={faCircleCheck}/> Javascript
                                    </p>
                                    <p className="text-end" style={{fontSize: "0.8vw"}}>90%</p>
                                    <ProgressBar animated now={90} />
                                    <p className="mb-0 mt-5" style={{fontSize: "0.9vw", fontWeight: "bold", color: "#1E4172"}}>
                                        <FontAwesomeIcon icon={faCircleCheck}/> C
                                    </p>
                                    <p className="text-end" style={{fontSize: "0.8vw"}}>10%</p>
                                    <ProgressBar animated now={10} />
                                </Row>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Account;
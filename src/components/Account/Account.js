import React, {useState} from "react";
import {Button, Card, Col, Container, Form, ProgressBar} from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import UserPanel from "../UserPanel/UserPanel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faEdit, faStar} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUserDetails, fetchUserProgress, selectProgress} from "../../features/userDetails/userDetailsSlice";
import {putUserName, putUserPassword} from "../../utils/api/apihandler";
import {toast} from "react-toastify";

const Account = () => {

    const progress = useSelector(selectProgress);
    const dispatch = useDispatch();

    const [newPassword, setNewPassword] = useState("");
    const [progressPercentage, SetProgressPercentage] = useState(0);

    useEffect(() => {
        dispatch(fetchUserDetails());
        dispatch(fetchUserProgress("Java", "Novice"));
    }, [dispatch]);

    useEffect(() => {
        if (progress) {
            SetProgressPercentage(Math.round(progress.Completed / progress.Total * 100));
        }
    }, [progress]);

    const passwordStrength = (password) => {
        const testPw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/i;
        return (testPw.test(password));
    };

    const changePassword = () => {

        let password = newPassword;
        if (!password || !passwordStrength(password)) {
            toast.warning("Please provide a password, at least 8 characters, one uppercase letter, one lowercase letter and one number!");
            return;
        }

        let email = localStorage.getItem('user_email');
        putUserPassword(email, password).then(res => {
            toast.success("Password changed successfully", {icon: "🚀"});
        }).catch(err => {
            toast.error("Something went wrong");
        });
    }

    let progressBar =
        <Row>
            <p className="mb-0 mt-5" style={{fontSize: "0.9vw", fontWeight: "bold", color: "#1E4172"}}>
                <FontAwesomeIcon icon={faCircleCheck}/> Java
            </p>
            <p className="text-end" style={{fontSize: "0.8vw"}}>{progressPercentage || 0}%</p>
            <ProgressBar animated now={progressPercentage || 0}/>
        </Row>
    ;

    return (
        <Container>
            <Container className="container-fluid">
                <Row className="justify-content-center d-flex">
                    <Navbar title={"Account"}/>
                </Row>
                <Row className="my-4 justify-content-center d-flex">
                    <Col className="col-7 ms-5 me-5">
                        <Row>
                            <UserPanel/>
                        </Row>
                        <Row>
                            <Card className="shadow p-4 mb-3 rounded"
                                  style={{border: "none", backgroundColor: "rgb(256, 256, 256, 0.8)"}}>
                                <Row className="justify-content-start d-flex m-3">
                                    <p className="mb-2"
                                       style={{fontSize: "0.9vw", fontWeight: "bold", color: "#1E4172"}}>
                                        <FontAwesomeIcon icon={faStar}/> Password
                                    </p>
                                    <Form className="mb-3">
                                        <Form.Group className="shadow" controlId="formBasicPassword">
                                            <Form.Control style={{height: "5vh", minHeight: "40px"}} type="password"
                                                          placeholder="Password" onChange={(event) => setNewPassword(event.target.value)}/>
                                        </Form.Group>
                                        <Button className="mt-4 w-50 text-white"
                                                style={{backgroundColor: "#1e5ebb", border: "none", height: "6vh"}}
                                                onClick={changePassword}>
                                            <span style={{fontSize: "0.8vw"}}>CHANGE PASSWORD</span> <FontAwesomeIcon
                                            icon={faEdit} style={{color: "white"}}/>
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
                                      style={{
                                          border: "none",
                                          height: "6vh",
                                          minHeight: "50px",
                                          backgroundColor: "rgba(39,109,210,0.53)"
                                      }}>
                                    <Col
                                        className="align-items-center justify-content-center align-items-center d-flex">
                                        <span style={{color: "#1E4172", textTransform: "uppercase"}}>Progress</span>
                                    </Col>
                                </Card>
                                <Row className="mb-5 justify-content-center d-flex">
                                    {progressBar}
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
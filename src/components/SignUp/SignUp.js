import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import {Button, Form, Image} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import useAxios from "../../utils/hooks/axiosHook";

const SignUp = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { sendRequest, data, error, loaded, cancel } = useAxios(
        "http://localhost:8080/api/auth/register",
        "POST",
        {
            username: username,
            email: email,
            password: password
        }
    );

    const onInputChanged = (state, event) => {
        state(event.target.value);
    };


    const onSubmit = () => {

        console.log("Submitting");

        sendRequest();

        if (error) {
            console.log(error);
        }

        if (!error && loaded) {
            console.log("Registered");
        }

    };

    return (
        <Col className="col-7 mx-5" style={{backgroundColor: "rgb(256, 256, 256, 0.5)", height: "100vh"}}>
            <Row className="justify-content-center d-flex">
                <Image src="/CODESPELL.png" className="w-50" />
                <Row className="text-center mb-5">
                    <h3 style={{color: "#1E4172", fontWeight: "bold"}}>Sign Up</h3>
                    <span>Do you already have an account? <Link to="login">Login</Link>!</span>
                </Row>
                <Row className="w-75">
                    <Form>
                        <Form.Group className="mb-3 shadow" controlId="formBasicUsername">
                            <Form.Control style={{height: "5vh", minHeight: "40px"}} type="username" placeholder="Username" onChange={(event) => onInputChanged(setUsername, event)} />
                        </Form.Group>

                        <Form.Group className="mb-3 shadow" controlId="formBasicEmail">
                            <Form.Control style={{height: "5vh", minHeight: "40px"}} type="email" placeholder="Email" onChange={(event) => onInputChanged(setEmail, event)} />
                        </Form.Group>

                        <Form.Group className="mb-3 shadow" controlId="formBasicPassword">
                            <Form.Control style={{height: "5vh", minHeight: "40px"}} type="password" placeholder="Password" onChange={(event) => onInputChanged(setPassword, event)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="By clicking you agree to the Terms and Conditions" />
                        </Form.Group>

                        <Button className="mt-5 w-100 text-white" onClick={onSubmit} style={{backgroundColor: "#1c93ec", border: "none", height: "6vh"}}>
                            SIGN UP <FontAwesomeIcon  icon={faEdit} style={{color: "white"}} />
                        </Button>

                    </Form>
                </Row>
            </Row>
        </Col>
    );

};

export default SignUp;


import React from "react";
import {useState} from "react";
import Row from "react-bootstrap/Row";
import {Button, Form, Image} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {postLogin} from "../../utils/api/apihandler";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onInputChanged = (state, event) => {
        state(event.target.value);
    };

    const notify = (message) => toast(message);

    const onSubmit = () => {
        if (!email|| !password){
        
            notify("Please fill all fields");
            return;
        }
            
        postLogin(email, password)
        .then((response) => {
            notify(response.data.message);
            localStorage.setItem('code_spell_token', response.data.token);
            setTimeout(() => window.location.replace("/"), 2000);
        }, (error) => {
            notify(JSON.parse(error.request.response)['message']);
            console.log(error);
        });

    };

    return (
        <Col className="col-7 mx-5" style={{backgroundColor: "rgb(256, 256, 256, 0.5)", height: "100vh"}}>
            <Row className="justify-content-center d-flex">
                <Image src="/CODESPELL.png" className="w-50" />
                <Row className="text-center mb-5">
                    <h3 style={{color: "#1E4172", fontWeight: "bold"}}>Login</h3>
                    <span>You don't have an account? <Link to="/">Sign up</Link>!</span>
                </Row>
                <Row className="w-75">
                    <Form>
                        <Form.Group className="mb-3 shadow" controlId="formBasicUsername">
                            <Form.Control style={{height: "5vh", minHeight: "40px"}} type="email" placeholder="Email" onChange={(event) => onInputChanged(setEmail, event)} required/>
                        </Form.Group>

                        <Form.Group className="mb-3 shadow" controlId="formBasicPassword">
                            <Form.Control style={{height: "5vh", minHeight: "40px"}} type="password" placeholder="Password" onChange={(event) => onInputChanged(setPassword, event)} required/>
                        </Form.Group>

                        <Button className="mt-5 w-100 text-white" onClick={onSubmit} style={{backgroundColor: "#1c93ec", border: "none", height: "6vh"}}>
                            LOGIN <FontAwesomeIcon  icon={faUser} style={{color: "white"}} />
                        </Button>
                    </Form>
                </Row>
            </Row>
        </Col>
    );

};

export default Login;

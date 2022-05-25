import Row from "react-bootstrap/Row";
import {Container, FormSelect} from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import AchievementPanelsList from "../AchievementPanelsList/AchievementPanelsList";
import Col from "react-bootstrap/Col";
import {useState} from "react";

const Achievements = () => {

    const [language, setLanguage] = useState("Java");

    const updatedLanguage = (event) => {
        setLanguage(event.target.value);
    }

    return (
        <Container>
            <Container className="container-fluid">
                <Row className="justify-content-center d-flex">
                    <Navbar title={"Achievements"} />
                </Row>
                <Col className="col-3 mb-3">
                    <FormSelect onChange={updatedLanguage.bind(this)}>
                        <option key={0} value={"Java"}>Java</option>
                        <option key={1} value={"Python"}>Python</option>
                    </FormSelect>
                </Col>
                <AchievementPanelsList language={language}/>
            </Container>
        </Container>
    );
};

export default Achievements;
import Row from "react-bootstrap/Row";
import {Container} from "react-bootstrap";
import ScoresPanelsList from "../ScoresPanelsList/ScoresPanelsList";

const LeaderboardModal = () => {
    return (
        <Container>
            <Row className="mx-1 mt-4">
                <span style={{fontSize: "0.7vw"}}>Hello World - JAVA</span>
                <h1 style={{fontSize: "1.7vw"}}>Level 2.1</h1>
            </Row>
            <ScoresPanelsList />
        </Container>

    );
}

export default LeaderboardModal;
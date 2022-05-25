import {Card, Col, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCode, faRankingStar} from "@fortawesome/free-solid-svg-icons";

const UserPanel = () => {

    return(
        <Card className="shadow p-3 mb-5 bg-white rounded">
            <Row className="justify-content-start d-flex">
                <Col className="col-3 align-items-center d-flex">
                    <Image src="/python.png" style={{width: "100%", maxWidth: "140px"}}/>
                </Col>
                <Col>
                    <span style={{fontSize: "1.2vw", color: "#1E4172"}}>USERNAME</span>
                    <h3 style={{fontSize: "0.8vw"}}>USER0000@GMAIL.COM</h3>

                    <span style={{fontSize: "0.8vw"}}>PROGRESS</span>
                    <h3 style={{fontSize: "0.8vw"}}>JAVA 80%</h3>
                </Col>
                <Col className="col-3">
                    <Card className="text-center mt-1 px-2 py-3 mb-2 shadow" style={{border: "none", backgroundColor: "rgba(39,109,210,0.53)"}}>
                            <span style={{fontSize: "0.9vw", color: "#1E4172"}}><FontAwesomeIcon
                                icon={faCode}/> JAVA</span>
                    </Card>
                    <Card className="text-center px-2 py-3 shadow" style={{border: "none", backgroundColor: "rgba(39,109,210,0.53)"}}>
                        <span style={{fontSize: "0.9vw", color: "#1E4172"}}><FontAwesomeIcon icon={faRankingStar}/> EXPERIENCED</span>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
}

export default UserPanel;
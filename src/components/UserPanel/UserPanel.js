import React from "react";
import {Card, Col, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCode, faRankingStar} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {fetchDifficulty, fetchLanguage, selectDifficulty, selectLanguage} from "../../features/settings/settingsSlice";
import {useEffect, useState} from "react";
import {
    fetchUserDetails, fetchUserProgress,
    selectEmail,
    selectProgress,
    selectUsername
} from "../../features/userDetails/userDetailsSlice";

const UserPanel = () => {

    const language = useSelector(selectLanguage);
    const difficulty = useSelector(selectDifficulty);
    const progress = useSelector(selectProgress);
    const username = useSelector(selectUsername);
    const email = useSelector(selectEmail);

    const [progressPercentage, SetProgressPercentage] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(fetchLanguage());
       dispatch(fetchDifficulty());
       dispatch(fetchUserDetails());
    }, [dispatch]);

    useEffect(() => {
        if (language && difficulty) {
            dispatch(fetchUserProgress(language, difficulty));
        }
    }, [language, difficulty]);

    useEffect(() => {
        if (progress) {
            SetProgressPercentage(Math.round(progress.Completed / progress.Total * 100));
        }
    }, [progress]);

    return(
        <Card className="shadow p-3 mb-5 bg-white rounded">
            <Row className="justify-content-start d-flex">
                <Col className="col-3 align-items-center d-flex">
                    <Image src="/python.png" style={{width: "100%", maxWidth: "140px"}}/>
                </Col>
                <Col>
                    <span style={{fontSize: "1.3vw", color: "#1E4172", fontWeight: "bold"}}>{username}</span>
                    <h3 style={{fontSize: "0.9vw"}}>{email}</h3>

                    <span style={{fontSize: "0.8vw"}}>PROGRESS</span>
                    <h3 style={{fontSize: "0.8vw"}}>{language} {progressPercentage}%</h3>
                </Col>
                <Col className="col-3">
                    <Card className="text-center mt-1 px-2 py-3 mb-2 shadow" style={{border: "none", backgroundColor: "rgba(39,109,210,0.53)"}}>
                            <span style={{fontSize: "0.9vw", color: "#1E4172"}}><FontAwesomeIcon
                                icon={faCode}/> {language.toUpperCase()}</span>
                    </Card>
                    <Card className="text-center px-2 py-3 shadow" style={{border: "none", backgroundColor: "rgba(39,109,210,0.53)"}}>
                        <span style={{fontSize: "0.9vw", color: "#1E4172"}}><FontAwesomeIcon icon={faRankingStar}/> {difficulty.toUpperCase()}</span>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
}

export default UserPanel;
import React, {useEffect} from "react";
import Row from "react-bootstrap/Row";
import {Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { fetchLanguage, selectLanguage} from "../../features/settings/settingsSlice";

const ErrorModal = (props) => {

    const language = useSelector(selectLanguage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLanguage());
    }, [dispatch]);

    const analysisStatus = useSelector(state => state.code.analysisStatus);
    const executionStatus = useSelector(state => state.code.executionStatus);
    const steps = useSelector(state => state.code.steps);

    const errors = useSelector(state => state.code.errors);
    let errorsPanels = [];

    if (errors && errors.length > 0) {

        for (let i = 0; i < errors.length; i++)
            errorsPanels.push(<p className="mb-2" style={{fontSize: "0.8vw"}}>{errors[i]}</p>);

    } else
        errorsPanels.push(
            <p className="mb-2" style={{fontSize: "1.1vw", fontWeight: "bold"}}>---</p>
        );

    let stepsPanels = [];

    console.log(steps)
    if (steps && steps.length > 0) {
        for (let step of steps) {

            let args = "---";
            if (step.args && step.args.length > 0) {
                args = "";
                for (let arg of step.args)
                    args += arg + "; ";
            }

            stepsPanels.push(<p className="mb-2" style={{fontSize: "0.8vw"}}>
                {step.id} - {step.successful ? "Success" : "Failed"}<br></br>
                Args: {args}
            </p>);
        }
    } else {
        stepsPanels.push(
            <p className="mb-2" style={{fontSize: "0.8vw"}}>...</p>
        );
    }

    return (
        <Container>
            <Row className="mx-1 my-4">
                <span style={{fontSize: "0.7vw"}}>{props.level.title} - {language.toUpperCase()}</span>
                <h1 style={{fontSize: "1.7vw"}}>Errors Found</h1>
            </Row>
            <Row className="mx-1 mb-2">
                {errorsPanels}
            </Row>
            <Row className="mx-1 mt-2">
                <p className="mb-2" style={{fontSize: "1.1vw", fontWeight: "bold"}}>Steps</p>
                {stepsPanels}
            </Row>
            <Row className="mx-1 mt-4">
                <p className="mb-2" style={{fontSize: "1.1vw", fontWeight: "bold"}}>Analysis Status</p>
                <p style={{fontSize: "0.8vw"}}>{analysisStatus || "..."}</p>
                <p className="mb-2" style={{fontSize: "1.1vw", fontWeight: "bold"}}>Execution Status</p>
                <p style={{fontSize: "0.8vw"}}>{executionStatus || "..."}</p>
            </Row>
        </Container>

    );
};

export default ErrorModal;
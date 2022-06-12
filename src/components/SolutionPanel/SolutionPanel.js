import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import CodeMirror from '@uiw/react-codemirror';
import {java} from "@codemirror/lang-java";
import {oneDark} from "@codemirror/theme-one-dark";

const SolutionPanel = (props) => {

    const [solution, setSolution] = useState(props.solution);

    useEffect(() => {
        if (props.solution) {
            setSolution(props.solution);
        }
    }, [props.solution]);

    if (props.hidden) {
        return (
            <Card className="shadow p-4 mb-3 rounded h-100" style={{opacity: "60%"}}>
                <span style={{fontSize: "1vw", fontWeight: "bold", color: "#2E78E1FF"}}>{solution.score}</span>
                <span className="mt-2"
                      style={{fontSize: "0.7vw"}}>{solution.settings.language} - {solution.settings.skillLevel}</span>
                <span className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold"}}>{solution.authorUsername}</span>
                <span className="mt-4" style={{fontSize: "0.8vw"}}>--- Locked ---</span>
            </Card>
        );
    }

    return (
        <Card className="shadow p-4 mb-3 rounded h-100">
            <span style={{fontSize: "1vw", fontWeight: "bold", color: "#2E78E1FF"}}>{solution.score}</span>
            <span className="mt-2"
                  style={{fontSize: "0.7vw"}}>{solution.settings.language} - {solution.settings.skillLevel}</span>
            <span className="mb-2" style={{fontSize: "0.9vw", fontWeight: "bold"}}>{solution.authorUsername}</span>
            <CodeMirror className="mt-4 mx-2"
                        height={'35vh'}
                        readOnly={true}
                        value={solution.code}
                        extensions={[java()]}
                        theme={oneDark}
            />
        </Card>
    );
};

export default SolutionPanel;
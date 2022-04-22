import React from 'react';
import {Card, FormSelect} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export class DifficultySelect extends React.Component {

    constructor(props) {
        super(props);
    }

    difficultyUpdated(event) {
        let difficulty = event.target.value;
        if (this.props.on_difficulty_changed !== undefined)
            this.props.on_difficulty_changed(difficulty);
    }

    render() {

        return(
            <Col className="col-3">
                <Card className="shadow w-100 px-4 pt-4 pb-5">
                               <span className="mb-3" style={{color: "#2e78e1", fontSize: "1.6vh", fontWeight: "bold", textTransform: "uppercase"}}>
                                   <FontAwesomeIcon  icon={faStar} style={{color: "#2e78e1"}} /> Difficulty</span>
                    <FormSelect onChange={this.difficultyUpdated.bind(this)}>
                        <option key={0} value={"Novice"}>Novice</option>
                        <option key={1} value={"Experienced"}>Experienced</option>
                        <option key={2} value={"Advanced"}>Advanced</option>
                    </FormSelect>
                </Card>
            </Col>
        );
    }
}

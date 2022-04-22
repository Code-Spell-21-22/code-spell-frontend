import React from 'react';
import {Card, FormSelect} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export class LevelSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            levels: this.props.levels
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.levels != this.props.levels) {
            this.setState(
                {levels: this.props.levels}
            )
        }
    }

    levelUpdated(event) {
        let level = event.target.value;
        if (this.props.on_chapter_changed !== undefined)
            this.props.on_chapter_changed(level);
    }

    render() {

        if (this.props.is_disabled) {
            return (
                <Col className="col-3">
                    <Card className="shadow w-100 px-4 pt-4 pb-5" style={{opacity: "0.6"}}>
                               <span className="mb-3" style={{color: "#2e78e1", fontSize: "1.6vh", fontWeight: "bold", textTransform: "uppercase"}}>
                                   <FontAwesomeIcon  icon={faStar} style={{color: "#2e78e1"}} /> Level</span>
                        <FormSelect disabled={true} onChange={this.levelUpdated.bind(this)}>
                            <option>---</option>
                        </FormSelect>
                    </Card>
                </Col>
            );
        }

        let levelsSelect = [];

        let levels = this.state.levels;
        if (levels !== undefined && levels !== []) {
            levelsSelect = levels.map(option => <option key={option.id} value={option.id}>
                {option.title}
            </option>);
        }

        return(
        <Col className="col-3">
            <Card className="shadow w-100 px-4 pt-4 pb-5">
                               <span className="mb-3" style={{color: "#2e78e1", fontSize: "1.6vh", fontWeight: "bold", textTransform: "uppercase"}}>
                                   <FontAwesomeIcon  icon={faStar} style={{color: "#2e78e1"}} /> Level</span>
                <FormSelect onChange={this.levelUpdated.bind(this)}>
                    <option>---</option>
                    {levelsSelect}
                </FormSelect>
            </Card>
        </Col>
        );
    }
}

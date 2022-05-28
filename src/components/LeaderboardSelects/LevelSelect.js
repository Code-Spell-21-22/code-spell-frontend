import {Card, FormSelect} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState} from "react";

const LevelSelect = (props) => {

    const [levels, setLevels] = useState(props.levels);

    useEffect(() => {
        setLevels(props.levels);
    }, [props.levels]);

    const levelUpdated = (event) => {
        let level = event.target.value;
        if (props.on_level_changed !== undefined)
            props.on_level_changed(level);
    };

    if (props.is_disabled) {
        return (
            <Col className="col-3">
                <Card className="shadow w-100 px-4 pt-4 pb-5" style={{opacity: "0.6"}}>
                               <span className="mb-3" style={{color: "#2e78e1", fontSize: "1.6vh", fontWeight: "bold", textTransform: "uppercase"}}>
                                   <FontAwesomeIcon  icon={faStar} style={{color: "#2e78e1"}} /> Level</span>
                    <FormSelect disabled={true} onChange={levelUpdated.bind(this)}>
                        <option>---</option>
                    </FormSelect>
                </Card>
            </Col>
        );
    }

    let levelsSelect = [];
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
                <FormSelect onChange={levelUpdated.bind(this)}>
                    <option>---</option>
                    {levelsSelect}
                </FormSelect>
            </Card>
        </Col>
    );
};

export default LevelSelect;
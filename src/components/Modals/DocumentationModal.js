import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faGreaterThan,
} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import {Card, Col, Container} from "react-bootstrap";
import {getLevelDocumentation} from "../../utils/api/apihandler";

const DocumentationModal = (props) => {

    const [level] = React.useState(props.level);
    const [documentation, setDocumentation] = React.useState(undefined);

    useEffect(() => {
        getLevelDocumentation(level.id).then(res => {
            setDocumentation(res.data);
        });
    }, [level]);

    let docText = [];
    let docBox = [];

    if (documentation) {
        for (let idx in documentation) {
            let doc = documentation[idx];

            docText.push(
                <Col key={idx} className="col-6">
                    <Row className="align-items-center d-flex">
                        <Col className="col-2 justify-content-center d-flex">
                            <p className="px-2 py-1 text-white text-center rounded-circle"
                               style={{fontSize: "0.6vw", backgroundColor: "#3f73c2"}}>{parseInt(idx) + 1}</p>
                        </Col>
                        <Col>
                            <p className="mb-3" style={{fontSize: "1.1vw", fontWeight: "bold"}}>{doc.title}</p>
                        </Col>
                    </Row>
                    <p style={{fontSize: "0.8vw"}}>{doc.description}</p>
                </Col>
            );

            docBox.push(
                <Col key={idx} className="col-6">
                    <Card className="p-3">
                        <p className="mb-1"
                           style={{fontSize: "0.8vw", fontWeight: "bold", textTransform: "uppercase"}}>{doc.title}</p>
                        <h3 className="align-items-center d-flex" style={{fontSize: "0.8vw", color: "#3f73c2", cursor: "pointer"}}
                            onClick={() => window.open(doc.link)}>
                            Learn More
                            <FontAwesomeIcon className="rounded-circle text-white p-2 ms-2"
                                             style={{fontSize: "0.4vw", backgroundColor: "#3f73c2"}}
                                             icon={faGreaterThan}/></h3>
                    </Card>
                </Col>
            );
        }
    }

    return (
        <Container>
            <Row className="mx-2 mt-5 mb-4 justify-content-center d-flex">
                {docText}
            </Row>
            <Row className="justify-content-center d-flex mb-3">
                {docBox}
            </Row>
        </Container>
    );
};

export default DocumentationModal;

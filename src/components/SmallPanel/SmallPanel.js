import React from 'react';
import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class SmallPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
      return(
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <Row className="my-2">
                <Col className="col-md col-lg mx-4" >
                    <p className="fs-8 fw-bolder mt-3 mb-0">{this.props.title}</p>
                    <p className="fs-6 fw-normal mb-2">{this.props.subtitle}</p>
                    <p className="fs-7 fw-light text-secondary text-blue">{this.props.info}</p>
                </Col>
            </Row>
        </Card>
      );
  }

}
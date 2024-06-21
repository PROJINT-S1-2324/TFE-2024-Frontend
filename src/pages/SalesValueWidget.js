// SalesValueWidget.js
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const SalesValueWidget = ({ title, value, percentage, icon }) => {
  return (
    <Card className="bg-primary text-white shadow-sm">
      <Card.Body>
        <Row className="d-flex align-items-center">
          <Col xs={8}>
            <h5 className="mb-0">{title}</h5>
            <span className="h2 font-weight-bold mb-0">{value}</span>
            <div className="mt-3">
              <span className="text-success mr-2">
                <FontAwesomeIcon icon={faArrowUp} /> {percentage}%
              </span>
            </div>
          </Col>
          <Col xs={4} className="text-right">
            <div className="icon icon-shape bg-white text-primary rounded-circle shadow">
              <FontAwesomeIcon icon={icon} />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SalesValueWidget;

// CounterWidget.js
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const CounterWidget = ({ category, title, percentage, icon, iconColor }) => {
  const iconClass = `icon icon-shape bg-${iconColor} text-white rounded-circle shadow`;
  const iconPercentage = percentage >= 0 ? faArrowUp : faArrowDown;
  const textPercentage = percentage >= 0 ? 'text-success' : 'text-danger';

  return (
    <Card className="bg-secondary shadow-sm border-0">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col className="col-8">
            <h5 className="mb-0">{category}</h5>
            <span className="h2 font-weight-bold mb-0">{title}</span>
            <div className="mt-3">
              <span className={`${textPercentage} mr-2`}>
                <FontAwesomeIcon icon={iconPercentage} /> {percentage}%
              </span>
            </div>
          </Col>
          <Col className="col-4 text-right">
            <div className={iconClass}>
              <FontAwesomeIcon icon={icon} />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CounterWidget;

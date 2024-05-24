import React from "react";
import { ChartistTooltip } from 'chartist-plugin-tooltips-updated';
import { SalesValueChart as CustomSalesValueChart,BarValueChart } from './Chart'; // Importez le composant renommé
import { Col, Row, Card, Button } from '@themesberg/react-bootstrap';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SalesValueWidget = (props) => {
  const { title, value, percentage } = props;
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  const percentageColor = percentage < 0 ? "text-danger" : "text-success";

  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-flex flex-row align-items-center flex-0">
        <div className="d-block">
          <h5 className="fw-normal mb-2">
            {title}
          </h5>
          <h3>${value}</h3>
          <small className="fw-bold mt-2">
            <span className="me-2">Yesterday</span>
            <FontAwesomeIcon icon={percentageIcon} className={`${percentageColor} me-1`} />
            <span className={percentageColor}>
              {percentage}%
            </span>
          </small>
        </div>
        <div className="d-flex ms-auto">
          <Button >Month</Button>
          <Button >Week</Button>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <CustomSalesValueChart />
        
      </Card.Body>
    </Card>
  );
};
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {SalesValueWidget } from "../components/Widgets";
import { Col, Row } from '@themesberg/react-bootstrap';

const Dashboard = () => {
    
    const { t } = useTranslation();

    

    return (
        <div>
            <h1>Dashboard</h1>
            
            <h1>{t('hello')}</h1>
      <p>{t('welcome')}</p>
      <Row className="justify-content-md-center">
      <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>

      </Row>
        </div>
    );
};

export default Dashboard;



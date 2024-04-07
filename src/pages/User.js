import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown } from '@themesberg/react-bootstrap';
import { GeneralInfoForm } from "../components/Forms";

import Profile3 from "../assets/img/team/profile-picture-3.jpg";


export default () => {
  return (
    <>
      
      <Row>
        <Col xs={12} xl={8}>
          <GeneralInfoForm />
        </Col>
      </Row>
    </>
  );
};

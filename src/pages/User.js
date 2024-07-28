import React from "react";
import { Col, Row } from "@themesberg/react-bootstrap";
import { GeneralInfoForm } from "../components/Forms";

export default () => {
  return (
    <Row className="justify-content-center">
      <Col xs={12} lg={12} xl={10}>
        <GeneralInfoForm />
      </Col>
    </Row>
  );
};

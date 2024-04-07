import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";

export default () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChangePassword = async () => {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        throw new Error('No token found in localStorage');
      }

      const requestBody = {
        oldPassword: oldPassword,
        newPassword: newPassword
      };

      const response = await fetch('https://staging.iotfactory.eu/api/users/changePwd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Session ${authToken}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      setOldPassword('');
      setNewPassword('');
      setErrorMessage('');
      setSuccessMessage('Mot de passe changé avec succès !');
    } catch (error) {
      console.error('Error changing password:', error);
      setErrorMessage('Failed to change password. Please try again.');
    }
  };

  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
           
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Reset password</h3>
                <Form>
                  <Form.Group id="oldPassword" className="mb-4">
                    <Form.Label>Your Old Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="newPassword" className="mb-4">
                    <Form.Label>Your New Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100" onClick={handleChangePassword}>
                    Reset password
                  </Button>
                  {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
                  {successMessage && <p className="text-success mt-3">{successMessage}</p>}
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
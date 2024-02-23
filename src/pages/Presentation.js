import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Routes } from "../routes";
import BgImage from "../assets/img/illustrations/signin.svg";

import { Container, Row, Col, Card, Form, Button, FormCheck, InputGroup } from '@themesberg/react-bootstrap';

const Presentation = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://staging.iotfactory.eu/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          keep: false
        })
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      const authToken = data._id;

      console.log('Token generated:', authToken);

      localStorage.setItem('token', authToken);
      localStorage.setItem('lastName', data.user.lastName);
      localStorage.setItem('firstName', data.user.firstName);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('language', data.user.language);
      localStorage.setItem('locale', data.user.locale);
      localStorage.setItem('status', data.user.status);
      localStorage.setItem('isLoggedIn', true); // Indicateur de connexion

      history.push(Routes.DashboardOverview.path); // Redirection vers la route DashboardOverview
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Échec de la connexion. Veuillez vérifier vos informations d\'identification.');
    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        {/* icône de l'e-mail */}
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email" placeholder="example@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          {/* icône de verrouillage */}
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">Lost password?</Card.Link>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  {/* boutons d'icônes pour les réseaux sociaux */}
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Presentation;
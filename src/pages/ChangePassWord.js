import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup } from '@themesberg/react-bootstrap';

export default () => {
  const { user } = useAuth0();
  const [email, setEmail] = useState(user ? user.email : '');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      const requestBody = {
        client_id: "TFGZh1cX2WM6yZ51aK8a5eGm2z2wETTU", // Votre client_id
        email: email,
        connection: 'Username-Password-Authentication'
      };

      const response = await fetch(`https://dev-an4h3iea72pdgq3t.uk.auth0.com/dbconnections/change_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to request password change');
      }

      setSuccessMessage('Un email de réinitialisation du mot de passe a été envoyé !');
      setErrorMessage('');
    } catch (error) {
      console.error('Error requesting password change:', error);
      setErrorMessage('Échec de la demande de changement de mot de passe. Veuillez réessayer.');
      setSuccessMessage('');
    }
  };

  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Demander un changement de mot de passe</h3>
                <Form onSubmit={handleChangePassword}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Votre Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="email"
                        placeholder="example@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Demander un changement de mot de passe
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

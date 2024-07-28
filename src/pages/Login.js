import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useHistory } from 'react-router-dom';
import { Routes } from "../routes";
import BgImage from "../assets/img/illustrations/signin.svg";
import { Container, Row, Col, Card, Form, Button } from '@themesberg/react-bootstrap';

// Ancien logo
const logoPath = process.env.PUBLIC_URL + '/src/assets/img/logo.png';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginWithRedirect({
        redirectUri: window.location.origin + '/volt-react-dashboard#/Dashboard',
        appState: { targetUrl: Routes.Dashboard.path },
        connection: "Username-Password-Authentication"
      });
      history.push(Routes.Dashboard.path);
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                {/* Ancien logo */}
                <div className="text-center text-md-center mb-4 mt-md-0">
                <img 
            src="https://www.vrnda.com/wp-content/uploads/2023/05/aiiot-overview.png" 
            alt="IoT Factory Logo" 
            className="mb-4" 
            style={{ maxWidth: '300px' }} 
                />  
                  <h3 className="mb-0">Connectez-vous à notre plateforme</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  {/* Espace pour simuler les champs email et mot de passe */}
                  <div style={{ height: '1px' }}></div>
                  {/* Bouton de connexion */}
                  <Button variant="primary" type="submit" className="w-100">
                    Se connecter
                  </Button>
                  
                </Form>
                
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      
    </main>
  );
};

export default Login;

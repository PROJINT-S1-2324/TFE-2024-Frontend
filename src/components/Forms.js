import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const GeneralInfoForm = () => {
  const [userData, setUserData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://20.123.48.27:8080/api/users`);

        if (!response.ok) {
          throw new Error("Failed to load user data");
        }

        const data = await response.json();
        if (data.length > 0) {
          setUserData(data[0]); // Mise à jour avec le premier utilisateur de la liste (supposant un seul utilisateur pour l'instant)
          localStorage.setItem("userData", JSON.stringify(data[0])); // Stocker les données localement
          setErrorMessage("");
        } else {
          setErrorMessage("No user data available");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        const storedData = localStorage.getItem("userData");
        if (storedData) {
          setUserData(JSON.parse(storedData)); // Charger les données à partir de localStorage en cas d'erreur
          setErrorMessage("Loaded offline data.");
        } else {
          setErrorMessage("Failed to load user data. Please try again.");
        }
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://20.123.48.27:8080/api/users/${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save user data");
      }

      setEditing(false);
      localStorage.setItem("userData", JSON.stringify(userData)); // Mettre à jour les données localement après la sauvegarde
      setErrorMessage("");
    } catch (error) {
      console.error("Error saving user data:", error);
      setErrorMessage("Failed to save user data. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  return (
    <Container fluid className="py-4">
      <h1 className="mb-4">Informations générales de l'utilisateur</h1>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} sm={6}>
                <Form.Label>{t("Prénom :")}</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="rounded-0"
                />
              </Form.Group>
              <Form.Group as={Col} sm={6}>
                <Form.Label>{t("Nom :")}</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="rounded-0"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} sm={6}>
                <Form.Label>{t("Adresse :")}</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="rounded-0"
                />
              </Form.Group>
              <Form.Group as={Col} sm={6}>
                <Form.Label>{t("Numéro de téléphone :")}</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="rounded-0"
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>{t("Email :")}</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                disabled={!editing}
                className="rounded-0"
              />
            </Form.Group>

            <div className="mt-3 d-flex justify-content-end">
              {editing ? (
                <Button onClick={handleSave} variant="primary" className="me-2">
                  Enregistrer
                </Button>
              ) : (
                <Button onClick={toggleEditing} variant="info" className="me-2">
                  Modifier
                </Button>
              )}
              <Button onClick={() => window.location.reload()} variant="info">
                Actualiser
              </Button>
            </div>
            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

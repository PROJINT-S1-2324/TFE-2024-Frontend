import React, { useState, useEffect } from "react";
import { Col, Row, Card, Button } from "@themesberg/react-bootstrap";
import { useTranslation } from 'react-i18next';

export const GeneralInfoForm = () => {
  const [userData, setUserData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    role: "",
    language: "",
    locale: "",
    status: "",
  });

  const { t } = useTranslation();

  const [editing, setEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadUserData = async () => {
    try {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        throw new Error("No token found in localStorage");
      }

      const response = await fetch(
        "https://staging.iotfactory.eu/api/users/65c5f8b5814e940017d5d16c",
        {
          method: "GET",
          headers: {
            Authorization: `Session ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load user data");
      }

      const data = await response.json();
      setUserData(data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error loading user data:", error);
      setErrorMessage("Failed to load user data. Please try again.");
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleSave = async () => {
    try {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        throw new Error("No token found in localStorage");
      }

      const response = await fetch(
        "https://staging.iotfactory.eu/api/users/65c5f8b5814e940017d5d16c",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Session ${authToken}`,
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save user data");
      }

      setEditing(false);
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
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Row>
          <Col md={6} className="mb-3">
            <p>
              <strong>{t('First Name:')}  </strong>{" "}
              {editing ? (
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                />
              ) : (
                userData.firstName
              )}
            </p>
          </Col>
          <Col md={6} className="mb-3">
            <p>
              <strong>{t('Last Name:')}  </strong>{" "}
              {editing ? (
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                />
              ) : (
                userData.lastName
              )}
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-3">
            <p>
            
              <strong>{t(' Email: ')} </strong>{" "}
              {editing ? (
                <input
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              ) : (
                userData.email
              )}
            </p>
          </Col>
          <Col md={6} className="mb-3">
            <p>
            <th></th>
              <strong>{t('Role: ')}</strong>{" "}
              {editing ? (
                <input
                  type="text"
                  name="role"
                  value={userData.role}
                  onChange={handleInputChange}
                />
              ) : (
                userData.role
              )}
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-3">
            <p>
              <strong>{t('Language: ')}</strong>{" "}
              {editing ? (
                <input
                  type="text"
                  name="language"
                  value={userData.language}
                  onChange={handleInputChange}
                />
              ) : (
                userData.language
              )}
            </p>
          </Col>
          <Col md={6} className="mb-3">
            <p>
              <strong>Locale: </strong>{" "}
              {editing ? (
                <input
                  type="text"
                  name="locale"
                  value={userData.locale}
                  onChange={handleInputChange}
                />
              ) : (
                userData.locale
              )}
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-3">
            <p>
              <strong>Status: </strong>{" "}
              {editing ? (
                <input
                  type="text"
                  name="status"
                  value={userData.status}
                  onChange={handleInputChange}
                />
              ) : (
                userData.status
              )}
            </p>
          </Col>
        </Row>

        <div className="mt-3">
          {editing ? (
            <Button onClick={handleSave} variant="primary">
              Save
            </Button>
          ) : (
            <Button onClick={toggleEditing} variant="info">
              {editing ? "Cancel" : "Edit"}
            </Button>
          )}
          <Button onClick={loadUserData} variant="info" className="ms-2">
            Refresh
          </Button>
        </div>
        {errorMessage && (
          <p className="text-danger mt-3">{errorMessage}</p>
        )}
      </Card.Body>
    </Card>
  );
};
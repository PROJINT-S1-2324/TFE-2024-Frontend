import React, { useState, useEffect } from "react";
import { Col, Row, Card, Button } from "@themesberg/react-bootstrap";

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

  const [editing, setEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setUserData({
      lastName: localStorage.getItem("lastName") || "",
      firstName: localStorage.getItem("firstName") || "",
      email: localStorage.getItem("email") || "",
      role: localStorage.getItem("role") || "",
      language: localStorage.getItem("language") || "",
      locale: localStorage.getItem("locale") || "",
      status: localStorage.getItem("status") || "",
    });
  }, []);

  const handleSave = async () => {
    try {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        throw new Error("No token found in localStorage");
      }

      const response = await fetch(
        "https://staging.iotfactory.eu/api/users/65c3616b56fe3b00181769b3",
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
              <strong>First Name: </strong>{" "}
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
              <strong>Last Name: </strong>{" "}
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
              <strong>Email: </strong>{" "}
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
              <strong>Role: </strong>{" "}
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
              <strong>Language: </strong>{" "}
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
              Edit
            </Button>
          )}
        </div>
        {errorMessage && (
          <p className="text-danger mt-3">{errorMessage}</p>
        )}
      </Card.Body>
    </Card>
  );
};
import React from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "../routes";
import LanguageSelector from "../pages/LanguageSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSignOutAlt, faChartPie, faCog,faCircle } from "@fortawesome/free-solid-svg-icons"; 

import { Form, InputGroup, Navbar, Nav, Container, Dropdown } from '@themesberg/react-bootstrap';

import Profile3 from "../assets/img/team/profile-picture-3.jpg";

export default (props) => {
  const history = useHistory();

  const UseProfil = () => {
    history.push(Routes.User.path);
  };

  const ChangePassWord = () => {
    history.push(Routes.ChangePassWord.path);
  };

  const logout = () => {
    localStorage.clear();
    history.push(Routes.Login.path);
  };

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Form className="navbar-search">
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge search-bar">
                
                  
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
      <div className="media d-flex align-items-center">
        <FontAwesomeIcon icon={faCircle} className="text-black me-2" size="3x" /> {/* Définissez la taille comme "lg" pour agrandir l'icône */}
        <div className="media-body text-dark align-items-center d-none d-lg-block">
        <span className="mb-0 font-small fw-bold"><LanguageSelector/> </span>
          <span className="mb-0 font-small fw-bold"> {localStorage.getItem("lastName")} {localStorage.getItem("firstName")}</span>
        </div>
      </div>
    </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold" onClick={UseProfil}>
                  <FontAwesomeIcon icon={faChartPie} className="text-danger me-2" /> My Profil
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold" onClick={ChangePassWord}>
                  <FontAwesomeIcon icon={faCog} className="text-danger me-2" /> Reset Password
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="fw-bold" onClick={logout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
import React from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "../routes";
import LanguageSelector from "../pages/LanguageSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faChartPie, faCog, faCircle } from "@fortawesome/free-solid-svg-icons";
import { Form, InputGroup, Navbar, Nav, Container, Dropdown } from '@themesberg/react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";

export default (props) => {
  const { logout } = useAuth0();
  const history = useHistory();

  const UseProfil = () => {
    history.push(Routes.User.path);
  };

  const ChangePassWord = () => {
    history.push(Routes.ChangePassWord.path);
  };

  const handleLogout = () => {
    localStorage.clear();
    logout({ returnTo: window.location.origin });
  };

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Form className="navbar-search">
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge search-bar">
                  {/* Search bar content */}
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <FontAwesomeIcon icon={faCircle} className="text-black me-2" size="3x" />
                  <div className="media-body text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold"><LanguageSelector /> </span>
                    <span className="mb-0 font-small fw-bold"> {localStorage.getItem("lastName")} {localStorage.getItem("firstName")}</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold" onClick={UseProfil}>
                  <FontAwesomeIcon icon={faChartPie} className="text-danger me-2" /> Mon Profil
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold" onClick={ChangePassWord}>
                  <FontAwesomeIcon icon={faCog} className="text-danger me-2" /> Réinitialiser le mot de passe
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="fw-bold" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Déconnexion
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

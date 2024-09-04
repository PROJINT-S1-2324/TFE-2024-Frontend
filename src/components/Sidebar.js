import React, { useState, useEffect } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCogs, faHome,faEuroSign, faTable, faDollarSign, faTimes, faChevronRight, faPlug, faChartLine, faLightbulb, faWater } from "@fortawesome/free-solid-svg-icons";
import { Nav, Button, Dropdown, Navbar, Image, Badge } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import ThemesbergLogo from "../assets/img/themesberg.svg";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const [showFrigo, setShowFrigo] = useState(false);
  const [showEclairage, setShowEclairage] = useState(false);
  const [showBoilier, setShowBoilier] = useState(false);
  const showClass = show ? "show" : "";

  useEffect(() => {
    // Ouvre le menu Prise Frigo si le pathname contient l'un des sous-routes
    if (pathname.includes(Routes.PriseFrigo1.path) || pathname.includes(Routes.TabPrise.path)) {
      setShowFrigo(true);
    } else {
      setShowFrigo(false);
    }
    // Ouvre le menu Eclairage si le pathname contient l'un des sous-routes
    if (pathname.includes(Routes.Eclairage.path) || pathname.includes(Routes.TabEclairage.path)) {
      setShowEclairage(true);
    } else {
      setShowEclairage(false);
    }
    // Ouvre le menu Boilier si le pathname contient l'un des sous-routes
    if (pathname.includes(Routes.Boilier.path) || pathname.includes(Routes.TabBoilier.path)) {
      setShowBoilier(true);
    } else {
      setShowBoilier(false);
    }
  }, [pathname]);

  const onCollapse = () => setShow(!show);

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary", children = null } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={`${classNames} bg-dark text-white border-0`}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}
            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
        {children}
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="IOT FACTORY" icon={faCogs} />
              <NavItem title="Dashboard" icon={faHome} link={Routes.Dashboard.path} />
              <NavItem title="Coût" icon={faEuroSign} link={Routes.Coût.path} />
              <NavItem title="Devices" icon={faBook} link={Routes.Asset.path} />

              <Nav.Item onClick={() => setShowFrigo(!showFrigo)}>
                <Nav.Link className="d-flex justify-content-between align-items-center bg-dark text-white border-0">
                  <span>
                    <span className="sidebar-icon"><FontAwesomeIcon icon={faPlug} /> </span>
                    <span className="sidebar-text">Prise Frigo</span>
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
                </Nav.Link>
                {showFrigo && (
                  <Nav className="flex-column ms-3">
                    <NavItem title="Diagram Consom" icon={faChartLine} link={Routes.PriseFrigo1.path} />
                    <NavItem title="Tableau Consom" icon={faTable} link={Routes.TabPrise.path} />
                  </Nav>
                )}
              </Nav.Item>
              
              <Nav.Item onClick={() => setShowEclairage(!showEclairage)}>
                <Nav.Link className="d-flex justify-content-between align-items-center bg-dark text-white border-0">
                  <span>
                    <span className="sidebar-icon"><FontAwesomeIcon icon={faLightbulb} /> </span>
                    <span className="sidebar-text">Eclairage</span>
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
                </Nav.Link>
                {showEclairage && (
                  <Nav className="flex-column ms-3">
                    <NavItem title="Diagram Consom" icon={faChartLine} link={Routes.Eclairage.path} />
                    <NavItem title="Tableau Consom" icon={faTable} link={Routes.TabEclairage.path} />
                  </Nav>
                )}
              </Nav.Item>
              
              <Nav.Item onClick={() => setShowBoilier(!showBoilier)}>
                <Nav.Link className="d-flex justify-content-between align-items-center bg-dark text-white border-0">
                  <span>
                    <span className="sidebar-icon"><FontAwesomeIcon icon={faWater} /> </span>
                    <span className="sidebar-text">Boilier</span>
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
                </Nav.Link>
                {showBoilier && (
                  <Nav className="flex-column ms-3">
                    <NavItem title="Diagram Consom" icon={faChartLine} link={Routes.Boilier.path} />
                    <NavItem title="Tableau Consom" icon={faTable} link={Routes.TabBoilier.path} />
                  </Nav>
                )}
              </Nav.Item>

              <Dropdown.Divider className="my-3 border-indigo" />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};

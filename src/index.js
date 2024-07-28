/*
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';



// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

// Enregistrement du service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`)
      .then((registration) => {
        console.log('Service worker registered:', registration);
      })
      .catch((error) => {
        console.error('Service worker registration failed:', error);
      });
  });
}

ReactDOM.render(
  <HashRouter>
     <I18nextProvider i18n={i18n}>
    <ScrollToTop />
    <HomePage />
    </I18nextProvider>
  </HashRouter>,
  document.getElementById("root")
);

*/


import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { Auth0Provider } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';


// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

// Enregistrement du service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`)
      .then((registration) => {
        console.log('Service worker registered:', registration);
      })
      .catch((error) => {
        console.error('Service worker registration failed:', error);
      });
  });
}

ReactDOM.render(
  <Auth0Provider
    domain="dev-an4h3iea72pdgq3t.uk.auth0.com"
    clientId="TFGZh1cX2WM6yZ51aK8a5eGm2z2wETTU"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <HashRouter>
      <I18nextProvider i18n={i18n}>
        <ScrollToTop />
        <HomePage />
      </I18nextProvider>
    </HashRouter>
  </Auth0Provider>,
  document.getElementById("root")
);

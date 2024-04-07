
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

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
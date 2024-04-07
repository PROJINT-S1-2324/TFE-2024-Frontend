// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Les traductions pour chaque langue
const resources = {
  en: {
    translation: {
      hello: 'Hello',
      welcome: 'Welcome',
      Id: 'Id',
      Name: 'Name',
      'First Name': 'First Name',
      'Last Name': 'First Name',
      Email: 'Email',
      Role: 'Role',
      Language: 'Language',
      Locale: 'Locale',
      Status: 'Status'
    }
  },
  fr: {
    translation: {
      hello: 'Bonjour',
      welcome: 'Bienvenue ',
      Id: 'Numero',
      Name: 'Nom',
      'First Name': 'Prénom',
      'Last Name': 'Nom',
      Email: 'Email',
      Role: 'Rôle',
      Language: 'Langue',
      Locale: 'Localisation',
      Status: 'Statut'
    }
  },
  nl: {
    translation: {
      hello: 'Hallo',
      welcome: 'Welkom',
      Id: 'Nummer',
      Name: 'Naam',
      'First Name': 'Voornaam',
      'Last Name': 'Achternaam',
      Email: 'E-mail',
      Role: 'Rol',
      Language: 'Taal',
      Locale: 'Locatie',
      Status: 'Status'
    }
  }
};

i18n
  .use(initReactI18next) // initialisation pour React
  .init({
    resources, // Les traductions pour chaque langue
    lng: 'en', // La langue par défaut
    interpolation: {
      escapeValue: false // évite d'echaper les react
    }
  });

export default i18n;
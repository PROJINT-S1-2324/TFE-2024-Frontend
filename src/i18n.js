import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      dailyConsumptionLighting: "Daily Consumption of Lighting",
      dailyConsumptionBoiler: "Daily Consumption of  Boiler",
      dailyConsumptionFrigo: "Daily Consumption of Frigo",
      previousDay: "Previous Day",
      nextDay: "Next Day",
      consumption: "{{totalConsumption}} Wh",
      hour: "{{hour}}h",
      wh: "{{value}} Wh",
      date: "Date",
      previousConsumption: "Previous Consumption",
      currentConsumption: "Current Consumption",

      generalUserInfo: "General User Information",
      firstName: "First Name",
      lastName: "Last Name",
      address: "Address",
      phoneNumber: "Phone Number",
      email: "Email",
      save: "Save",
      edit: "Edit",
      refresh: "Refresh",

      requestPasswordChange: "Request Password Change",
      yourEmail: "Your Email",
      passwordResetEmailSent: "A password reset email has been sent!",
      passwordChangeRequestFailed: "Failed to request password change. Please try again.",

      myProfile: "My Profile",
      resetPassword: "Reset Password",
      logout: "Logout",

      "Consommation Totale du Mois (kWh)": "Total Consumption of the Month (kWh)",
  "Mois précédent": "Previous Month",
  "Mois suivant": "Next Month",
  "Éclairage": "Lighting",
  "Prise": "Outlet",
  "Boiler": "Boiler",
  "Heure": "Hour",
  "Consommation (kWh)": "Consumption (kWh)",
  "Total": "Total",
  "Consommation précédente": "Previous Consumption",
  "Consommation actuelle": "Current Consumption",
  "Précédent": "Previous",
  "Suivant": "Next",

  dailyConsumption: "Daily Consumption",
      previousDay: "Previous Day",
      nextDay: "Next Day",
      hour: "Hour",
      consumptionWh: "Consumption (Wh)",
      total: "Total",
      previous: "Previous",
      next: "Next",
    }
  },
  fr: {
    translation: {
      dailyConsumptionLighting: "Consommation Journalière de l'Eclairage",
      dailyConsumptionBoiler: "Consommation Journalière du Boiler",
      dailyConsumptionFrigo: "Consommation Journalière du Frigo",
      previousDay: "Jour Précédent",
      nextDay: "Jour Suivant",
      consumption: "{{totalConsumption}} Wh",
      hour: "{{hour}}h",
      wh: "{{value}} Wh",
      date: "Date",
      previousConsumption: "Consommation précédente",
      currentConsumption: "Consommation actuelle",

      generalUserInfo: "Informations générales de l'utilisateur",
      firstName: "Prénom",
      lastName: "Nom",
      address: "Adresse",
      phoneNumber: "Numéro de téléphone",
      email: "Email",
      save: "Enregistrer",
      edit: "Modifier",
      refresh: "Actualiser",

      requestPasswordChange: "Demander un changement de mot de passe",
      yourEmail: "Votre Email",
      passwordResetEmailSent: "Un email de réinitialisation du mot de passe a été envoyé !",
      passwordChangeRequestFailed: "Échec de la demande de changement de mot de passe. Veuillez réessayer.",

      myProfile: "Mon Profil",
      resetPassword: "Réinitialiser le mot de passe",
      logout: "Déconnexion",

      "Consommation Totale du Mois (kWh)": "Consommation Totale du Mois (kWh)",
  "Mois précédent": "Mois précédent",
  "Mois suivant": "Mois suivant",
  "Éclairage": "Éclairage",
  "Prise": "Prise",
  "Boiler": "Boiler",
  "Heure": "Heure",
  "Consommation (kWh)": "Consommation (kWh)",
  "Total": "Total",
  "Consommation précédente": "Consommation précédente",
  "Consommation actuelle": "Consommation actuelle",
  "Précédent": "Précédent",
  "Suivant": "Suivant",

  dailyConsumption: "Consommation Journalière",
      previousDay: "Jour précédent",
      nextDay: "Jour suivant",
      hour: "Heure",
      consumptionWh: "Consommation (Wh)",
      total: "Total",
      previous: "Précédent",
      next: "Suivant",

    }
  },
  nl: {
    translation: {
      dailyConsumptionLighting: "Dagelijkse Verbruik van Verlichting",
      dailyConsumptionBoiler: "Dagelijks Verbruik van de Boiler",
      dailyConsumptionFrigo: "Dagelijks Verbruik van de Koelkast",
      previousDay: "Vorige Dag",
      nextDay: "Volgende Dag",
      consumption: "{{totalConsumption}} Wh",
      hour: "{{hour}}u",
      wh: "{{value}} Wh",
      date: "Datum",
      previousConsumption: "Vorige Verbruik",
      currentConsumption: "Huidige Verbruik",

      generalUserInfo: "Algemene Gebruikersinformatie",
      firstName: "Voornaam",
      lastName: "Achternaam",
      address: "Adres",
      phoneNumber: "Telefoonnummer",
      email: "E-mail",
      save: "Opslaan",
      edit: "Bewerken",
      refresh: "Verversen",

      requestPasswordChange: "Verzoek om wachtwoordwijziging",
      yourEmail: "Uw Email",
      passwordResetEmailSent: "Er is een e-mail voor wachtwoordherstel verzonden!",
      passwordChangeRequestFailed: "Aanvraag voor wachtwoordwijziging mislukt. Probeer het opnieuw.",

      myProfile: "Mijn Profiel",
      resetPassword: "Wachtwoord Resetten",
      logout: "Uitloggen",

      "Consommation Totale du Mois (kWh)": "Maandelijkse Totale Verbruik (kWh)",
  "Mois précédent": "Vorige maand",
  "Mois suivant": "Volgende maand",
  "Éclairage": "Verlichting",
  "Prise": "Stopcontact",
  "Boiler": "Boiler",
  "Heure": "Uur",
  "Consommation (kWh)": "Verbruik (kWh)",
  "Total": "Totaal",
  "Consommation précédente": "Vorige verbruik",
  "Consommation actuelle": "Huidig verbruik",
  "Précédent": "Vorige",
  "Suivant": "Volgende",

  dailyConsumption: "Dagelijkse Verbruik",
      previousDay: "Vorige Dag",
      nextDay: "Volgende Dag",
      hour: "Uur",
      consumptionWh: "Verbruik (Wh)",
      total: "Totaal",
      previous: "Vorige",
      next: "Volgende",

    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

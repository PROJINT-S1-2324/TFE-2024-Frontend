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
      currentConsumption: "Current Consumption"
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
      currentConsumption: "Consommation actuelle"
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
      currentConsumption: "Huidige Verbruik"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

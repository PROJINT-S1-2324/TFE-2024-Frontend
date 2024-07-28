import React, { useState, useEffect, useRef } from 'react';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';  // Importer Chartist
import 'chartist/dist/chartist.css';
import 'chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.css';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap
import 'animate.css/animate.min.css'; // Importer Animate.css
import { Card, Button, Col, Row } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const DataPrise = () => {
  const { t } = useTranslation();

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [donneesLocales, setDonneesLocales] = useState([]);
  const [donneesPrecedentes, setDonneesPrecedentes] = useState([]);
  const [date, setDate] = useState(getCurrentDate()); // Utiliser la date actuelle par défaut
  const [totalConsommation, setTotalConsommation] = useState(0); // État pour la consommation totale
  const dateInputRef = useRef(null); // Ref pour le champ de date

  const fetchData = async (selectedDate) => {
    try {
      const response = await fetch(`http://20.123.48.27:8080/data/energy/hourly?date=${selectedDate}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      let total = 0;
      const newData = data.map(item => {
        const { hour, consumption } = item;
        total += consumption;
        return { hour, consumption };
      });

      setTotalConsommation(total);
      setDonneesLocales(newData);
      localStorage.setItem(`priseData-${selectedDate}`, JSON.stringify(newData));
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      const localData = localStorage.getItem(`priseData-${selectedDate}`);
      if (localData) {
        const parsedData = JSON.parse(localData);
        setDonneesLocales(parsedData);
        const total = parsedData.reduce((sum, item) => sum + item.consumption, 0);
        setTotalConsommation(total);
      }
    }
  };

  const fetchPreviousData = async (selectedDate) => {
    try {
      const previousDate = new Date(selectedDate);
      previousDate.setDate(previousDate.getDate() - 1);
      const previousDateString = previousDate.toISOString().split('T')[0];

      const response = await fetch(`http://20.123.48.27:8080/data/energy/hourly?date=${previousDateString}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const newData = data.filter(item => {
        const hour = parseInt(item.hour.split(':')[0], 10);
        return hour >= 18 || hour === 0;
      }).map(item => {
        const { hour, consumption } = item;
        return { hour, consumption };
      });

      setDonneesPrecedentes(newData);
      localStorage.setItem(`prisePreviousData-${previousDateString}`, JSON.stringify(newData));
    } catch (error) {
      console.error('Erreur lors de la récupération des données précédentes:', error);
      const localData = localStorage.getItem(`prisePreviousData-${selectedDate}`);
      if (localData) {
        const parsedData = JSON.parse(localData);
        setDonneesPrecedentes(parsedData);
      }
    }
  };

  useEffect(() => {
    fetchData(date);
    fetchPreviousData(date);
    const intervalId = setInterval(() => {
      fetchData(date);
      fetchPreviousData(date);
    }, 60000); // 60000ms = 1 minute
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [date]);

  const changeDate = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate.toISOString().split('T')[0]);
  };

  const handleDateContainerClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus();
      dateInputRef.current.showPicker();
    }
  };

  const labels = donneesLocales.map(item => item.hour.split(' ')[1]); // Extrait l'heure
  const previousLabels = donneesPrecedentes.map(item => item.hour.split(' ')[1]); // Extrait l'heure pour les données précédentes

  const combinedLabels = [...new Set([...previousLabels, ...labels])];
  combinedLabels.sort((a, b) => parseInt(a.split(':')[0], 10) - parseInt(b.split(':')[0], 10));

  const series = [
    combinedLabels.map(label => {
      const data = donneesPrecedentes.find(item => item.hour.split(' ')[1] === label);
      return data ? data.consumption : 0;
    }),
    combinedLabels.map(label => {
      const data = donneesLocales.find(item => item.hour.split(' ')[1] === label);
      return data ? data.consumption : 0;
    })
  ];

  const data = {
    labels: combinedLabels,
    series: series
  };

  const options = {
    low: 0,
    showArea: true,
    fullWidth: true,
    axisX: {
      labelInterpolationFnc: function(value) {
        return t('hour', { hour: value.split(':')[0] });  // Pour afficher les heures
      }
    },
    axisY: {
      labelInterpolationFnc: function(value) {
        return t('wh', { value });  // Ajouter les unités Wh
      }
    },
    plugins: [
      ChartistTooltip({
        appendToBody: true,
        transformTooltipTextFnc: function (value) {
          return t('wh', { value });
        }
      })
    ],
    lineSmooth: Chartist.Interpolation.simple(),
    series: {
      'series-0': {
        lineSmooth: Chartist.Interpolation.none(),
        showPoint: true,
        showLine: true,
        showArea: true,
        areaBase: 0,
        classNames: {
          line: 'ct-series-a-line',
          point: 'ct-series-a-point',
          area: 'ct-series-a-area'
        },
        styles: {
          'stroke': '#006400', // Couleur verte foncée pour la consommation précédente
          'stroke-width': '2px'
        }
      },
      'series-1': {
        lineSmooth: Chartist.Interpolation.none(),
        showPoint: true,
        showLine: true,
        showArea: true,
        areaBase: 0,
        classNames: {
          line: 'ct-series-b-line',
          point: 'ct-series-b-point',
          area: 'ct-series-b-area'
        },
        styles: {
          'stroke': '#00008B', // Couleur bleue foncée pour la consommation actuelle
          'stroke-width': '2px'
        }
      }
    }
  };

  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-flex flex-row align-items-center flex-0">
        <div className="d-block">
          <h5 className="fw-normal mb-2">
            {t('dailyConsumptionFrigo')}
          </h5>
          <h3>{t('consumption', { totalConsumption: totalConsommation })}</h3>
        </div>
        <div className="d-flex ms-auto">
          <Button onClick={() => changeDate(-1)}>{t('previousDay')}</Button>
          <Button onClick={() => changeDate(1)}>{t('nextDay')}</Button>
        </div>
      </Card.Header>
      <Card.Body className="p-2">
        <div className="container">
          <div className="mb-4 text-center">
            <input
              ref={dateInputRef}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-control d-inline-block text-center"
              style={{ maxWidth: '200px' }}
              aria-label={t('date')}
            />
          </div>
          <div className="mb-4 animate__animated animate__fadeIn">
            <ChartistGraph 
              data={data} 
              options={options} 
              type="Line"
              className="ct-double-octave chart"
            />
          </div>
          <div className="d-flex justify-content-center my-3">
            <div className="d-flex align-items-center mx-3">
              <div style={{ width: '20px', height: '20px', backgroundColor: '#006400', marginRight: '10px' }}></div>
              <span>{t('previousConsumption')}</span>
            </div>
            <div className="d-flex align-items-center mx-3">
              <div style={{ width: '20px', height: '20px', backgroundColor: '#00008B', marginRight: '10px' }}></div>
              <span>{t('currentConsumption')}</span>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DataPrise;

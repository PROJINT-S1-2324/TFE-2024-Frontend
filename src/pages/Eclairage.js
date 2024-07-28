import React, { useState, useEffect, useRef } from 'react';
import 'chartist/dist/chartist.css';
import 'chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap
import 'animate.css/animate.min.css'; // Importer Animate.css
import { Card, Button, Col, Row } from '@themesberg/react-bootstrap';
import { useTranslation } from 'react-i18next';

const Eclairage = () => {
  const { t } = useTranslation();

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [donneesLocales, setDonneesLocales] = useState([]);
  const [date, setDate] = useState(getCurrentDate()); // Utiliser la date actuelle par défaut
  const [totalConsommation, setTotalConsommation] = useState(0); // État pour la consommation totale
  const dateInputRef = useRef(null); // Ref pour le champ de date

  const fetchData = async (selectedDate) => {
    try {
      const response = await fetch(`http://20.123.48.27:8080/eclai/data/eclai/energy/hourly?date=${selectedDate}`);
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
      localStorage.setItem(`eclairageData-${selectedDate}`, JSON.stringify(newData));
      localStorage.setItem(`eclairageTotal-${selectedDate}`, total.toString());
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      const localData = localStorage.getItem(`eclairageData-${selectedDate}`);
      const localTotal = localStorage.getItem(`eclairageTotal-${selectedDate}`);
      if (localData && localTotal) {
        setDonneesLocales(JSON.parse(localData));
        setTotalConsommation(parseInt(localTotal, 10));
      }
    }
  };

  useEffect(() => {
    fetchData(date);
    const intervalId = setInterval(() => {
      fetchData(date);
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

  // Palette de couleurs pour les barres
  const colors = [
    '#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1', '#e83e8c', '#fd7e14', '#20c997', '#6610f2'
  ];

  // Calculer la largeur maximale pour adapter les barres à la taille du conteneur
  const maxConsumption = Math.max(...donneesLocales.map(item => item.consumption), 0);
  const scaleFactor = maxConsumption > 0 ? 300 / maxConsumption : 1;

  return (
    <Card className="bg-secondary-alt shadow-sm">
      <Card.Header className="d-flex flex-row align-items-center flex-0">
        <div className="d-block">
          <h5 className="fw-normal mb-2">
            {t('dailyConsumptionLighting')}
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
          <Row className="mb-4 animate__animated animate__fadeIn">
            <Col>
              <div className="consumption-chart">
                <div className="chart-axis">
                  {donneesLocales.map((item, index) => (
                    <div key={index} className="chart-bar-wrapper">
                      <span className="bar-hour">{t('hour', { hour: item.hour.split(' ')[1] })}</span>
                      <div className="chart-bar" style={{ width: `${item.consumption * scaleFactor}px`, backgroundColor: colors[index % colors.length] }}>
                        <span className="bar-label">{t('wh', { value: item.consumption.toFixed(2) })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Card.Body>
      <style>{`
        .consumption-chart {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          height: 100%;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 10px;
        }
        .chart-axis {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }
        .chart-bar-wrapper {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          width: 100%;
        }
        .chart-bar {
          height: 30px;
          color: white;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-radius: 5px;
          transition: width 0.3s ease;
          margin-left: 10px;
          padding-left: 10px;
        }
        .bar-label {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bar-hour {
          min-width: 60px;
          text-align: right;
          margin-right: 10px;
        }
      `}</style>
    </Card>
  );
};

export default Eclairage;

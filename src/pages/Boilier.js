import React, { useState, useEffect, useRef } from 'react';
import ChartistGraph from 'react-chartist';
import 'chartist/dist/chartist.css';
import 'chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.css';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap
import 'animate.css/animate.min.css'; // Importer Animate.css

const Boilier = () => {
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
      const response = await fetch(`http://20.123.48.27:8080/boil/data/energy/hourly?date=${selectedDate}`);
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
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const fetchPreviousData = async (selectedDate) => {
    try {
      const previousDate = new Date(selectedDate);
      previousDate.setDate(previousDate.getDate() - 1);
      const previousDateString = previousDate.toISOString().split('T')[0];

      const response = await fetch(`http://20.123.48.27:8080/boil/data/energy/hourly?date=${previousDateString}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Filtrer les données pour ne garder que les heures entre 18h et 23h59
      const newData = data.filter(item => {
        const hour = parseInt(item.hour.split(':')[0], 10);
        return hour >= 18 || hour === 0;
      }).map(item => {
        const { hour, consumption } = item;
        return { hour, consumption };
      });

      setDonneesPrecedentes(newData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données précédentes:', error);
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

  // Transformer les données en un format utilisable par Chartist
  const labels = donneesLocales.map(item => item.hour.split(' ')[1]); // Extrait l'heure
  const previousLabels = donneesPrecedentes.map(item => item.hour.split(' ')[1]); // Extrait l'heure pour les données précédentes

  // Assurez-vous que les labels de consommation précédente sont alignés avec les labels actuels
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
        return value.split(':')[0] + 'h';  // Pour afficher les heures
      }
    },
    axisY: {
      labelInterpolationFnc: function(value) {
        return value + ' Wh';  // Ajouter les unités Wh
      }
    },
    plugins: [
      ChartistTooltip({
        appendToBody: true,
        transformTooltipTextFnc: function (value) {
          return `${value} Wh`;
        }
      })
    ],
  };

  return (
    <div className="container">
      <h1 className="text-center my-4 animate__animated animate__fadeInDown">Consommation Journalière du Boilier</h1>
      <div className="mb-4 text-center">
        <button className="btn btn-primary mx-2" onClick={() => changeDate(-1)}>&lt; Jour précédent</button>
        <input
          ref={dateInputRef}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control d-inline-block text-center"
          style={{ maxWidth: '200px' }}
        />
        <button className="btn btn-primary mx-2" onClick={() => changeDate(1)}>Jour suivant &gt;</button>
      </div>
      <div className="mb-4 animate__animated animate__fadeIn">
        <ChartistGraph 
          data={data} 
          options={options} 
          type="Bar" // Changer le type de graphique à "Bar"
          className="ct-double-octave chart"
        />
      </div>
      <div className="d-flex justify-content-center my-3">
        <div className="d-flex align-items-center mx-3">
          <div style={{ width: '20px', height: '20px', backgroundColor: '#006400', marginRight: '10px' }}></div>
          <span>Consommation précédente</span>
        </div>
        <div className="d-flex align-items-center mx-3">
          <div style={{ width: '20px', height: '20px', backgroundColor: '#00008B', marginRight: '10px' }}></div>
          <span>Consommation actuelle</span>
        </div>
      </div>
    </div>
  );
};

export default Boilier;

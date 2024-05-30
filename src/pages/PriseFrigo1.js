import React, { useState, useEffect, useRef } from 'react';
import ChartistGraph from 'react-chartist';
import 'chartist/dist/chartist.css';
import 'chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.css';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap
import 'animate.css/animate.min.css'; // Importer Animate.css
import './DataPrise.css'; // Fichier CSS pour les styles personnalisés

const DataPrise = () => {
  // Initialiser la date par défaut à la date actuelle
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
      const response = await fetch(`http://localhost:8080/data/energy/hourly?date=${selectedDate}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Debug: Affichez les données brutes reçues de l'API
      console.log('Données brutes reçues de l\'API:', data);

      // Transformez les données reçues en format pour Chartist et calculer la consommation totale
      let total = 0;
      const newData = data.map(item => {
        const { hour, consumption } = item;
        total += consumption;
        return {
          hour,
          consumption
        };
      });

      // Définir la consommation totale
      setTotalConsommation(total);

      // Debug: Affichez les données transformées et la consommation totale
      console.log('Données transformées:', newData);
      console.log('Consommation totale:', total);

      setDonneesLocales(newData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  useEffect(() => {
    fetchData(date);
    const intervalId = setInterval(() => fetchData(date), 60000); // 60000ms = 1 minute
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
  const series = [donneesLocales.map(item => item.consumption)];

  // Debug: Affichez les labels et les séries
  console.log('Labels pour Chartist:', labels);
  console.log('Séries pour Chartist:', series);

  const data = {
    labels: labels,
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
    ]
  };

  return (
    <div className="container">
      <h1 className="text-center my-4 animate__animated animate__fadeInDown">Consommation Journalier prise frigo 1</h1>
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
          type="Line"
          className="ct-series-g ct-double-octave chart"
        />
      </div>
      <table className="table table-striped text-center animate__animated animate__fadeInUp">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Heure</th>
            <th scope="col">Consommation (Wh)</th>
          </tr>
        </thead>
        <tbody>
          {donneesLocales.map((item, index) => (
            <tr key={index}>
              <td>{item.hour.split(' ')[1]}</td>
              <td>{item.consumption} Wh</td>
            </tr>
          ))}
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>{totalConsommation} Wh</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DataPrise;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import ChartistGraph from 'react-chartist';
import 'chartist/dist/chartist.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faPlug, faBurn, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import CounterWidget from './CounterWidget';
import SalesValueWidget from './SalesValueWidget';

const Dashboard = () => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getCurrentYearMonth = () => {
    const today = new Date();
    return today.toISOString().slice(0, 7); // "YYYY-MM"
  };

  const [date, setDate] = useState(getCurrentDate());
  const [yearMonth, setYearMonth] = useState(getCurrentYearMonth());
  const [totalConsumptionByHour, setTotalConsumptionByHour] = useState([]);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [componentConsumption, setComponentConsumption] = useState({ eclai: 0, prise: 0, boilier: 0 });
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  const fetchDataEclai = async (date) => {
    try {
      const response = await fetch(`http://20.123.48.27:8080/eclai/data/eclai/energy/hourly?date=${date}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.map(item => ({ hour: item.hour, consumption: item.consumption }));
    } catch (error) {
      console.error('Erreur lors de la récupération des données d\'éclairage:', error);
      return [];
    }
  };

  const fetchDataPrise = async (date) => {
    try {
      const response = await fetch(`http://20.123.48.27:8080/data/energy/hourly?date=${date}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.map(item => ({ hour: item.hour, consumption: item.consumption }));
    } catch (error) {
      console.error('Erreur lors de la récupération des données de la prise:', error);
      return [];
    }
  };

  const fetchDataBoilier = async (date) => {
    try {
      const response = await fetch(`http://20.123.48.27:8080/boil/data/energy/hourly?date=${date}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.map(item => ({ hour: item.hour, consumption: item.consumption }));
    } catch (error) {
      console.error('Erreur lors de la récupération des données du boilier:', error);
      return [];
    }
  };

  const calculateTotalConsumption = async (selectedDate) => {
    try {
      const [eclaiData, priseData, boilierData] = await Promise.all([
        fetchDataEclai(selectedDate),
        fetchDataPrise(selectedDate),
        fetchDataBoilier(selectedDate)
      ]);

      const eclaiTotal = eclaiData.reduce((sum, item) => sum + item.consumption, 0) / 1000; // Convertir Wh en kWh
      const priseTotal = priseData.reduce((sum, item) => sum + item.consumption, 0) / 1000; // Convertir Wh en kWh
      const boilierTotal = boilierData.reduce((sum, item) => sum + item.consumption, 0) / 1000; // Convertir Wh en kWh

      const allData = [...eclaiData, ...priseData, ...boilierData];
      const hourlyConsumption = {};

      allData.forEach(item => {
        if (hourlyConsumption[item.hour]) {
          hourlyConsumption[item.hour] += item.consumption;
        } else {
          hourlyConsumption[item.hour] = item.consumption;
        }
      });

      const totalConsumptionByHour = Object.keys(hourlyConsumption).map(hour => ({
        hour,
        consumption: hourlyConsumption[hour] / 1000 // Convertir Wh en kWh
      })).sort((a, b) => new Date(`1970-01-01T${a.hour}:00Z`) - new Date(`1970-01-01T${b.hour}:00Z`));

      const total = eclaiTotal + priseTotal + boilierTotal;

      setTotalConsumptionByHour(totalConsumptionByHour);
      setTotalConsumption(total);
      setComponentConsumption({
        eclai: eclaiTotal,
        prise: priseTotal,
        boilier: boilierTotal
      });
    } catch (error) {
      console.error('Erreur lors du calcul de la consommation totale:', error);
    }
  };

  const calculateMonthlyTotalConsumption = async (yearMonth) => {
    try {
      const startDate = new Date(yearMonth + '-01');
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1);

      let total = 0;
      let eclaiTotal = 0;
      let priseTotal = 0;
      let boilierTotal = 0;

      for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
        const currentDate = d.toISOString().split('T')[0];
        const [eclaiData, priseData, boilierData] = await Promise.all([
          fetchDataEclai(currentDate),
          fetchDataPrise(currentDate),
          fetchDataBoilier(currentDate)
        ]);

        const dailyEclaiTotal = eclaiData.reduce((sum, item) => sum + item.consumption, 0) / 1000;
        const dailyPriseTotal = priseData.reduce((sum, item) => sum + item.consumption, 0) / 1000;
        const dailyBoilierTotal = boilierData.reduce((sum, item) => sum + item.consumption, 0) / 1000;

        eclaiTotal += dailyEclaiTotal;
        priseTotal += dailyPriseTotal;
        boilierTotal += dailyBoilierTotal;
        total += dailyEclaiTotal + dailyPriseTotal + dailyBoilierTotal;
      }

      setMonthlyTotal(total);
      setComponentConsumption({
        eclai: eclaiTotal,
        prise: priseTotal,
        boilier: boilierTotal
      });
    } catch (error) {
      console.error('Erreur lors du calcul de la consommation mensuelle totale:', error);
    }
  };

  useEffect(() => {
    // Effect to calculate and update data initially
    calculateTotalConsumption(date);
    calculateMonthlyTotalConsumption(yearMonth);

    // Set interval to update data every 1 minute
    const interval = setInterval(() => {
      calculateTotalConsumption(date);
      calculateMonthlyTotalConsumption(yearMonth);
    }, 60000); // 60000 milliseconds = 1 minute

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [date, yearMonth]); // Dependency array ensures effect runs on mount and when date or yearMonth changes

  const changeDate = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate.toISOString().split('T')[0]);
  };

  const changeMonth = (months) => {
    const newYearMonth = new Date(yearMonth + '-01');
    newYearMonth.setMonth(newYearMonth.getMonth() + months);
    setYearMonth(newYearMonth.toISOString().slice(0, 7));
  };

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(totalConsumptionByHour.length / itemsPerPage);
  const paginatedData = totalConsumptionByHour.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const chartData = {
    labels: totalConsumptionByHour.map(item => item.hour),
    series: [totalConsumptionByHour.map(item => item.consumption)]
  };

  const chartOptions = {
    low: 0,
    showArea: true,
    axisX: {
      labelInterpolationFnc: value => value.split(':')[0] + 'h'
    },
    plugins: [
      ChartistTooltip({
        appendToBody: true,
        transformTooltipTextFnc: value => `${value} kWh`
      })
    ]
  };

  const calculatePercentage = (componentTotal) => {
    return monthlyTotal > 0 ? (componentTotal / monthlyTotal) * 100 : 0;
  };

  const getMonthName = (yearMonth) => {
    const date = new Date(yearMonth + '-01');
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <Container className="mt-4">
      <Row className="my-4">
        <Col className="text-center">
          <h2 className="animate__animated animate__fadeInDown">Consommation Totale du Mois (kWh)</h2>
          <Button className="mx-2" onClick={() => changeMonth(-1)}> Mois précédent</Button>
          <Button className="mx-2" onClick={() => changeMonth(1)}>Mois suivant </Button>
          <div><h2>{getMonthName(yearMonth)} : {monthlyTotal.toFixed(3)} kWh</h2> </div>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Éclairage"
            title={`${componentConsumption.eclai.toFixed(3)} kWh`}
            percentage={calculatePercentage(componentConsumption.eclai).toFixed(2)}
            icon={faLightbulb}
            iconColor="secondary"
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Prise"
            title={`${componentConsumption.prise.toFixed(3)} kWh`}
            percentage={calculatePercentage(componentConsumption.prise).toFixed(2)}
            icon={faPlug}
            iconColor="tertiary"
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Boiler"
            title={`${componentConsumption.boilier.toFixed(3)} kWh`}
            percentage={calculatePercentage(componentConsumption.boilier).toFixed(2)}
            icon={faBurn}
            iconColor="quaternary"
          />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4">
          <SalesValueWidget
            title="Consommation Totale du Mois"
            value={`${monthlyTotal.toFixed(3)} kWh`}
            percentage={100}
            icon={faCalendarAlt}
          />
        </Col>
      </Row>
      <div className="table-responsive animate__animated animate__fadeIn">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Heure</th>
              <th>Consommation (kWh)</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index}>
                <td>{item.hour}</td>
                <td>{item.consumption.toFixed(3)}</td>
              </tr>
            ))}
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>{totalConsumption.toFixed(3)} kWh</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <Card.Body className="p-2">
        <div className="container">
          <div className="mb-4 animate__animated animate__fadeIn">
            <ChartistGraph 
              data={chartData} 
              options={chartOptions} 
              type="Line"
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
      </Card.Body>
      <div className="text-center my-4 animate__animated animate__fadeInUp">
        <Button
          className="btn btn-dark mx-1"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Précédent
        </Button>
        <Button
          className="btn btn-dark mx-1"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          Suivant
        </Button>
      </div>
    </Container>
  );
};

export default Dashboard;

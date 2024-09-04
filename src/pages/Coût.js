import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import ChartistGraph from 'react-chartist';
import 'chartist/dist/chartist.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import { useTranslation } from 'react-i18next';

const Coût = () => {
  const { t } = useTranslation();

  // List of real energy providers and their prices in €/kWh
  const providers = [
    { name: 'TotalEnergies', pricePerKwh: 0.0824 },
    { name: 'Mega', pricePerKwh: 0.1027 },
    { name: 'Luminus', pricePerKwh: 0.1162 },
    { name: 'ENGIE Electrabel', pricePerKwh: 0.12125 },
    { name: 'Eneco', pricePerKwh: 0.1105 }
  ];

  const [selectedProvider, setSelectedProvider] = useState(providers[0].pricePerKwh);
  const [monthlyData, setMonthlyData] = useState([
    { month: 'Juin', consumption: 0, cost: 0 },
    { month: 'Juillet', consumption: 0, cost: 0 },
    { month: 'Août', consumption: 0, cost: 0 },
  ]);

  // Fonction de gestion de la sélection du fournisseur
  const handleProviderChange = (event) => {
    const selectedPrice = parseFloat(event.target.value);
    setSelectedProvider(selectedPrice);
  };

  const fetchDailyData = async (date, apiUrl) => {
    try {
      const response = await fetch(apiUrl.replace('${date}', date));
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.reduce((sum, item) => sum + item.consumption, 0) / 1000; // Convert Wh to kWh
    } catch (error) {
      console.error(`Error fetching data for ${date}:`, error);
      return 0;
    }
  };

  const calculateMonthlyConsumption = async (yearMonth) => {
    const daysInMonth = new Date(yearMonth.getFullYear(), yearMonth.getMonth() + 1, 0).getDate();
    let totalConsumption = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${yearMonth.getFullYear()}-${String(yearMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const boilierData = await fetchDailyData(date, `http://20.123.48.27:8080/boil/data/energy/hourly?date=${date}`);
      const priseData = await fetchDailyData(date, `http://20.123.48.27:8080/data/energy/hourly?date=${date}`);
      const eclaiData = await fetchDailyData(date, `http://20.123.48.27:8080/eclai/data/eclai/energy/hourly?date=${date}`);
      
      totalConsumption += boilierData + priseData + eclaiData;
    }

    return totalConsumption;
  };

  const fetchAllMonthlyData = async () => {
    const yearMonths = [
      { month: 'Juin', date: new Date(2024, 5, 1) },
      { month: 'Juillet', date: new Date(2024, 6, 1) },
      { month: 'Août', date: new Date(2024, 7, 1) },
    ];

    const monthlyDataPromises = yearMonths.map(async (monthData) => {
      const consumption = await calculateMonthlyConsumption(monthData.date);
      const cost = consumption * selectedProvider;
      return {
        month: monthData.month,
        consumption,
        cost,
      };
    });

    const allMonthlyData = await Promise.all(monthlyDataPromises);
    setMonthlyData(allMonthlyData);
  };

  useEffect(() => {
    fetchAllMonthlyData();
  }, [selectedProvider]);

  // Preparing data for the chart
  const chartData = {
    labels: monthlyData.map(data => data.month),
    series: [monthlyData.map(data => data.cost)]
  };

  const chartOptions = {
    low: 0,
    showArea: true,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return value.substring(0, 3); // Affiche les 3 premières lettres de chaque mois
      },
      showGrid: false // Supprime les lignes de grille supplémentaires
    },
    fullWidth: true,
    plugins: [
      ChartistTooltip({
        appendToBody: true,
        transformTooltipTextFnc: (value, meta) => `${meta}: ${value} €`, // Tooltip formatting
      })
    ]
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4">
          <div className="widget bg-warning text-white shadow-sm rounded p-4">
            <h2 className="animate__animated animate__fadeInDown text-center">
              {t('Consommation Mensuelle')}
            </h2>
            <div className="text-center my-3">
              <h3>{t('Consommation totale par mois avec coût selon le fournisseur')}:</h3>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4">
          <Form.Group controlId="providerSelect">
            <Form.Label>{t('Sélectionnez votre fournisseur d\'énergie')}</Form.Label>
            <Form.Control as="select" onChange={handleProviderChange}>
              {providers.map((provider, index) => (
                <option key={index} value={provider.pricePerKwh}>
                  {provider.name} - {provider.pricePerKwh.toFixed(4)} €/kWh
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {monthlyData.map((data, index) => (
          <Col xs={12} sm={6} xl={4} className="mb-4" key={index}>
            <Card className={`bg-${index % 2 === 0 ? 'primary' : 'success'} text-white shadow-sm`}>
              <Card.Body>
                <Card.Title className="text-center">{t('Mois')}: {data.month}</Card.Title>
                <Card.Text className="text-center">
                  {t('Consommation')} : {data.consumption.toFixed(3)} kWh
                </Card.Text>
                <Card.Text className="text-center">
                  {t('Coût')} : {data.cost.toFixed(2)} €
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4">
          <div className="widget bg-info text-white shadow-sm rounded p-4">
            <h2 className="animate__animated animate__fadeInDown text-center">
              {t('Graphique des coûts mensuels')}
            </h2>
            <div className="chart-container my-3">
              <ChartistGraph
                data={chartData}
                options={chartOptions}
                type="Line"
                className="ct-double-octave chart"
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Coût;

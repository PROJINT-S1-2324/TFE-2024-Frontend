import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Button } from 'react-bootstrap';

const TabEclairage = () => {
  const { t } = useTranslation();
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [donneesLocales, setDonneesLocales] = useState([]);
  const [totalConsommation, setTotalConsommation] = useState(0);
  const [date, setDate] = useState(getCurrentDate());
  const [currentPage, setCurrentPage] = useState(0);
  const dateInputRef = useRef(null);

  const fetchData = async (selectedDate) => {
    if (!navigator.onLine) {
      const localData = localStorage.getItem(`eclairageData-${selectedDate}`);
      const localTotal = localStorage.getItem(`eclairageTotal-${selectedDate}`);
      if (localData && localTotal) {
        setDonneesLocales(JSON.parse(localData));
        setTotalConsommation(parseInt(localTotal, 10));
        return;
      }
    }

    try {
      const response = await fetch(`http://20.123.48.27:8080/eclai/data/eclai/energy/hourly?date=${selectedDate}`);
      if (!response.ok) {
        throw new Error(t('networkError'));
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
      setCurrentPage(0);

      localStorage.setItem(`eclairageData-${selectedDate}`, JSON.stringify(newData));
      localStorage.setItem(`eclairageTotal-${selectedDate}`, total.toString());
    } catch (error) {
      console.error(t('errorFetchingData'), error);
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

  const itemsPerPage = 8;
  const totalPages = Math.ceil(donneesLocales.length / itemsPerPage);

  const paginatedData = donneesLocales.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="container">
      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4">
          <div className="widget bg-primary text-white shadow-sm rounded p-4">
            <h1 className="text-center my-4 animate__animated animate__fadeInDown">{t('dailyConsumption')}</h1>
            <div className="mb-4 text-center animate__animated animate__fadeIn">
              <button className="btn btn-light mx-2" onClick={() => changeDate(-1)}>
                &lt; {t('previousDay')}
              </button>
              <input
                ref={dateInputRef}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-control d-inline-block text-center"
                style={{ maxWidth: '200px' }}
              />
              <button className="btn btn-light mx-2" onClick={() => changeDate(1)}>
                {t('nextDay')} &gt;
              </button>
            </div>
          </div>
        </Col>
      </Row>
      
      <div className="table-responsive animate__animated animate__fadeIn">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>{t('hour')}</th>
              <th>{t('consumptionWh')}</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index}>
                <td>{item.hour}</td>
                <td>{item.consumption}</td>
              </tr>
            ))}
            <tr>
              <td><strong>{t('total')}</strong></td>
              <td><strong>{totalConsommation} Wh</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center my-4 animate__animated animate__fadeInUp">
        <button
          className="btn btn-dark mx-1"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          {t('previous')}
        </button>
        <button
          className="btn btn-dark mx-1"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
};

export default TabEclairage;

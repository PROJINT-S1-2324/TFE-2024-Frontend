import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TabPrise = () => {
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
    try {
      const response = await fetch(`http://localhost:8080/data/energy/hourly?date=${selectedDate}`);
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
      setCurrentPage(0); // Reset to the first page whenever data is fetched
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
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

  const itemsPerPage = 8; // Number of items per page
  const totalPages = Math.ceil(donneesLocales.length / itemsPerPage);

  const paginatedData = donneesLocales.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="container">
      <h1 className="text-center my-4">Consommation Journalier</h1>
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
      
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Heure</th>
              <th>Consommation (Wh)</th>
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
              <td><strong>Total</strong></td>
              <td><strong>{totalConsommation} Wh</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center my-4">
        <button
          className="btn btn-dark mx-1"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Précédent
        </button>
        <button
          className="btn btn-dark mx-1"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default TabPrise;
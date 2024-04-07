import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
const Dashboard = () => {
    const [data, setData] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        // Effectue une requête à l'API pour récupérer les données du dashboard
        const fetchData = async () => {
            try {
                const response = await fetch('https://example.com/api/dashboard');
                if (!response.ok) {
                    throw new Error('Failed to fetch dashboard data');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            
            <h1>{t('hello')}</h1>
      <p>{t('welcome')}</p>
        </div>
    );
};

export default Dashboard;
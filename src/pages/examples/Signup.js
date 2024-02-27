import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from "../../routes";

const Logout = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory(); // Initialisation de la fonction history

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const authToken = localStorage.getItem('token');
                if (!authToken) {
                    throw new Error('No token found in localStorage');
                }

                const response = await fetch('https://report.iotfactory.eu/login/{redirect*}', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Session ${authToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to logout');
                }
                // Redirection vers la page Signin après la déconnexion réussie
                history.push(Routes.Signin.path);

                 localStorage.removeItem('token');
                console.log('User logged out successfully');
                console.log('token');
                
            } catch (error) {
                console.error('Logout error:', error);
                setErrorMessage('Failed to logout. Please try again.');
            }
        };

        handleLogout(); // Appeler handleLogout dès que le composant est monté
    }, []); // Le tableau vide des dépendances signifie que cela ne se déclenchera qu'une fois

    return (
        <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default Logout;
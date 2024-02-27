import React, { useState, useEffect } from 'react';
import { Row, Button, Pagination } from '@themesberg/react-bootstrap';

const Assets = () => {
    const [token, setToken] = useState('');
    const [assets, setAssets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [assetsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        // Récupérer le token d'authentification depuis le local storage
        const authToken = localStorage.getItem('token');
        if (authToken) {
            // Définir le token dans l'état local
            setToken(authToken);
        }
    }, []);

    const getAssets = async () => {
        try {
            // Envoyer une requête à l'API pour obtenir les actifs
            const response = await fetch('https://staging.iotfactory.eu/api/assets?fields=name', {
                method: 'GET',
                headers: {
                    'Authorization': `Session ${token}` // Utiliser le token dans l'en-tête de la requête
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch assets');
            }

            const data = await response.json();
            // Mettre à jour les actifs avec les données reçues de l'API
            setAssets(data.data);
            // Calculer le nombre total de pages pour la pagination
            const pages = Math.ceil(data.data.length / assetsPerPage);
            setTotalPages(pages);
        } catch (error) {
            console.error('Error fetching assets:', error);
        }
    };

    useEffect(() => {
        // Charger les actifs lors du montage du composant
        getAssets();
    }, [token]); // Réexécuter l'effet lorsque le token change

    // Logique de pagination
    const indexOfLastAsset = currentPage * assetsPerPage;
    const indexOfFirstAsset = indexOfLastAsset - assetsPerPage;
    const currentAssets = assets.slice(indexOfFirstAsset, indexOfLastAsset);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Row className="justify-content-between align-items-center py-4">
                {/* Utiliser un bouton pour charger les actifs */}
                {/* Note: Le chargement des actifs se fait automatiquement lors du montage du composant */}
                {/* <Button onClick={getAssets}>Load Assets</Button> */}
            </Row>

            <ul>
                {currentAssets.map(asset => (
                    <li key={asset._id}>{asset.name}</li>
                ))}
            </ul>

            <Pagination>
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
            </Pagination>
        </div>
    );
};

export default Assets;
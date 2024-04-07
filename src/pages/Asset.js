import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination } from '@themesberg/react-bootstrap';
import { useTranslation } from 'react-i18next';

const Assets = () => {
    const [token, setToken] = useState('');
    const [assets, setAssets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [assetsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const { t } = useTranslation();
    const [selectedAsset, setSelectedAsset] = useState(null); // État pour stocker l'asset sélectionné

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
            const response = await fetch('https://staging.iotfactory.eu/api/assets', {
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

    const handleClick = (asset) => {
        // Si l'asset sélectionné est le même que celui déjà sélectionné, le désélectionner
        if (selectedAsset && selectedAsset._id === asset._id) {
            setSelectedAsset(null);
        } else {
            setSelectedAsset(asset); // Mettre à jour l'asset sélectionné
        }
    };

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{t('Id')}</th>
                        <th>{t('Name')}</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAssets.map((asset, index) => (
                        <React.Fragment key={index}>
                            <tr onClick={() => handleClick(asset)}>
                                <td>{asset._id}</td>
                                <td>{asset.name}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
            </Pagination>

            {selectedAsset && (
                <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px', width: '200px', textAlign: 'center' }}>
                    <p>Status: {selectedAsset.status}</p>
                    <p>Created At: {selectedAsset.createdAt}</p>
                </div>
            )}
        </div>
    );
};

export default Assets;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';

import reactMockup from '../assets/img/shelly1.jpg'; // Première image
import secondMockup from '../assets/img/Shelly2.jpg'; // Deuxième image

const Assets = () => {
    const [deviceInfo1, setDeviceInfo1] = useState(null);
    const [deviceInfo2, setDeviceInfo2] = useState(null);
    const [currentImage, setCurrentImage] = useState(0); // État pour gérer l'image actuelle

    // Fonction pour récupérer les informations du premier appareil depuis l'API
    const fetchDeviceInfo1 = async () => {
        try {
            const response = await fetch('https://shelly-106-eu.shelly.cloud/device/status/?id=543204508608&auth_key=MjRiNjYwdWlk571844EF8698B132529C85123EF715DC4F355B8BFD47E4FDB6A2BF53A0B5614E61544A67E40B906D');
            const data = await response.json();
            console.log('API response 1:', data); // Log la réponse de l'API
            if (data.isok) {
                setDeviceInfo1(data.data);
                localStorage.setItem('deviceInfo1', JSON.stringify(data.data)); // Stocker les données dans localStorage
            } else {
                console.error('Failed to fetch device info 1');
            }
        } catch (error) {
            console.error('Error fetching device info 1:', error);
        }
    };

    // Fonction pour récupérer les informations du deuxième appareil depuis l'API
    const fetchDeviceInfo2 = async () => {
        try {
            const response = await fetch('https://shelly-106-eu.shelly.cloud/device/status/?id=5432046d02fc&auth_key=MjRiNjYwdWlk571844EF8698B132529C85123EF715DC4F355B8BFD47E4FDB6A2BF53A0B5614E61544A67E40B906D');
            const data = await response.json();
            console.log('API response 2:', data); // Log la réponse de l'API
            if (data.isok) {
                setDeviceInfo2(data.data);
                localStorage.setItem('deviceInfo2', JSON.stringify(data.data)); // Stocker les données dans localStorage
            } else {
                console.error('Failed to fetch device info 2');
            }
        } catch (error) {
            console.error('Error fetching device info 2:', error);
        }
    };

    useEffect(() => {
        // Charger les informations du premier appareil au démarrage
        const storedDeviceInfo1 = localStorage.getItem('deviceInfo1');
        if (storedDeviceInfo1) {
            setDeviceInfo1(JSON.parse(storedDeviceInfo1));
        } else {
            fetchDeviceInfo1();
        }
    }, []);

    useEffect(() => {
        // Charger les informations du deuxième appareil lorsque l'image change
        if (currentImage === 1) {
            const storedDeviceInfo2 = localStorage.getItem('deviceInfo2');
            if (storedDeviceInfo2) {
                setDeviceInfo2(JSON.parse(storedDeviceInfo2));
            } else {
                fetchDeviceInfo2();
            }
        }
    }, [currentImage]);

    // Fonction pour convertir l'uptime de secondes en un format plus lisible
    const formatUptime = (uptime) => {
        const days = Math.floor(uptime / (24 * 3600));
        const hours = Math.floor((uptime % (24 * 3600)) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    // Fonction pour basculer entre les images
    const handleNext = () => {
        setCurrentImage((prevImage) => (prevImage === 0 ? 1 : 0));
    };

    const handlePrev = () => {
        setCurrentImage((prevImage) => (prevImage === 1 ? 0 : 1));
    };

    return (
        <Container fluid className="py-4">
            <Row className="justify-content-center align-items-center">
                <Col xs={12} lg={6} className="text-center mb-4">
                    <Image src={currentImage === 0 ? reactMockup : secondMockup} fluid style={{ maxWidth: '100%', height: 'auto' }} />
                </Col>
                <Col xs={12} lg={6}>
                    <Card border="light" className="bg-white shadow-sm mb-4">
                        <Card.Body>
                            {currentImage === 0 && deviceInfo1 && (
                                <div>
                                    <p><strong>Id: </strong>{deviceInfo1.device_status.id}</p>
                                    <p><strong>Status: </strong>{deviceInfo1.online ? 'Online' : 'Offline'}</p>
                                    <p><strong>MAC Address: </strong>{deviceInfo1.device_status.sys.mac}</p>
                                    <p><strong>IP Address: </strong>{deviceInfo1.device_status.wifi.sta_ip}</p>
                                    <p><strong>SSID: </strong>{deviceInfo1.device_status.wifi.ssid}</p>
                                    <p><strong>Signal Strength (RSSI): </strong>{deviceInfo1.device_status.wifi.rssi}</p>
                                    <p><strong>Uptime: </strong>{formatUptime(deviceInfo1.device_status.sys.uptime)}</p>
                                    <p><strong>Firmware Version: </strong>{deviceInfo1.device_status.sys.available_updates.stable.version}</p>
                                </div>
                            )}
                            {currentImage === 1 && deviceInfo2 && (
                                <div>
                                    <p><strong>Id: </strong>{deviceInfo2.device_status.id}</p>
                                    <p><strong>Status: </strong>{deviceInfo2.online ? 'Online' : 'Offline'}</p>
                                    <p><strong>MAC Address: </strong>{deviceInfo2.device_status.sys.mac}</p>
                                    <p><strong>IP Address: </strong>{deviceInfo2.device_status.wifi.sta_ip}</p>
                                    <p><strong>SSID: </strong>{deviceInfo2.device_status.wifi.ssid}</p>
                                    <p><strong>Signal Strength (RSSI): </strong>{deviceInfo2.device_status.wifi.rssi}</p>
                                    <p><strong>Uptime: </strong>{formatUptime(deviceInfo2.device_status.sys.uptime)}</p>
                                    <p><strong>Firmware Version: </strong>{deviceInfo2.device_status.sys.available_updates.stable.version}</p>
                                </div>
                            )}
                            {((currentImage === 0 && !deviceInfo1) || (currentImage === 1 && !deviceInfo2)) && (
                                <p>Chargement des informations de l'appareil...</p>
                            )}
                        </Card.Body>
                    </Card>
                    <div className="text-center">
                        <Button variant="info" onClick={handlePrev} className="me-2">Précédent</Button>
                        <Button variant="info" onClick={handleNext}>Suivant</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Assets;

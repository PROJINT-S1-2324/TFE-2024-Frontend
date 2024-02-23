import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';


const User = () => {
    const location = useLocation();
    const [userData, setUserData] = useState({
        lastName: '',
        firstName: '',
        email: '',
        role: '',
        language: '',
        locale: '',
        status: ''
    });
    const [editing, setEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showUserData, setShowUserData] = useState(true); // Afficher les données de l'utilisateur par défaut

    useEffect(() => {
        setUserData({
            lastName: localStorage.getItem('lastName'),
            firstName: localStorage.getItem('firstName'),
            email: localStorage.getItem('email'),
            role: localStorage.getItem('role'),
            language: localStorage.getItem('language'),
            locale: localStorage.getItem('locale'),
            status: localStorage.getItem('status')
        });
    }, [location]);

    const handleSave = async () => {
        try {
            const authToken = localStorage.getItem('token');
            if (!authToken) {
                throw new Error('No token found in localStorage');
            }

            const response = await fetch('https://staging.iotfactory.eu/api/users/65c3616b56fe3b00181769b3', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Session ${authToken}`
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Failed to save user data');
            }

            setEditing(false);
            setErrorMessage('');
        } catch (error) {
            console.error('Error saving user data:', error);
            setErrorMessage('Failed to save user data. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const toggleEditing = () => {
        setEditing(!editing);
    };



    return (
        <div>

            {/* Supprimer le bouton de toggle pour afficher les données */}
            <div style={{ display: showUserData ? 'block' : 'none' }}>
                <h2>Informations de l'utilisateur</h2>
                <div>
                    <label>Prénom: </label>
                    {editing ? (
                        <input type="text" name="firstName" value={userData.firstName} onChange={handleInputChange} />
                    ) : (
                        <span>{userData.firstName}</span>
                    )}
                </div>
                <div>
                    <label>Nom: </label>
                    {editing ? (
                        <input type="text" name="lastName" value={userData.lastName} onChange={handleInputChange} />
                    ) : (
                        <span>{userData.lastName}</span>
                    )}
                </div>
                <div>
                    <label>Email: </label>
                    {editing ? (
                        <input type="text" name="email" value={userData.email} onChange={handleInputChange} />
                    ) : (
                        <span>{userData.email}</span>
                    )}
                </div>
                <div>
                    <label>Rôle: </label>
                    {editing ? (
                        <input type="text" name="role" value={userData.role} onChange={handleInputChange} />
                    ) : (
                        <span>{userData.role}</span>
                    )}
                </div>
                <div>
                    <label>Langue: </label>
                    {editing ? (
                        <input type="text" name="language" value={userData.language} onChange={handleInputChange} />
                    ) : (
                        <span>{userData.language}</span>
                    )}
                </div>
                <div>
                    <label>Localisation: </label>
                    {editing ? (
                        <input type="text" name="locale" value={userData.locale} onChange={handleInputChange} />
                    ) : (
                        <span>{userData.locale}</span>
                    )}
                </div>
                <div>
                    <label>Status: </label>
                    {editing ? (
                        <input type="text" name="status" value={userData.status} onChange={handleInputChange} />
                    ) : (
                        <span>{userData.status}</span>
                    )}
                </div>
                {editing ? (
                    <button onClick={handleSave}>Enregistrer</button>
                ) : (
                    <button onClick={toggleEditing}>Modifier</button>
                )}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <li><Link to='/admin'>Fermer</Link></li>
            </div>
        </div>
    );
};

export default User;
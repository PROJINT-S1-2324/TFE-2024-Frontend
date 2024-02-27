import React from 'react';
import { useHistory } from "react-router-dom";
import { Routes } from "../routes";

const AuthGuard = ({ children }) => {
    const history = useHistory();

    const isLogged = () => {
        const token = localStorage.getItem('token');
        return !!token;
    };

    if (!isLogged()) {
        history.push(Routes.Presentation.path);
        return null; // Ou tout autre contenu à afficher pendant la redirection
    }

    return children;
};

export default AuthGuard;
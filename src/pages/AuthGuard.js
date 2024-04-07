import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Routes } from "../routes";

const AuthGuard = ({ children }) => {
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.push(Routes.Login.path);
        }
    }, [history]);

    return children;
};

export default AuthGuard;
//
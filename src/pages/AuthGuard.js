import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Redirect } from 'react-router-dom';
import { Routes } from "../routes";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Redirect to={Routes.Login.path} />;
};

export default AuthGuard;

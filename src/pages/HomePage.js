import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
import AuthGuard from "./AuthGuard";

// pages
import Login from "./Login";
import Asset from "./Asset";
import User from "./User";
import Signup from "./logo/Signup";
import Signin from "./logo/Signin";
import ResetPassword from "./logo/ResetPassword";
import NotFoundPage from "./logo/NotFound";
import ServerError from "./logo/ServerError";
import Dashboard from "./Dashboard";
import ChangePassWord from "./ChangePassWord";
import PriseFrigo1 from "./PriseFrigo1";


// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";



const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />
        

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
          
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <Switch>
    
    <RouteWithLoader exact path={Routes.Login.path} component={Login} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />
    
    <RouteWithSidebar exact path={Routes.PriseFrigo1.path} component={PriseFrigo1} />
    <RouteWithSidebar exact path={Routes.Dashboard.path} component={Dashboard} />
    <RouteWithSidebar exact path={Routes.Asset.path} component={Asset} />
    <RouteWithSidebar exact path={Routes.User.path} component={User} />
    <RouteWithSidebar exact path={Routes.ChangePassWord.path} component={ChangePassWord} />
    <AuthGuard>
     </AuthGuard>
    <Redirect to={Routes.NotFound.path} />

    
  </Switch>
);


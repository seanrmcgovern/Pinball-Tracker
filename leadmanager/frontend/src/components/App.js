import React, { Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './layout/Alerts';
import Header from './layout/Header';
import Home from './pinball/Home';
import Dashboard from './pinball/Dashboard';
import LocationForm from './pinball/LocationForm';
import Profile from './pinball/Profile';
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";

const alertOptions = {
    timeout: 3000,
    position: positions.TOP_CENTER,
    transition: transitions.FADE
};

const App  = () => {

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <Router>
                    <Fragment>
                        <Header />
                        <Alerts />
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/explore" component={Dashboard} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                                <PrivateRoute exact path="/locations" component={LocationForm} />
                                <PrivateRoute exact path="/profile" component={Profile} />
                            </Switch>
                    </Fragment>
                </Router>
            </AlertProvider>
        </Provider>
    )
};

ReactDOM.render(<App/>, document.getElementById('app'));
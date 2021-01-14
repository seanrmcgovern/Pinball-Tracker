import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './layout/Alerts';
import Header from './layout/Header';
import Dashboard from './leads/Dashboard';

const alertOptions = {
    timeout: 3000,
    position: positions.TOP_CENTER,
    transition: transitions.FADE
};

const App  = () => {
    return (
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <Fragment>
                    <Header />
                    <Alerts />
                    <div className="container">
                        <Dashboard />
                    </div>
                </Fragment>
            </AlertProvider>
        </Provider>
    )
};

ReactDOM.render(<App/>, document.getElementById('app'));
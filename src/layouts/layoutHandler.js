import React from 'react';
import Auth from '../screens/AuthPages';
import Dashboard from '../screens/DashboardPages';
import LandingPage from '../screens/LandingPage';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

function LayoutHandler() {

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" name="Landing Page" component={LandingPage}/>
                    <Route path="/auth" name="Auth Pages" component={Auth}/>
                    <Route path="/dashboard" name="Dashboard Pages" component={Dashboard} />
                    <Redirect from ="/" to="/dashboard/index"/>
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default LayoutHandler;
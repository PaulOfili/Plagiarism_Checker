import React from 'react';
import Auth from '../screens/AuthPages';
import Dashboard from '../screens/DashboardPages';
import LandingPage from '../screens/LandingPage';
import {BrowserRouter, Switch, Redirect} from 'react-router-dom';
// import { auth, createUserDocument } from '../config/Firebase/firebase';
import AuthorizedRoute from '../utilities/AuthorizedRoute';
import GuardRoute from '../utilities/GuardRoute';

function LayoutHandler() {

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <GuardRoute exact path="/" name="Landing Page" component={LandingPage}/>
                    <GuardRoute path="/auth" name="Auth Pages" component={Auth}/>
                    <AuthorizedRoute path="/dashboard" name="Dashboard Pages" component={Dashboard} />
                    <Redirect from ="/" to="/dashboard/index"/>
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default LayoutHandler;
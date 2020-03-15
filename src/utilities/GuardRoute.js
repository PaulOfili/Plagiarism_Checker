import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';


function GuardRoute({component: Component, ...props}) {

    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
    
    return (
        <Route {...props} render={ () => (
            !isLoggedIn
            ? <Component />
            : <Redirect to='/dashboard' />
        )}/>
    )
}

export default GuardRoute;
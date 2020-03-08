import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';


function AuthorizedComponent({component: Component, ...props}) {

    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
    return (
        <Route {...props} render={ (prop) => (
            isLoggedIn
            ? <Component />
            : <Redirect to='/' />
        )}/>
    )
}

export default AuthorizedComponent;
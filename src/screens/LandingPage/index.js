import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import { loginUser, logoutUser } from '../../store/actions/auth';
import { showToast } from '../../store/actions/toast';
import history from '../../utilities/history';
import PropTypes from 'prop-types';
import LandingHeader from '../../layouts/LayoutComponents/Header/LandingHeader';
// import AuthNavbar from '../../layouts/LayoutComponents/Navbar/AuthNavbar';

function LandingPage({location}) {
    
    //Redux store selector
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

    //Dispatch actions
    const actionDispatch = useDispatch();
    const loginUserDispatch = useCallback((data) => actionDispatch(loginUser(data)), [actionDispatch]);
    const logoutUserDispatch = useCallback(() => actionDispatch(logoutUser()), [actionDispatch]);
    const showToastDispatch = useCallback((options) => actionDispatch(showToast(options)), [actionDispatch]);

    //React lifecycles methods
    useEffect(() => {
        if (location && location.search) {
            const stringAfterQuery = location.search;
            const parsedQuery = queryString.parse(stringAfterQuery)
            if (parsedQuery.message === "Logout successful") {
                // removeCookieData();
                logoutUserDispatch();
            }
        }
    }, [location, loginUserDispatch, logoutUserDispatch, showToastDispatch])

    return (
        <>    
            <LandingHeader />
        </>
    )
}

LandingPage.propTypes = {
    location: PropTypes.object
}

export default LandingPage;
import React from 'react';
import PropTypes from 'prop-types';
import LandingHeader from '../../layouts/LayoutComponents/Header/LandingHeader';

function LandingPage() {

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
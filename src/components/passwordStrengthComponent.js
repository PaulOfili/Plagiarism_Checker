import React from 'react';
import PropTypes from 'prop-types';

function PasswordStrengthComponent({password, passwordStrength}) {

    const strengthClass = ['strength-meter mt-2', password.length > 0 ? 'visible' : 'invisible'].join(' ').trim();
    return (
        <div className="text-muted font-italic mt-2">
            <small>
                Password strength
                <div className={strengthClass}>
                    <div className="strength-meter-fill" data-strength={passwordStrength}></div>                
                </div>
            </small>
        </div>
    )
}

PasswordStrengthComponent.propTypes = {
    passwordStrength: PropTypes.number,
    password: PropTypes.string
}

export default PasswordStrengthComponent;
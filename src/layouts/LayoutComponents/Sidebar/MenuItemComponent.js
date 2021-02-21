import React from 'react';
import { Row } from 'simple-flexbox';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


function MenuItemComponent({ active, icon_type, url, title, ...otherProps }) {
    return (
        <Link to={`/dashboard/${url}`}>
            <Row className={`menu-item__container ${active && "menu-item__active-container"}`} vertical="center" {...otherProps}>
                {active && <div className="menu-item__active-bar"></div>}
                <Icon type={icon_type} fill={active ? "#DDE2FF" : "false"} theme={active && 'filled'} opacity={!active ? "0.4" : "false"} style={{fontSize: '1.2rem', color: 'white'}}/>
                <span className={`memu-item__title ${active && "menu-item__active-title"}`}>{title}</span>
            </Row>
        </Link>
    );
}

MenuItemComponent.propTypes = {
    active: PropTypes.bool.isRequired,
    icon_type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default MenuItemComponent;
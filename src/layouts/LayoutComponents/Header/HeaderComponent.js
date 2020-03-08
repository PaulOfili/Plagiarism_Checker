import React from 'react';
import { Row } from 'simple-flexbox';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const menu = (
    <Menu>
        <Menu.Item key="0">
           Hi There
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
        <Link to="/" className="text-white"> 
            <Button
            color="info"
            >
                Sign Out
            </Button>
        </Link>
        </Menu.Item>
    </Menu>
)

function HeaderComponent({ title, isLoggedIn, ...otherProps}) {
    return (
        <Row className="header-container" vertical="center" horizontal="space-between" {...otherProps}>
            <span className="header-title">{title}</span>
            <Row vertical="center">
                <div className="header__separator"></div>
                <Dropdown overlay={menu}>
                    <Row vertical="center" className="header__profile cursor-pointer">
                        <span>Paul Ofili</span>
                        <Icon type="user" style={{fontSize: '1.5rem', marginLeft: '1rem'}}/>
                    </Row>
                </Dropdown>
            </Row>
        </Row>
    )
}

HeaderComponent.propTypes = {
    title: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool,
}
export default HeaderComponent;
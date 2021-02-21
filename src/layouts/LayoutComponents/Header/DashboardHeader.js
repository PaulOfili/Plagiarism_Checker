import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'simple-flexbox';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon, message } from 'antd';
import { Button } from 'reactstrap';
import { auth } from '../../../config/Firebase/firebase';
import { logoutUser } from '../../../store/actions/auth';



function DashboardHeader({ title, isLoggedIn, ...otherProps}) {

    const username = useSelector((store) => store.auth.userData.firstname)
    
    const actionDispatch = useDispatch();
    const logoutUserDispatch = useCallback(() => actionDispatch(logoutUser()), [actionDispatch]);

    const logoutHandler = () => {
        auth.signOut()
        .then(() => {
            logoutUserDispatch();
        })
        .catch((error) => {
            message.error("An error happened. Please try again.");
        })
    }
    const menu = (
        <Menu>
            <Menu.Item key="0">
               Welcome back
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1">             
                <Button
                    color="info"
                    onClick={logoutHandler}
                >
                    Sign Out
                </Button>        
            </Menu.Item>
        </Menu>
    )
    return (
        <Row className="header-container" vertical="center" horizontal="space-between" {...otherProps}>
            <span className="header-title">{title}</span>
            <Row vertical="center">
                <div className="header__separator"></div>
                <Dropdown overlay={menu}>
                    <Row vertical="center" className="header__profile cursor-pointer">
                        <span>Hi {username}</span>
                        <Icon type="user" style={{fontSize: '1.5rem', marginLeft: '1rem'}}/>
                    </Row>
                </Dropdown>
            </Row>
        </Row>
    )
}

DashboardHeader.propTypes = {
    title: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool,
}
export default DashboardHeader;
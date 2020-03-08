import React, { useState} from 'react';
import { Column, Row } from 'simple-flexbox';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import SidebarComponent from '../../layouts/LayoutComponents/Sidebar/SidebarComponent';
import HeaderComponent from '../../layouts/LayoutComponents/Header/HeaderComponent';
import SearchReport from './pages/SearchReport';
import PropTypes from 'prop-types';
import all_routes from '../../config/routes';

let pathMapping = {}


for(let route of all_routes['student_routes']) {
    pathMapping[route.url] = {header: route.header_name, sidebar: route.sidebar_name, component: route.component}

}

for(let route of all_routes['lecturer_routes']) {
    pathMapping[route.url] = {header: route.header_name, sidebar: route.sidebar_name, component: route.component}
}


function Dashboard({location}) {    

    const pathNameArray = location.pathname.split('/')
    let last_entry = pathNameArray[pathNameArray.length-1]
    
    const currentElement = (pathMapping[last_entry]) ? pathMapping[last_entry] : {header: 'Overview', sidebar: 'Overview'}

    const [selectedItem, setSelectedItem] = useState(currentElement.sidebar);
    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
    

    return (
        <Row className="app-container">
            <SidebarComponent selectedItem={selectedItem} onChange={(selectedItem) => setSelectedItem(selectedItem)} />
            <Column flexGrow={1} className="app-main-block">
                <HeaderComponent title={currentElement.header} isLoggedIn={isLoggedIn}/>
                <div className="app-content">
                    <Switch>
                        {Object.keys(pathMapping).map((key, index) => (
                            <Route key={index} path={`/dashboard/${key}`} component={pathMapping[key].component} />
                        ))}
                        
                        <Redirect from="*" to="/dashboard/index" />
                    </Switch>
                </div>
            </Column>
        </Row>
    )
}

Dashboard.propTypes = {
    location: PropTypes.object.isRequired
}

export default withRouter(Dashboard);
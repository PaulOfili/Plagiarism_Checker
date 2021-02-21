import React, { useEffect } from 'react';
import { Column, Row } from 'simple-flexbox';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import SidebarComponent from '../../layouts/LayoutComponents/Sidebar/SidebarComponent';
import DashboardHeader from '../../layouts/LayoutComponents/Header/DashboardHeader';
import SimilarityResultPage from "./pages/SimilarityResultPage";
import socketIOClient from "socket.io-client";
import { notification } from  "antd"
import { updateScanResult } from "../../config/Firebase/firebase";
import PropTypes from 'prop-types';
import all_routes from '../../config/routes';

let pathMapping = {}


for(let route of all_routes['student_routes']) {
    pathMapping[route.url] = {header: route.header_name, sidebar: route.sidebar_name, component: route.component}

}

for(let route of all_routes['lecturer_routes']) {
    pathMapping[route.url] = {header: route.header_name, sidebar: route.sidebar_name, component: route.component}
}

pathMapping["results"] = {header: "Scanned Results", sidebar: null}

function Dashboard({location, history}) {   

    const userId = useSelector(store => store.auth.userData.uid);
    
    useEffect(() => {
        const socket = socketIOClient(process.env.REACT_APP_COPYLEAKS_LISTENER);
        socket.on("copyleaks", async data => {
          if(userId === data.developerPayload){
            //   TODO Remove and place this in node listener for copyleaks 
            // so that it is certain we save the result even if the user closes the web app
            try {
                await updateScanResult(data)
                notification.info({
                    message: `Scan results for submitted document ready.`,
                    description:
                        'Please click on the card to access the results.',
                    onClick: () => {
                        history.push(`/dashboard/scan/${data.scanId}/results`)
                        notification.close(data.scanId)
                    },
                    key: data.scanId,
                    className: "scan-results-notification",
                });
            } catch (error) {
                notification.error({
                    message: `Error processing document.`,
                    description:
                        'Please try again later.',
                    onClick: () => {
                        notification.close(data.scanId)
                    },
                    key: data.scanId
                });
            }
            
          }
        })
    }, [history, userId])

    const pathNameArray = location.pathname.split('/')
    let last_entry = pathNameArray[pathNameArray.length-1]
    
    const currentElement = (pathMapping[last_entry]) ? pathMapping[last_entry] : {header: 'Overview', sidebar: 'Overview'}

    const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

    return (
        <Row className="app-container">
            <SidebarComponent selectedItem={currentElement.sidebar} />
            <Column flexGrow={1} className="app-main-block">
                <DashboardHeader title={currentElement.header} isLoggedIn={isLoggedIn}/>
                <div className="app-content">
                    <Switch>
                        {Object.keys(pathMapping).map((key, index) => (
                            <Route key={index} path={`/dashboard/${key}`} component={pathMapping[key].component} />
                        ))}
                        <Route key="result" path={`/dashboard/scan/:id/results`} component={SimilarityResultPage} />
                        
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
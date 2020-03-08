import React from 'react';
import { Link, Router} from 'react-router-dom';
import { Result } from 'antd';
import history from '../../utilities/history';

function PageNotFound() {
    return (
        <Router history={history}>
            <Result 
                className="page-not-found-container"
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link to="/">Back Home</Link>}
            />
        </Router>
    )
}

export default PageNotFound;
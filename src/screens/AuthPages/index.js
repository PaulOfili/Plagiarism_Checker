import React, {useEffect} from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import all_routes from '../../config/routes';
import { Container, Row, Col } from "reactstrap";
import AuthNavbar from '../../layouts/LayoutComponents/Navbar/AuthNavbar';

function Auth({location}) {
    useEffect(() => {
        document.body.classList.add("bg-default");
    }, [])

    useEffect(() => {
        return () => {
            document.body.classList.remove("bg-default");
        }
    }, [])

    return (
        <>
            <div className="main-content">
            <AuthNavbar />
            <div className="header bg-gradient-info py-5 py-lg-6">
                <Container>
                <div className="header-body text-center mb-7">
                    <Row className="justify-content-center">
                    <Col lg="5" md="6">
                        <h1 className="text-white">Welcome!</h1>
                    </Col>
                    </Row>
                </div>
                </Container>
                <div className="separator separator-bottom separator-skew zindex-100">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    version="1.1"
                    viewBox="0 0 2560 100"
                    x="0"
                    y="0"
                >
                    <polygon
                    className="fill-default"
                    points="2560 0 2560 100 0 100"
                    />
                </svg>
                </div>
            </div>
            {/* Page content */}
            <Container className="mt--8 pb-5">
                <Row className="justify-content-center">
                <Switch>
                    {all_routes['auth_routes'].map((route, index) => (
                        <Route key={index} path={`/auth/${route.url}`} component={route.component} />
                    ))}
                    <Redirect from="*" to="/auth/login" />
                </Switch>
                </Row>
            </Container>
            </div>
            {/* <AuthFooter /> */}
        </>
    )
}

export default withRouter(Auth);
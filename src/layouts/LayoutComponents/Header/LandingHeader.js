import React from "react";
import AuthNavbar from '../Navbar/AuthNavbar';
import { Link } from 'react-router-dom';

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

function LandingHeader() {
    return(
        <>
           
            <div
            className="header pb-8 align-items-center"
            style={{
                minHeight: "100vh",
                backgroundImage:
                "url(" + require("../../../assets/img/plagiarism-checker.png") + ")",
                backgroundSize: "cover",
                backgroundPosition: "center top"
            }}
            >
            {/* Mask */}
                <span className="mask bg-gradient-default opacity-8" />
            {/* Header container */}
                <AuthNavbar />
                
                <Container className="pt-5 pt-lg-8 px-8 align-items-center" fluid>
                    <Row className="pt-8">
                        <Col lg="8" md="10" className="offset-lg-2 offset-md-1">
                            <h1 className="display-1 text-white">The Online Plagiarism Checker</h1>
                            <p className=" display-5 text-white mt-0 mb-5">
                                An intuitive tool to detect plagiarism, enabling students learn effectively.
                            </p>

                            <Link to="/auth" className="text-white"> 
                                <Button
                                color="info"
                                >
                                    Get Started
                                </Button>
                            </Link>
                           
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default LandingHeader;
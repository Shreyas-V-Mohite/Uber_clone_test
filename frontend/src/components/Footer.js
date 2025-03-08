// Footer component
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaApple, FaGooglePlay, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-light mt-5 py-4">
      <Container>
        <Row className="align-items-center text-center text-md-start">
          {/* App Download Links */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Get the Uber Eats App</h5>
            <a href="#"><FaApple className="me-2" /> iPhone</a> | <a href="#"><FaGooglePlay className="me-2" /> Android</a>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Company</h5>
            <a href="#">About</a> | <a href="#">Terms</a> | <a href="#">Privacy</a>
          </Col>

          {/* Social Media */}
          <Col md={4} className="d-flex justify-content-md-end">
            <a href="#" className="me-3"><FaFacebook size={20} /></a>
            <a href="#" className="me-3"><FaTwitter size={20} /></a>
            <a href="#"><FaInstagram size={20} /></a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

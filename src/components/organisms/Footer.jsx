import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/organisms/Footer.css";

function Footer() {
  return (
    <footer className="footer mt-auto">
      <Container>
        <Row className="align-items-center text-center text-md-start">
          {/* Logo */}
          <Col md={3} className="mb-3 mb-md-0 d-flex justify-content-center justify-content-md-start">
            <img
              src="/imghome/logo.webp"
              alt="PopShoes"
              className="footer-logo"
            />
          </Col>

          {/* Contacto */}
          <Col md={3} className="mb-3 mb-md-0">
            <h5>Contacto</h5>
            <p className="mb-1">📞 +56 9 4545 4545</p>
            <p>📧 popshoes@gmail.com</p>
          </Col>

          {/* Métodos de pago */}
          <Col md={3} className="mb-3 mb-md-0">
            <h5>Métodos de pago</h5>
            <p className="mb-1">💳 Tarjetas</p>
            <p>💰 Transferencias</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

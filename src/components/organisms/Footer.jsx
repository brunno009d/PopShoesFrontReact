import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/organisms/Footer.css";

function Footer() {
  return (
    <footer className="footer mt-auto py-4 bg-dark text-light">
      <Container>
        <Row className="align-items-center text-center text-md-start gy-4">
          <Col md={3} className="d-flex justify-content-center justify-content-md-start">
            <img
              src="/imghome/logo.webp"
              alt="PopShoes"
              className="footer-logo"
              style={{ maxHeight: '80px', objectFit: 'contain' }}
            />
          </Col>

          {/* Contacto */}
          <Col md={3}>
            <h5 className="fw-bold mb-3 text-uppercase">Contacto</h5>
            <p className="mb-1">📞 +56 9 4545 4545</p>
            <p className="mb-0">📧 popshoes@gmail.com</p>
          </Col>

          {/* Pagos */}
          <Col md={3}>
            <h5 className="fw-bold mb-3 text-uppercase">Pagos</h5>
            <p className="mb-1">💳 Tarjetas Crédito/Débito</p>
            <p className="mb-0">💰 Transferencia Bancaria</p>
          </Col>
          
          {/* Siguenos */}
          <Col md={3}>
             <h5 className="fw-bold mb-3 text-uppercase">Siguenos</h5>
             <p className="mb-0">
               Las mejores zapatillas urbanas y deportivas estan aqui.
             </p>
          </Col>
        </Row>
        
        <hr className="my-4 border-secondary" />
        
        <div className="text-center small">
            &copy; {new Date().getFullYear()} PopShoes. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
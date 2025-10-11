import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Home() {
  return (
    <Container className="my-5 text-center">
      {/* Título */}
      <h1 className="text-dark text-primary fw-bold mb-5">
        PopShoes Lo mejor en calzados
      </h1>

      {/* Sección de imágenes */}
      <Row className="g-4">
        <Col xs={12} md={6} lg={4}>
          <img
            src="/imghome/estilo1.webp"
            alt="Imagen 1"
            className="img-fluid rounded shadow-sm"
          />
        </Col>

        <Col xs={12} md={6} lg={4}>
          <img
            src="/imghome/estilo4.webp"
            alt="Imagen 2"
            className="img-fluid rounded shadow-sm"
          />
        </Col>

        <Col xs={12} md={6} lg={4}>
          <img
            src="/imghome/estilo5.webp"
            alt="Imagen 3"
            className="img-fluid rounded shadow-sm"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;

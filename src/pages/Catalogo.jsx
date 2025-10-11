import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import calzados from '../data/calzados';
import CalzadoCard from '../components/organisms/CalzadoCard';

function Catalogo() {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Catálogo</h1>
      <Row className="justify-content-center">
        {calzados.map((calzado) => (
          <Col
            key={calzado.id}
            xs={12}    // 1 tarjeta por fila en móviles
            sm={6}     // 2 en tablets
            md={4}     // 3 en pantallas medianas
            lg={3}     // 4 en pantallas grandes
            className="d-flex justify-content-center"
          >
            <CalzadoCard calzado={calzado} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Catalogo;
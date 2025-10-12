import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import calzados from '../data/calzados';
import CalzadoCard from '../components/organisms/CalzadoCard';
import Texto from '../components/atoms/Texto';


function Catalogo() {
  return (
    <Container className="my-5">
      <Texto variant="h1" className="text-center mb-4">Catálogo</Texto>
      <Row className="justify-content-center">
        {calzados.map((calzado) => (
          <Col
            key={calzado.id}
            xs={12}    
            sm={6}     
            md={4}     
            lg={3}     
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
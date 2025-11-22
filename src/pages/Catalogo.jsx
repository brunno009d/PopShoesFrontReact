import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { MockDatabase } from '../services/MockDatabase';
import CalzadoCard from '../components/organisms/CalzadoCard';
import Texto from '../components/atoms/Texto';

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await MockDatabase.getProducts();
        setProductos(data);
      } catch (error) {
        console.error("Error cargando catalogo", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  return (
    <Container className="my-5">
      <Texto variant="h1" className="text-center mb-4">Catalogo</Texto>
      
      {loading ? (
        <div className="text-center py-5">
            <Spinner animation="border" role="status" />
            <p>Cargando zapatillas...</p>
        </div>
      ) : (
        <Row className="justify-content-center">
            {productos.map((calzado) => (
            <Col
                key={calzado.id}
                xs={12}    
                sm={6}     
                md={4}     
                lg={3}     
                className="d-flex justify-content-center mb-4"
            >
                <CalzadoCard calzado={calzado} />
            </Col>
            ))}
            {productos.length === 0 && (
                <p className="text-center">No se encontraron productos.</p>
            )}
        </Row>
      )}
    </Container>
  );
}

export default Catalogo;
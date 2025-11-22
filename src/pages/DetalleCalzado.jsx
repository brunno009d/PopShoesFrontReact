import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner, Badge } from 'react-bootstrap';
import { MockDatabase } from '../services/MockDatabase';
import { useCart } from '../context/CarritoContext';
import Imagen from '../components/atoms/Imagen';
import Boton from '../components/atoms/Boton';
import Texto from '../components/atoms/Texto';

function DetalleCalzado() {
  const { id } = useParams();
  const { agregarCarrito } = useCart();
  
  const [calzado, setCalzado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const productos = await MockDatabase.getProducts();
        const encontrado = productos.find(p => p.id.toString() === id.toString());
        setCalzado(encontrado);
      } catch (error) {
        console.error("Error buscando producto", error);
      } finally {
        setLoading(false);
      }
    };
    cargarProducto();
  }, [id]);

  if (loading) {
    return (
        <Container className="my-5 text-center">
            <Spinner animation="border" />
        </Container>
    );
  }

  if (!calzado) {
    return (
        <Container className="my-5 text-center">
            <Texto variant="h2">Producto no encontrado</Texto>
            <Boton onClick={() => window.history.back()}>Volver</Boton>
        </Container>
    );
  }

  // Verificamos si hay stock disponible
  const hayStock = calzado.stock > 0;

  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6} className="mb-4 mb-md-0">
          <Imagen 
            src={calzado.imagen} 
            alt={calzado.titulo} 
            className="img-fluid rounded shadow-lg"
            style={{ minHeight: '300px', objectFit: 'cover', width: '100%' }}
          />
        </Col>
        
        <Col md={6}>
          <div className="d-flex align-items-center gap-2 mb-2">
              <Badge bg="dark">{calzado.marca?.nombre || 'Marca'}</Badge>
              {hayStock ? (
                  <Badge bg="success">Stock: {calzado.stock}</Badge>
              ) : (
                  <Badge bg="danger">Agotado</Badge>
              )}
          </div>

          <Texto variant="h1" className="fw-bold mb-3">{calzado.titulo}</Texto>
          <Texto variant="h3" className="text-primary mb-4">${calzado.precio.toLocaleString()}</Texto>
          
          <Texto variant="p" className="text-muted mb-4">
            {calzado.descripcion || "Sin descripcion disponible para este modelo."}
          </Texto>

          <div className="d-grid gap-2">
             <Boton 
                onClick={() => {
                    if (hayStock) {
                        agregarCarrito(calzado);
                        alert("Producto agregado al carrito");
                    }
                }} 
                variant={hayStock ? "primary" : "secondary"} 
                className="btn-lg"
                disabled={!hayStock}
             >
                {hayStock ? "Agregar al Carrito" : "Sin Stock"}
             </Boton>
             
             <Boton variant="outline-secondary" onClick={() => window.history.back()}>
                Seguir Comprando
             </Boton>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleCalzado;
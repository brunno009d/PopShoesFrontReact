import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Spinner, Badge } from 'react-bootstrap';
import { MockDatabase } from '../services/MockDatabase';
import { useCart } from '../context/CarritoContext';
import Imagen from '../components/atoms/Imagen';
import Boton from '../components/atoms/Boton';
import Texto from '../components/atoms/Texto';

function DetalleCalzado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarCarrito, carrito } = useCart();
  
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
            <Boton onClick={() => navigate(-1)}>Volver</Boton>
        </Container>
    );
  }

  // Logica de Estados (Stock y Carrito)
  const stock = calzado.stock !== undefined ? calzado.stock : 0;
  const hayStock = stock > 0;
  const yaEnCarrito = carrito.some(item => item.id === calzado.id);

  const handleAgregar = () => {
    if (hayStock && !yaEnCarrito) {
        agregarCarrito(calzado);
    }
  };

  const getButtonProps = () => {
      if (!hayStock) return { text: "Agotado", variant: "secondary", disabled: true };
      if (yaEnCarrito) return { text: "Ya en carrito", variant: "secondary", disabled: true };
      return { text: "Agregar al Carrito", variant: "primary", disabled: false };
  };

  const btnProps = getButtonProps();

  return (
    <Container className="my-5 position-relative">
      <div className="mb-4">
        <Boton 
            variant="outline-dark" 
            onClick={() => navigate(-1)} 
            className="d-flex align-items-center gap-2"
        >
            ← Volver
        </Boton>
      </div>

      <Row className="align-items-center">
        <Col md={6} className="mb-4 mb-md-0">
          <Imagen 
            src={calzado.imagen} 
            alt={calzado.titulo} 
            style={{ minHeight: '300px', objectFit: 'cover', width: '100%' }}
          />
        </Col>
        
        <Col md={6}>
          <div className="d-flex align-items-center gap-2 mb-2">
              <Badge bg="dark">{calzado.marca?.nombre || 'Marca'}</Badge>
              {hayStock ? (
                  <Badge bg="success">Stock: {stock}</Badge>
              ) : (
                  <Badge bg="danger">Agotado</Badge>
              )}
          </div>

          <Texto variant="h1" className="fw-bold mb-3">{calzado.titulo}</Texto>
          <Texto variant="h3" className="text-primary mb-4">${calzado.precio.toLocaleString()}</Texto>
          
          <Texto variant="p" className="text-muted mb-4 lead">
            {calzado.descripcion || "Sin descripcion disponible para este modelo."}
          </Texto>

          <div className="d-grid gap-2">
             <Boton 
                onClick={handleAgregar} 
                variant={btnProps.variant} 
                className="btn-lg"
                disabled={btnProps.disabled}
             >
                {btnProps.text}
             </Boton>
             
             {yaEnCarrito && (
                 <Boton variant="success" onClick={() => navigate('/carrito')}>
                    Ir a Pagar
                 </Boton>
             )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleCalzado;
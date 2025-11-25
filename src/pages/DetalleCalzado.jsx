import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Badge } from 'react-bootstrap';
import { useCart } from '../context/CarritoContext';
import { ProductService } from '../services/ProductService'; 
import Imagen from '../components/atoms/Imagen';
import Boton from '../components/atoms/Boton';
import Texto from '../components/atoms/Texto';

function DetalleCalzado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarCarrito, carrito } = useCart();
  
  const [calzado, setCalzado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1); 

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await ProductService.getById(id);
        setCalzado(data);
      } catch (error) {
        console.error("Error buscando producto", error);
        navigate('/catalogo');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) cargarProducto();
  }, [id, navigate]);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!calzado) return null;

  const stock = calzado.stock !== undefined ? calzado.stock : 0;
  const hayStock = stock > 0;
  const itemEnCarrito = carrito.find(item => item.id === calzado.id);
  const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
  const puedeAgregar = hayStock && (cantidad + cantidadEnCarrito <= stock);

  const handleAgregar = () => {
    if (puedeAgregar) {
        agregarCarrito(calzado, cantidad);
        alert("Producto agregado");
    } else {
        alert("No hay suficiente stock disponible");
    }
  };

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
            className="img-fluid rounded shadow-sm border"
            style={{ minHeight: '300px', objectFit: 'cover', width: '100%' }}
          />
        </Col>
        
        <Col md={6}>
          <div className="d-flex align-items-center gap-2 mb-2">
              <Badge bg="dark">{calzado.marca?.nombre || 'Marca'}</Badge>
              <Badge bg="secondary">{calzado.genero?.nombre || 'Género'}</Badge>
              {hayStock ? (
                  <Badge bg="success">Stock: {stock}</Badge>
              ) : (
                  <Badge bg="danger">Agotado</Badge>
              )}
          </div>

          <Texto variant="h1" className="fw-bold mb-3">{calzado.titulo}</Texto>
          <Texto variant="h3" className="text-success mb-4">${calzado.precio?.toLocaleString()}</Texto>
          
          <Texto variant="p" className="text-muted mb-4 lead">
            {calzado.descripcion || "Sin descripción disponible para este modelo."}
          </Texto>

          {/* Selector de Cantidad */}
          {hayStock && (
              <div className="d-flex align-items-center gap-3 mb-4">
                  <Button variant="outline-secondary" onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</Button>
                  <span className="fw-bold fs-5">{cantidad}</span>
                  <Button variant="outline-secondary" onClick={() => setCantidad(Math.min(stock - cantidadEnCarrito, cantidad + 1))}>+</Button>
              </div>
          )}

          <div className="d-grid gap-2">
             <Boton 
                onClick={handleAgregar} 
                variant={hayStock ? "primary" : "secondary"} 
                className="btn-lg"
                disabled={!puedeAgregar}
             >
                {hayStock ? (puedeAgregar ? "Agregar al Carrito" : "Stock Máximo Alcanzado") : "Agotado"}
             </Boton>
             
             {cantidadEnCarrito > 0 && (
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
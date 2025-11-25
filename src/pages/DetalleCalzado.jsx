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

  if (loading) return <Container className="my-5 text-center"><Spinner animation="border" /></Container>;
  if (!calzado) return null;

  const stock = calzado.stock !== undefined ? calzado.stock : 0;
  const hayStock = stock > 0;
  const itemEnCarrito = carrito.find(item => item.id === calzado.id);
  const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
  const puedeAgregar = hayStock && (cantidad + cantidadEnCarrito <= stock);

  const handleAgregar = () => {
    if (puedeAgregar) {
        agregarCarrito(calzado, cantidad);
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

      <Row className="align-items-center gx-5"> 
        
        <Col md={6} className="mb-4 mb-md-0">
          <div 
            className="bg-white rounded shadow-sm border d-flex align-items-center justify-content-center p-4"
            style={{ height: '500px', width: '100%', overflow: 'hidden' }}
          >
              <Imagen 
                src={calzado.imagen} 
                alt={calzado.titulo} 
                className="img-fluid"
                style={{ 
                    maxHeight: '100%', 
                    maxWidth: '100%', 
                    objectFit: 'contain' 
                }}
              />
          </div>
        </Col>
        
        <Col md={6}>
          <div className="d-flex align-items-center gap-2 mb-3">
              <Badge bg="dark" className="px-3 py-2">{calzado.marca?.nombre || 'Marca'}</Badge>
              <Badge bg="light" text="dark" className="border px-3 py-2">{calzado.genero?.nombre || 'Género'}</Badge>
              {hayStock ? (
                  <Badge bg="success" className="px-3 py-2">Stock: {stock}</Badge>
              ) : (
                  <Badge bg="danger" className="px-3 py-2">Agotado</Badge>
              )}
          </div>

          <Texto variant="h1" className="fw-bold mb-2 display-5">{calzado.titulo}</Texto>
          <Texto variant="h3" className="text-success mb-4 fw-bold">${calzado.precio?.toLocaleString()}</Texto>
          
          <Texto variant="p" className="text-muted mb-5 lead" style={{ lineHeight: '1.8' }}>
            {calzado.descripcion || "Sin descripción disponible para este modelo. Diseño ergonómico y materiales de alta calidad."}
          </Texto>

          {/* Selector de Cantidad */}
          {hayStock && (
              <div className="d-flex align-items-center gap-3 mb-4">
                  <span className="fw-bold">Cantidad:</span>
                  <div className="input-group" style={{ width: '140px' }}>
                      <Button variant="outline-secondary" onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</Button>
                      <span className="form-control text-center fw-bold border-secondary">{cantidad}</span>
                      <Button variant="outline-secondary" onClick={() => setCantidad(Math.min(stock - cantidadEnCarrito, cantidad + 1))}>+</Button>
                  </div>
              </div>
          )}

          <div className="d-grid gap-3">
             <Boton 
                onClick={handleAgregar} 
                variant={hayStock ? "primary" : "secondary"} 
                className="btn-lg py-3 fw-bold"
                disabled={!puedeAgregar}
             >
                {hayStock ? (puedeAgregar ? "Agregar al Carrito" : "Stock Máximo en Carrito") : "Producto Agotado"}
             </Boton>
             
             {cantidadEnCarrito > 0 && (
                 <Boton variant="success" className="btn-lg py-3 fw-bold" onClick={() => navigate('/carrito')}>
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
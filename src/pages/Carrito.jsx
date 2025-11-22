import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';
import { MockDatabase } from '../services/MockDatabase';
import Imagen from '../components/atoms/Imagen';
import Boton from '../components/atoms/Boton';
import Texto from '../components/atoms/Texto';

function Carrito() {
  const { carrito, vaciarCarrito, eliminarCarrito, actualizarCantidad } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Estados para el checkout
  const [metodoEnvio, setMetodoEnvio] = useState('Chileexpress');
  const [metodoPago, setMetodoPago] = useState('Webpay');
  const [direccionEnvio, setDireccionEnvio] = useState('');
  
  const costoEnvio = 50000; 
  const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const totalFinal = subtotal + costoEnvio;

  useEffect(() => {
      if (user && user.direccion) {
          setDireccionEnvio(user.direccion);
      }
  }, [user]);

  const handleCheckout = async () => {
        if (!user) {
            alert('Debes iniciar sesion para finalizar la compra');
            navigate('/login');
            return;
        }

        if (!direccionEnvio.trim()) {
            alert('Por favor ingresa una direccion de envio');
            return;
        }

        const nuevaVenta = {
            usuario: user.nombre || user.email,
            usuario_id: user.id,
            total: totalFinal,
            items: carrito.length,
            detalle: carrito,
            envio: metodoEnvio,
            direccion: direccionEnvio,
            pago: metodoPago
        };

        try {
            await MockDatabase.addSale(nuevaVenta);
            
            if (user.direccion !== direccionEnvio) {
                await MockDatabase.updateUser(user.id, { direccion: direccionEnvio });
            }

            vaciarCarrito();
            alert('Compra realizada con exito! Revisa tu perfil.');
            navigate('/mi-cuenta');
        } catch (error) {
            console.error(error);
            alert('Hubo un error al procesar la compra');
        }
    };

  if (carrito.length === 0) {
    return (
      <Container className="my-5 text-center">
        <Texto variant="h1" >Carrito de Compras</Texto>
        <Texto variant="p" className="my-4">Tu carrito esta vacio</Texto>
        <Boton onClick={() => navigate('/catalogo')} variant="primary">Ir al Catalogo</Boton>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Texto variant="h1" className="mb-4">Resumen de Compra</Texto>
      
      <Row>
        <Col lg={7}>
            {carrito.map((calzado) => (
            <Card key={calzado.id} className="mb-3 shadow-sm">
                <Card.Body className="p-2 p-sm-3">
                    <Row className="align-items-center g-2">
                        <Col xs={4} sm={3}>
                            <Imagen 
                                src={calzado.imagen} 
                                alt={calzado.titulo} 
                                className="img-fluid rounded"
                                style={{ objectFit: 'cover', maxHeight: '80px', width: '100%' }}
                            />
                        </Col>
                        <Col xs={8} sm={9}>
                            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center h-100">
                                <div className="mb-2 mb-sm-0 me-sm-3 flex-grow-1">
                                    <Texto variant="h6" className="mb-1 fs-6 text-truncate">{calzado.titulo}</Texto>
                                    <Texto variant="p" className="text-muted small mb-2">
                                        Precio unitario: ${calzado.precio.toLocaleString()}
                                    </Texto>
                                    
                                    <div className="d-flex align-items-center">
                                        <Boton 
                                            variant="outline-secondary" 
                                            className="btn-sm px-2 py-0"
                                            onClick={() => actualizarCantidad(calzado.id, calzado.cantidad - 1)}
                                            disabled={calzado.cantidad <= 1}
                                        >
                                            -
                                        </Boton>
                                        
                                        <span className="mx-2 fw-bold" style={{ minWidth: '20px', textAlign: 'center' }}>
                                            {calzado.cantidad}
                                        </span>
                                        
                                        <Boton 
                                            variant="outline-secondary" 
                                            className="btn-sm px-2 py-0"
                                            onClick={() => actualizarCantidad(calzado.id, calzado.cantidad + 1)}
                                            disabled={calzado.cantidad >= (calzado.stock || 999)}
                                        >
                                            +
                                        </Boton>
                                        
                                        <span className="ms-2 text-muted small" style={{ fontSize: '0.75rem' }}>
                                            (Stock: {calzado.stock || 'N/A'})
                                        </span>
                                    </div>
                                </div>

                                <div className="text-end ms-auto d-flex flex-column align-items-end">
                                    <Texto variant="p" className="fw-bold mb-0" style={{ fontSize: '0.9rem' }}>
                                        ${(calzado.precio * calzado.cantidad).toLocaleString()}
                                    </Texto>
                                    
                                    <Boton 
                                        variant="link" 
                                        className="text-danger p-0 text-decoration-none border-0 bg-transparent small mt-1" 
                                        onClick={() => eliminarCarrito(calzado.id)}
                                        style={{ fontSize: '0.8rem' }}
                                    >
                                        Quitar
                                    </Boton>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            ))}
        </Col>

        <Col lg={5}>
            <Card className="p-4 shadow-sm bg-light">
                <Texto variant="h4" className="mb-3">Datos de Envio y Pago</Texto>
                
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Metodo de Envio ($50.000)</Form.Label>
                    <Form.Select value={metodoEnvio} onChange={(e) => setMetodoEnvio(e.target.value)}>
                        <option value="Chileexpress">Chileexpress</option>
                        <option value="BlueExpress">BlueExpress</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Direccion de Entrega</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={direccionEnvio} 
                        onChange={(e) => setDireccionEnvio(e.target.value)}
                        placeholder="Calle, Numero, Comuna"
                    />
                    <Form.Text className="text-muted">
                        * Actualizar aqui tambien guardara la direccion en tu perfil.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Metodo de Pago</Form.Label>
                    <div className="d-flex gap-3">
                        <Form.Check 
                            type="radio"
                            label="Webpay"
                            name="pago"
                            checked={metodoPago === 'Webpay'}
                            onChange={() => setMetodoPago('Webpay')}
                        />
                        <Form.Check 
                            type="radio"
                            label="Transferencia"
                            name="pago"
                            checked={metodoPago === 'Transferencia'}
                            onChange={() => setMetodoPago('Transferencia')}
                        />
                    </div>
                </Form.Group>

                <hr />
                
                <div className="d-flex justify-content-between mb-2">
                    <Texto variant="p">Subtotal:</Texto>
                    <Texto variant="p">${subtotal.toLocaleString()}</Texto>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <Texto variant="p">Envio:</Texto>
                    <Texto variant="p">${costoEnvio.toLocaleString()}</Texto>
                </div>
                <div className="d-flex justify-content-between mb-4">
                    <Texto variant="h4" className="fw-bold">Total:</Texto>
                    <Texto variant="h4" className="fw-bold text-primary">${totalFinal.toLocaleString()}</Texto>
                </div>

                <Boton type="button" className="w-100 btn-lg" variant="primary" onClick={handleCheckout}>
                    Pagar Ahora
                </Boton>
            </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Carrito;
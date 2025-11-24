import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';
import { MainService } from '../services/MainService'; 
import Imagen from '../components/atoms/Imagen';
import Boton from '../components/atoms/Boton';
import Texto from '../components/atoms/Texto';

function Carrito() {
  const { carrito, vaciarCarrito, eliminarCarrito, actualizarCantidad } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [metodoEnvio, setMetodoEnvio] = useState('Chileexpress');
  const [metodoPago, setMetodoPago] = useState('Webpay');
  const [direccionEnvio, setDireccionEnvio] = useState('');
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [procesando, setProcesando] = useState(false);
  
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

        setProcesando(true);

        try {
            const promesasStock = carrito.map(item => {
                const nuevoStock = Math.max(0, (item.stock || 0) - item.cantidad);
                return MainService.updateProduct(item.id, { stock: nuevoStock });
            });
            await Promise.all(promesasStock);

            if (user.direccion !== direccionEnvio) {
                try {
                    await MainService.updateUser(user.id, { direccion: direccionEnvio });
                } catch (e) { console.warn("No se pudo guardar la dirección", e); }
            }
            const nuevaVenta = {
                usuario_id: user.id,
                total: totalFinal,
                items: carrito.length,
                detalle: carrito, 
                envio: metodoEnvio,
                direccion: direccionEnvio,
                pago: metodoPago
            };
            
            try {
                 await MainService.addSale(nuevaVenta);
            } catch (e) {
                console.warn("Venta no registrada en historial, pero stock descontado.", e);
            }

            setProcesando(false);
            vaciarCarrito();
            setShowSuccessModal(true);

        } catch (error) {
            console.error(error);
            setProcesando(false);
            alert('Hubo un error crítico al procesar la compra. Intenta nuevamente.');
        }
    };

  const handleCloseModal = () => {
      setShowSuccessModal(false);
      navigate('/mi-cuenta');
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
                                        Precio: ${calzado.precio?.toLocaleString()} x {calzado.cantidad}
                                    </Texto>
                                    
                                    <div className="d-flex align-items-center">
                                        <Boton variant="outline-secondary" className="btn-sm px-2 py-0" onClick={() => actualizarCantidad(calzado.id, calzado.cantidad - 1)} disabled={calzado.cantidad <= 1}>-</Boton>
                                        <span className="mx-2 fw-bold">{calzado.cantidad}</span>
                                        <Boton variant="outline-secondary" className="btn-sm px-2 py-0" onClick={() => actualizarCantidad(calzado.id, calzado.cantidad + 1)} disabled={calzado.cantidad >= (calzado.stock || 999)}>+</Boton>
                                    </div>
                                </div>
                                <div className="text-end ms-auto">
                                    <Texto variant="p" className="fw-bold mb-0">${(calzado.precio * calzado.cantidad).toLocaleString()}</Texto>
                                    <Boton variant="link" className="text-danger p-0 small text-decoration-none" onClick={() => eliminarCarrito(calzado.id)}>Quitar</Boton>
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
                    <Form.Label>Metodo de Envio</Form.Label>
                    <Form.Select value={metodoEnvio} onChange={(e) => setMetodoEnvio(e.target.value)}>
                        <option value="Chileexpress">Chileexpress</option>
                        <option value="BlueExpress">BlueExpress</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Direccion de Entrega</Form.Label>
                    <Form.Control type="text" value={direccionEnvio} onChange={(e) => setDireccionEnvio(e.target.value)} placeholder="Ej: Calle Falsa 123" />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Metodo de Pago</Form.Label>
                    <div className="d-flex gap-3">
                        <Form.Check type="radio" label="Webpay" name="pago" checked={metodoPago === 'Webpay'} onChange={() => setMetodoPago('Webpay')} />
                        <Form.Check type="radio" label="Transferencia" name="pago" checked={metodoPago === 'Transferencia'} onChange={() => setMetodoPago('Transferencia')} />
                    </div>
                </Form.Group>

                <hr />
                <div className="d-flex justify-content-between mb-2"><Texto variant="p">Subtotal:</Texto><Texto variant="p">${subtotal.toLocaleString()}</Texto></div>
                <div className="d-flex justify-content-between mb-3"><Texto variant="p">Envio:</Texto><Texto variant="p">${costoEnvio.toLocaleString()}</Texto></div>
                <div className="d-flex justify-content-between mb-4"><Texto variant="h4" className="fw-bold">Total:</Texto><Texto variant="h4" className="fw-bold text-primary">${totalFinal.toLocaleString()}</Texto></div>

                <Boton type="button" className="w-100 btn-lg" variant="primary" onClick={handleCheckout} disabled={procesando}>
                    {procesando ? 'Procesando...' : 'Pagar Ahora'}
                </Boton>
            </Card>
        </Col>
      </Row>

      <Modal show={showSuccessModal} onHide={handleCloseModal} centered backdrop="static">
        <Modal.Header className="bg-success text-white border-0"><Modal.Title>¡Compra Exitosa!</Modal.Title></Modal.Header>
        <Modal.Body className="text-center py-5">
            <h4 className="fw-bold mb-3">Gracias, {user?.nombre}!</h4>
            <p className="text-muted">Tu pedido sera enviado a: <strong>{direccionEnvio}</strong></p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center border-0 pb-4">
            <Boton variant="success" onClick={handleCloseModal}>Continuar</Boton>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Carrito;
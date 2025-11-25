import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';
import { ProductService } from '../services/ProductService';
import { UserService } from '../services/UserService';
import { SaleService } from '../services/SaleService';
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
  
  const [resumenCompra, setResumenCompra] = useState(null);
  
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
                return ProductService.update(item.id, { stock: nuevoStock });
            });
            await Promise.all(promesasStock);

            if (user.direccion !== direccionEnvio) {
                try {
                    await UserService.update(user.id, { direccion: direccionEnvio });
                } catch (e) { console.warn("No se pudo actualizar direccion", e); }
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
                 await SaleService.create(nuevaVenta);
            } catch (e) {
                console.warn("Error guardando historial", e);
            }

            setResumenCompra({
                items: [...carrito],
                total: totalFinal,
                direccion: direccionEnvio
            });

            setProcesando(false);
            vaciarCarrito();
            setShowSuccessModal(true);

        } catch (error) {
            console.error(error);
            setProcesando(false);
            alert('Hubo un error crítico al procesar la compra.');
        }
    };

  const handleCloseModal = () => {
      setShowSuccessModal(false);
      navigate('/mi-cuenta');
  };

  if (carrito.length === 0 && !showSuccessModal) {
    return (
      <Container className="my-5 text-center">
        <Texto variant="h1" >Carrito de Compras</Texto>
        <Texto variant="p" className="my-4">Tu carrito está vacío</Texto>
        <Boton onClick={() => navigate('/catalogo')} variant="primary">Ir al Catálogo</Boton>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Texto variant="h1" className="mb-4">Resumen de Compra</Texto>
      
      <Row>
        <Col lg={7}>
            {carrito.map((calzado) => (
            <Card key={calzado.id} className="mb-3 shadow-sm border-0">
                <Card.Body className="p-2 p-sm-3">
                    <Row className="align-items-center g-3">
                        <Col xs={4} sm={3}>
                            <div className="bg-white rounded border d-flex align-items-center justify-content-center" style={{ height: '100px', width: '100px' }}>
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

                        <Col xs={8} sm={9}>
                            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center h-100">
                                <div className="mb-2 mb-sm-0 me-sm-3 flex-grow-1">
                                    <Texto variant="h6" className="mb-1 fs-5 text-truncate">{calzado.titulo}</Texto>
                                    <Texto variant="p" className="text-muted small mb-2">
                                        Precio: ${calzado.precio?.toLocaleString()}
                                    </Texto>
                                    
                                    <div className="d-flex align-items-center">
                                        <Boton variant="outline-secondary" className="btn-sm px-2 py-0" onClick={() => actualizarCantidad(calzado.id, calzado.cantidad - 1)} disabled={calzado.cantidad <= 1}>-</Boton>
                                        <span className="mx-3 fw-bold fs-6">{calzado.cantidad}</span>
                                        <Boton variant="outline-secondary" className="btn-sm px-2 py-0" onClick={() => actualizarCantidad(calzado.id, calzado.cantidad + 1)} disabled={calzado.cantidad >= (calzado.stock || 999)}>+</Boton>
                                    </div>
                                </div>
                                <div className="text-end ms-auto">
                                    <Texto variant="p" className="fw-bold mb-0 fs-5">${(calzado.precio * calzado.cantidad).toLocaleString()}</Texto>
                                    <Boton variant="link" className="text-danger p-0 small text-decoration-none mt-1" onClick={() => eliminarCarrito(calzado.id)}>Quitar</Boton>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            ))}
        </Col>

        <Col lg={5}>
            <Card className="p-4 shadow-sm bg-light border-0">
                <Texto variant="h4" className="mb-3 fw-bold">Datos de Envío y Pago</Texto>
                <Form.Group className="mb-3">
                    <Form.Label>Método de Envío</Form.Label>
                    <Form.Select value={metodoEnvio} onChange={(e) => setMetodoEnvio(e.target.value)}>
                        <option value="Chileexpress">Chileexpress</option>
                        <option value="BlueExpress">BlueExpress</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Dirección de Entrega</Form.Label>
                    <Form.Control type="text" value={direccionEnvio} onChange={(e) => setDireccionEnvio(e.target.value)} placeholder="Ej: Calle Falsa 123" />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Método de Pago</Form.Label>
                    <div className="d-flex gap-3">
                        <Form.Check type="radio" label="Webpay" name="pago" checked={metodoPago === 'Webpay'} onChange={() => setMetodoPago('Webpay')} />
                        <Form.Check type="radio" label="Transferencia" name="pago" checked={metodoPago === 'Transferencia'} onChange={() => setMetodoPago('Transferencia')} />
                    </div>
                </Form.Group>
                <hr />
                <div className="d-flex justify-content-between mb-2"><Texto variant="p">Subtotal:</Texto><Texto variant="p">${subtotal.toLocaleString()}</Texto></div>
                <div className="d-flex justify-content-between mb-3"><Texto variant="p">Envío:</Texto><Texto variant="p">${costoEnvio.toLocaleString()}</Texto></div>
                <div className="d-flex justify-content-between mb-4"><Texto variant="h4" className="fw-bold">Total:</Texto><Texto variant="h4" className="fw-bold text-primary">${totalFinal.toLocaleString()}</Texto></div>
                <Boton type="button" className="w-100 btn-lg" variant="primary" onClick={handleCheckout} disabled={procesando}>
                    {procesando ? 'Procesando...' : 'Pagar Ahora'}
                </Boton>
            </Card>
        </Col>
      </Row>

      <Modal show={showSuccessModal} onHide={handleCloseModal} centered backdrop="static" size="lg">
        <Modal.Header className="bg-success text-white border-0 justify-content-center">
            <Modal.Title className="fw-bold">¡Felicidades por tu Compra!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
            <div className="mb-4">
                 <i className="bi bi-bag-check-fill text-success" style={{ fontSize: '4rem' }}></i>
                 <div style={{ fontSize: '4rem' }}>🛍️✨</div>
            </div>
            <h3 className="mb-3">¡Muchas gracias, {user?.nombre}!</h3>
            <p className="text-muted lead">
                El detalle de tu compra ha sido enviado a: <strong>{user?.email || user?.correo}</strong>
            </p>
            <div className="bg-light p-3 rounded text-start mt-4 mx-auto" style={{ maxWidth: '90%' }}>
                <h5 className="border-bottom pb-2 mb-3">Resumen del Pedido</h5>
                <Table size="sm" borderless>
                    <tbody>
                        {resumenCompra?.items.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.cantidad} x {item.titulo}</td>
                                <td className="text-end">${(item.precio * item.cantidad).toLocaleString()}</td>
                            </tr>
                        ))}
                        <tr className="border-top">
                            <td className="pt-2"><strong>Envío</strong></td>
                            <td className="text-end pt-2">${costoEnvio.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td><strong>Total Pagado</strong></td>
                            <td className="text-end text-success fw-bold">${resumenCompra?.total.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </Table>
                <p className="small text-muted mt-2 mb-0">
                    <i className="bi bi-geo-alt-fill"></i> Dirección de envío: {resumenCompra?.direccion}
                </p>
            </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center border-0 pb-4">
            <Boton variant="success" size="lg" className="px-5" onClick={handleCloseModal}>
                Volver a la Tienda
            </Boton>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Carrito;
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useCart } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';
import { MockDatabase } from '../services/MockDatabase';
import { useNavigate } from 'react-router-dom';
import Imagen from '../components/atoms/Imagen';
import Boton from '../components/atoms/Boton';
import Texto from '../components/atoms/Texto';

function Carrito() {
  const { carrito, vaciarCarrito, eliminarCarrito, precioTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
        if (!user) {
            alert('Debes iniciar sesion para finalizar la compra');
            navigate('/login');
            return;
        }

        const totalCalculado = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        const nuevaVenta = {
            usuario: user.nombre || user.email,
            usuario_id: user.id,
            total: totalCalculado,
            items: carrito.length,
            detalle: carrito 
        };

        try {
            await MockDatabase.addSale(nuevaVenta);
            vaciarCarrito();
            alert('Compra realizada con exito! Puedes ver el estado en tu perfil o contactar al admin.');
            navigate('/');
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
      <Texto variant="h1" className="mb-4">Carrito de Compras</Texto>
      
      <Row>
        <Col lg={8}>
            <Row>
                {carrito.map((calzado) => (
                <Col md={6} key={calzado.id} className="mb-3">
                    <Card className="h-100 shadow-sm">
                    <Imagen 
                        src={calzado.imagen} 
                        alt={calzado.titulo} 
                        className="card-img-top"
                        style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Body className="d-flex flex-column">
                        <Texto variant="h5" className="text-muted">{calzado.titulo}</Texto>
                        <div className="mt-auto">
                            <Texto variant="p">Precio: ${calzado.precio.toLocaleString()}</Texto>
                            <Texto variant="p">Cantidad: {calzado.cantidad}</Texto>
                            <Texto variant="p" className="fw-bold">Subtotal: ${(calzado.precio * calzado.cantidad).toLocaleString()}</Texto>
                            <Boton variant="danger" className="w-100 mt-2" onClick={() => eliminarCarrito(calzado.id)}>Eliminar</Boton>
                        </div>
                    </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
        </Col>

        <Col lg={4}>
            <Card className="p-4 shadow-sm">
                <Texto variant="h3" className="mb-3">Resumen</Texto>
                <div className="d-flex justify-content-between mb-3">
                    <Texto variant="p">Total a pagar:</Texto>
                    <Texto variant="h4" className="fw-bold">
                        ${carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0).toLocaleString()}
                    </Texto>
                </div>
                <Boton type="button" className="w-100 btn-lg" variant="primary" onClick={handleCheckout}>
                    Finalizar Compra 
                </Boton>
            </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Carrito;
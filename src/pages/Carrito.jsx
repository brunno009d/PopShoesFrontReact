import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useCart } from '../context/CarritoContext';
import Imagen from '../components/atoms/Imagen';
import Boton from '../components/atoms/Boton';
import Texto from '../components/atoms/Texto';

function Carrito() {
  const { carrito, vaciarCarrito, eliminarCarrito } = useCart();
  const handleVaciar = () => {
        vaciarCarrito();
        alert(`Gracias por su compra`);
    };
  if (carrito.length === 0) {
    
    return (
      <Container className="my-5">
        <Texto variant="h1" >Carrito de Compras</Texto>
        <Texto variant="p">Tu carrito está vacío</Texto>
        <Boton type="button" class="btn btn-lg btn-primary" disabled>Comprar</Boton>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Texto variant="h1">Carrito de Compras</Texto>
      <Texto variant="p">Productos en tu carrito:</Texto>
      
      <Row>
        {carrito.map((calzado) => (
          <Col md={4} key={calzado.id} className="mb-3">
            <Card>
              <Imagen 
                src={calzado.imagen} 
                alt={calzado.titulo} 
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Texto variant="h5" className="text-muted">{calzado.titulo}</Texto>
                <Texto variant="p"><strong>Precio: ${calzado.precio.toLocaleString()}</strong></Texto>
                <Texto variant="p"><strong>Cantidad: {calzado.cantidad}</strong></Texto>
                <Boton onClick={() => eliminarCarrito(calzado.id)}>Eliminar</Boton>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Boton type="button" className="btn btn-lg btn-primary" onClick={handleVaciar}>Comprar </Boton>

    </Container>
  );
}


export default Carrito;
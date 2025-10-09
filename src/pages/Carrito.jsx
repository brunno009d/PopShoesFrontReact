import { Container, Row, Col, Card } from 'react-bootstrap';
import { useCart } from '../context/CarritoContext';
import Imagen from '../components/atoms/Imagen';
import Boton from '../components/atoms/Boton';

function Carrito() {
  const { carrito } = useCart();
  const { vaciarCarrito } = useCart(); 

  if (carrito.length === 0) {
    return (
      <Container className="my-5">
        <h1>Carrito de Compras</h1>
        <p>Tu carrito está vacío</p>
        <Boton type="button" class="btn btn-lg btn-primary" disabled>Comprar</Boton>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1>Carrito de Compras</h1>
      <p>Productos en tu carrito:</p>
      
      <Row>
        {carrito.map((item) => (
          <Col md={4} key={item.id} className="mb-3">
            <Card>
              <Imagen 
                src={item.imagen} 
                alt={item.titulo} 
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <h5>{item.titulo}</h5>
                <p className="text-muted">{item.descripcion}</p>
                <p><strong>Precio: ${item.precio.toLocaleString()}</strong></p>
                <p><strong>Cantidad: {item.cantidad}</strong></p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Boton type="button" class="btn btn-lg btn-primary" >Comprar </Boton>

    </Container>
  );
}


export default Carrito;
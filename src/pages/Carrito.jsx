import { Container, Row, Col, Card } from 'react-bootstrap';
import { useCart } from '../context/CarritoContext';
import Imagen from '../components/atoms/Imagen';
import Boton from '../components/atoms/Boton';

function Carrito() {
  const { carrito, vaciarCarrito, eliminarCarrito } = useCart();
  const handleVaciar = () => {
        vaciarCarrito();
        alert(`Gracias por su compra`);
    };
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
                <h5 className="text-muted">{calzado.titulo}</h5>
                <p><strong>Precio: ${calzado.precio.toLocaleString()}</strong></p>
                <p><strong>Cantidad: {calzado.cantidad}</strong></p>
                <Boton onClick={() => eliminarCarrito(calzado.id)}>Eliminar</Boton>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Boton type="button" class="btn btn-lg btn-primary" onClick={handleVaciar}>Comprar </Boton>

    </Container>
  );
}


export default Carrito;
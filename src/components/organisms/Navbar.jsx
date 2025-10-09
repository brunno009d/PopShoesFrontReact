import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap';
import { useCart } from '../../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import { Cart4 } from 'react-bootstrap-icons';
import '../../styles/Navbar.css'; 

function NavBar() {
  const { actualizarNumeroCarrito } = useCart();
  const navigate = useNavigate();

  return (
    <Navbar className="custom-navbar shadow-sm py-2" variant="dark" expand="lg" sticky="top" >
      <Container className="d-flex align-items-center justify-content-between">
        {/* Logo a la izquierda */}
        <div
          className="d-flex align-items-center"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <Image
            src="./imghome/logo.webp" 
            alt="Logo PopShoes"
            height={100}
            className="me-2"
          />
        </div>

        {/* Botón hamburguesa en móvil */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Contenido colapsable */}
        <Navbar.Collapse id="basic-navbar-nav ">
          {/* Enlaces centrados */}
          <Nav className="mx-auto text-center">
            <Nav.Link onClick={() => navigate('/')}>Inicio</Nav.Link>
            <Nav.Link onClick={() => navigate('/catalogo')}>Catálogo</Nav.Link>
          </Nav>

          {/* Carrito a la derecha */}
          <div className="d-flex justify-content-end">
            <Button
              variant="outline-light"
              className="d-flex align-items-center position-relative"
              onClick={() => navigate('/carrito')}
            >
              <Cart4 className="me-2" size={18} />
              Carrito
              {actualizarNumeroCarrito > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '0.75rem' }}
                >
                  {actualizarNumeroCarrito}
                </span>
              )}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

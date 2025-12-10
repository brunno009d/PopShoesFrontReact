import React from 'react';
import { Navbar, Nav, Container, Button, Image, Dropdown } from 'react-bootstrap';
import { useCart } from '../../context/CarritoContext';
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate, Link } from 'react-router-dom';
import { Cart4 } from 'react-bootstrap-icons';
import '../../styles/organisms/Navbar.css'; 

function NavBar() {
  const { actualizarNumeroCarrito } = useCart();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <Navbar className="custom-navbar shadow-sm py-2" variant="dark" expand="lg" sticky="top">
      <Container className="d-flex align-items-center justify-content-between">
        {/* Logo */}
        <div
          className="d-flex align-items-center"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <Image
            src="/imghome/logo3.webp" 
            alt="Logo PopShoes"
            height={75}
            className="me-2"
          />
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto text-center">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catalogo</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blogs</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-2">
            <Button
              variant="outline-light"
              className="d-flex align-items-center position-relative me-2"
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

            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" id="dropdown-user" className="d-flex align-items-center">
                    {user.nombre}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {user.role === 'admin' ? (
                      <Dropdown.Item onClick={() => navigate('/admin')}>
                        🛠 Panel Admin
                      </Dropdown.Item>
                  ) : (
                      <Dropdown.Item onClick={() => navigate('/mi-cuenta')}>
                        👤 Mi Cuenta
                      </Dropdown.Item>
                  )}
                  
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout} className="text-danger">
                    Cerrar sesion
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button variant="outline-light" onClick={() => navigate('/login')}>
                  Iniciar sesion
                </Button>
                <Button variant="light" onClick={() => navigate('/registro')}>
                  Registrarse
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

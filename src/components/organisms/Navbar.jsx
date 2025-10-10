import { useState } from 'react';
import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap';
import { useCart } from '../../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import { Cart4 } from 'react-bootstrap-icons';
import '../../styles/Navbar.css'; 

function NavBar() {
  const { actualizarNumeroCarrito } = useCart();
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

  const [menuCuentaAbierto, setMenuCuentaAbierto] = useState(false);

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioLogueado');
    window.location.reload();
  };

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
            src="./imghome/logo.webp" 
            alt="Logo PopShoes"
            height={100}
            className="me-2"
          />
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Enlaces */}
          <Nav className="mx-auto text-center">
            <Nav.Link onClick={() => navigate('/')}>Inicio</Nav.Link>
            <Nav.Link onClick={() => navigate('/catalogo')}>Catálogo</Nav.Link>
            <Nav.Link onClick={() => navigate('/blog')}>Blogs</Nav.Link>
          </Nav>

          {/* Botones a la derecha */}
          <div className="d-flex align-items-center gap-2">
            {/* Carrito */}
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

            {/* Perfil o botones de login */}
            {usuario ? (
              <div className="position-relative">
                <Button
                  variant="outline-light"
                  onClick={() => setMenuCuentaAbierto(!menuCuentaAbierto)}
                >
                  {usuario.nombre}
                </Button>

                {menuCuentaAbierto && (
                  <div
                    className="position-absolute bg-white shadow rounded p-2 mt-1"
                    style={{ right: 0, minWidth: '150px', zIndex: 1000 }}
                  >
                    <Button
                      variant="light"
                      className="w-100"
                      onClick={handleCerrarSesion}
                    >
                      Cerrar sesión
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button variant="outline-light" onClick={() => navigate('/login')}>
                  Iniciar sesión
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
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="/assets/img/logo.png"
            alt="PopShoes"
            height="40"
            className="d-inline-block align-top me-2"
          />
          PopShoes
        </Navbar.Brand>

        {/* Toggle para móvil */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Menú principal */}
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/catalogo/marcas">
              <Nav.Link>Marcas</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/catalogo/hombre">
              <Nav.Link>Hombre</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/catalogo/mujer">
              <Nav.Link>Mujer</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/catalogo/estilos">
              <Nav.Link>Estilos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/catalogo/famosos">
              <Nav.Link>Famosos</Nav.Link>
            </LinkContainer>
          </Nav>
          {/* Acciones (carrito y login) */}
          <Nav>
            <LinkContainer to="/carrito">
              <Nav.Link>
                <i className="fa-solid fa-cart-shopping"></i>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Inicio Sesión</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar;

import { Navbar, Nav, Container } from 'react-bootstrap';
import { useCart } from '../../context/CarritoContext';


function NavBar() {
  const { actualizarNumeroCarrito } = useCart();

 return (
   <Navbar bg="dark" variant="dark" expand="lg">
     <Container>
       <Navbar.Brand href="/">Ruteando</Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="me-auto">
           <Nav.Link href="/">Inicio</Nav.Link>
           <Nav.Link href="/catalogo">Catalogo</Nav.Link>
           <Nav.Link href="/carrito">Carrito {actualizarNumeroCarrito}</Nav.Link>
         </Nav>
       </Navbar.Collapse>
     </Container>
   </Navbar>
 );
}


export default NavBar;
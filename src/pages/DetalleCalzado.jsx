import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import calzados from '../data/calzados';
import Imagen from '../components/atoms/Imagen.jsx';
import Texto from '../components/atoms/Texto.jsx';
import Boton from '../components/atoms/Boton.jsx';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CarritoContext.jsx';


function DetalleCalzado() {
 const { id } = useParams();
 const navigate = useNavigate();
 const calzado = calzados.find((p) => p.id === parseInt(id));
 const { agregarCarrito } = useCart();
 
     const handleComprar = () => {
         agregarCarrito(calzado);
 
  };


 if (!calzado) {
   return (
     <Container className="my-5">
       <h1>Producto no encontrado</h1>
     </Container>
   );
 }


 return (
   <Container className="my-5">
     
     <Card>
      <Boton variant="primary" onClick={() => navigate('/catalogo')}>Volver atras</Boton>
      <Imagen src={calzado.imagen} alt={calzado.titulo} className="card-img-top" />
       <Card.Body>
         <Texto variant="h2">{calzado.titulo}</Texto>
         <Texto variant="p">{calzado.descripcion}</Texto>
         <Texto variant="h4">${calzado.precio}</Texto>
         <Boton onClick={handleComprar}>Añadir al carrito</Boton>
       </Card.Body>
     </Card>
   </Container>
 );
}


export default DetalleCalzado;
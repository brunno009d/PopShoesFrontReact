import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import calzados from '../data/calzados';
import Imagen from '../components/atoms/Imagen.jsx';
import Texto from '../components/atoms/Texto.jsx';
import Boton from '../components/atoms/Boton.jsx';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useCart } from '../context/CarritoContext'; 


function DetalleCalzado() {
 const { id } = useParams();
 const navigate = useNavigate();
 const { agregarCarrito } = useCart(); 
 const calzado = calzados.find((p) => p.id === parseInt(id));


  if (!calzado) {
    return (
      <Container className="my-5 text-center">
        <h1>Producto no encontrado</h1>
        <Boton variant="secondary" onClick={() => navigate('/catalogo')}>
          <ArrowLeft className="me-2" /> Volver al catálogo
        </Boton>
      </Container>
    );
  }

  const handleAgregar = () => {
    agregarCarrito(calzado); 
  };

 return (
   <Container className="my-5 d-flex justify-content-center">
     <Card className="shadow-lg border-0 p-3" style={{ maxWidth: '600px' }}>
      {/* Flecha para volver */}
      <Boton
          variant="link"
          className="text-decoration-none text-dark d-flex align-items-center mb-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="me-2" /> Volver
        </Boton>
        {/* Imagen */}
      <Imagen
          src={calzado.imagen}
          alt={calzado.titulo}
          className="w-100 rounded mb-3"
          style={{ maxHeight: '350px', objectFit: 'cover' }}
        />
        {/* Información del producto */}
       <Card.Body className="text-center">
         <Texto variant="h2" className="mb-3">{calzado.titulo}</Texto>
         <Texto variant="p" className="text-muted mb-3">{calzado.descripcion}</Texto>
         <Texto variant="h4" className="mb-4 text-success">${calzado.precio}</Texto>
         <Boton variant="success" onClick={handleAgregar}>Añadir al carrito</Boton>
       </Card.Body>
     </Card>
   </Container>
 );
}

export default DetalleCalzado;

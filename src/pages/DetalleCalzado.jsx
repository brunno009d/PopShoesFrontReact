import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import calzados from '../data/calzados';
import Imagen from '../components/atoms/Imagen.jsx';
import Texto from '../components/atoms/Texto.jsx';


function DetalleCalzado() {
 const { id } = useParams();
 const calzado = calzados.find((p) => p.id === parseInt(id));


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
      <Imagen src={calzado.imagen} alt={calzado.titulo} className="card-img-top" />
       <Card.Body>
         <Texto variant="h2">{calzado.titulo}</Texto>
         <Texto variant="p">{calzado.descripcion}</Texto>
         <Texto variant="h4">${calzado.precio}</Texto>
       </Card.Body>
     </Card>
   </Container>
 );
}


export default DetalleCalzado;
import { Card } from 'react-bootstrap';
import Imagen from '../atoms/Imagen';
import Boton from '../atoms/Boton';
import CardCalzado from '../molecules/CardCalzado'
import { useNavigate } from 'react-router-dom';


function CalzadoCard({ calzado }) {
    console.log("Calzado recibido:", calzado);
    //const navigate = useNavigate();


 return (
   <Card style={{ width: '18rem' }} className="m-2">
     <Imagen src={calzado.imagen} alt={calzado.titulo} className="card-img-top" />
     <Card.Body>
       <CardCalzado
         titulo={calzado.titulo}
         descripcion={calzado.descripcion}
         precio={calzado.precio}
       />
       {/*<Boton variant="primary" onClick={() => navigate(`/calzados/${calzado.id}`)}>
         Ver detalles
       </Boton> */}
     </Card.Body>
   </Card>
 );
}


export default CalzadoCard;
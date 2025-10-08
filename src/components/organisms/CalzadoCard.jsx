import { Card } from 'react-bootstrap';
import Imagen from '../atoms/Imagen';
import Boton from '../atoms/Boton';
import CardCalzado from '../molecules/CardCalzado'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CarritoContext';


function CalzadoCard({ calzado }) {
    console.log("Calzado recibido:", calzado);
    const navigate = useNavigate();
    const { agregarCarrito } = useCart();

    const handleComprar = () => {
        agregarCarrito(calzado);
        alert(`${calzado.titulo} agregado al carrito!`);
    };


 return (
   <Card style={{ width: '18rem' }} className="m-2">
     <Imagen src={calzado.imagen} alt={calzado.titulo} className="card-img-top" />
     <Card.Body>
       <CardCalzado
         titulo={calzado.titulo}
         descripcion={calzado.descripcion}
         precio={calzado.precio}
       />
       <Boton variant="primary" onClick={() => 
navigate(`/calzados/${calzado.id}`)}>
         Ver detalles
       </Boton>
       <Boton variant="success" onClick={handleComprar}> 
        Comprar
       </Boton>
     </Card.Body>
   </Card>
 );
}


export default CalzadoCard;
import { Card } from 'react-bootstrap';
import Imagen from '../atoms/Imagen';
import Boton from '../atoms/Boton';
import CardCalzado from '../molecules/CardCalzado';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CarritoContext';
import '../../styles/CalzadoCard.css'; // Nuevo archivo de estilos

function CalzadoCard({ calzado }) {
  const navigate = useNavigate();
  const { agregarCarrito } = useCart();

  const handleComprar = () => {
    agregarCarrito(calzado);
  };

  return (
    <Card className="calzado-card shadow-sm border-0 m-2">
      <div className="img-container">
        <Imagen src={calzado.imagen} alt={calzado.titulo} className="card-img-top" />
      </div>
      <Card.Body className="text-center">
        <CardCalzado
          titulo={calzado.titulo}
          descripcion={calzado.descripcion}
          precio={calzado.precio}
        />
        <div className="d-flex justify-content-center gap-2 mt-3">
          <Boton
            variant="outline-primary"
            onClick={() => navigate(`/calzados/${calzado.id}`)}
          >
            Ver detalles
          </Boton>
          <Boton variant="success" onClick={handleComprar}>
            Comprar
          </Boton>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CalzadoCard;

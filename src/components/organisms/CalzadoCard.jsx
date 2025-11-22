import React from 'react';
import { Card, Badge } from 'react-bootstrap'; 
import Imagen from '../atoms/Imagen';
import Boton from '../atoms/Boton';
import CardCalzado from '../molecules/CardCalzado'; 
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CarritoContext';
import '../../styles/organisms/CalzadoCard.css'; 

function CalzadoCard({ calzado }) {
  const navigate = useNavigate();
  const { agregarCarrito, carrito } = useCart();

  //  Validacion de Stock
  const stock = calzado.stock !== undefined ? calzado.stock : 0;
  const hayStock = stock > 0;

  //  Ya esta en el carrito?
  const yaEnCarrito = carrito.some(item => item.id === calzado.id);

  const handleComprar = () => {
    if (hayStock && !yaEnCarrito) {
        agregarCarrito(calzado);
    }
  };

  const getButtonProps = () => {
      if (!hayStock) {
          return { text: "Agotado", variant: "secondary", disabled: true };
      }
      if (yaEnCarrito) {
          return { text: "Ya en carrito", variant: "secondary", disabled: true };
      }
      return { text: "Comprar", variant: "success", disabled: false };
  };

  const btnProps = getButtonProps();

  return (
    <Card className="calzado-card shadow-sm border-0 m-2">
      <div className="img-container position-relative">
        <Imagen src={calzado.imagen} alt={calzado.titulo} className="card-img-top" />
        
        <div className="position-absolute top-0 end-0 m-2">
            {hayStock ? (
                <Badge bg="light" text="dark" className="shadow-sm">Stock: {stock}</Badge>
            ) : (
                <Badge bg="danger" className="shadow-sm">Agotado</Badge>
            )}
        </div>
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
          
          <Boton 
            variant={btnProps.variant} 
            onClick={handleComprar}
            disabled={btnProps.disabled} 
          >
            {btnProps.text}
          </Boton>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CalzadoCard;
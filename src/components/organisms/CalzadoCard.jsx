import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import Imagen from '../atoms/Imagen'; 
import { useCart } from '../../context/CarritoContext'; 

function CalzadoCard({ calzado }) {
  if (!calzado) return null;

  const navigate = useNavigate();
  const { agregarCarrito, carrito } = useCart();
  const stock = calzado.stock !== undefined ? calzado.stock : 0;
  const hayStock = stock > 0;

  const yaEnCarrito = carrito.some(item => item.id === calzado.id);

  const handleComprar = (e) => {
    e.preventDefault(); 
    if (hayStock && !yaEnCarrito) {
        agregarCarrito(calzado);
    } else if (yaEnCarrito) {
        navigate('/carrito');
    }
  };

  const getButtonProps = () => {
      if (!hayStock) {
          return { text: "Agotado", variant: "secondary", disabled: true };
      }
      if (yaEnCarrito) {
          return { text: "Ir al Carrito", variant: "success", disabled: false };
      }
      return { text: "Comprar", variant: "primary", disabled: false };
  };
  
  const btnProps = getButtonProps();


  return (
    <Card className="h-100 shadow-sm border-0 overflow-hidden transition-hover">
      <div className="position-relative" style={{ height: '250px', overflow: 'hidden' }}>
        <Link to={`/detalle/${calzado.id}`}>
            <Imagen 
              src={calzado.imagen} 
              alt={calzado.titulo}
              className="w-100 h-100"
              style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
            />
        </Link>
        
        <div className="position-absolute top-0 end-0 m-2">
            {!hayStock ? (
                <Badge bg="danger" className="shadow-sm">Agotado</Badge>
            ) : (
                <Badge bg="light" text="dark" className="shadow-sm border">Stock: {stock}</Badge>
            )}
        </div>
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
            <Badge bg="dark" className="me-1">{calzado.marca?.nombre || 'Marca'}</Badge>
            <Badge bg="secondary" className="opacity-75">{calzado.genero?.nombre || 'Género'}</Badge>
        </div>

        <Card.Title className="fw-bold text-truncate" title={calzado.titulo}>
            <Link to={`/detalle/${calzado.id}`} className="text-decoration-none text-dark">
                {calzado.titulo}
            </Link>
        </Card.Title>
        
        <Card.Text className="text-muted small text-truncate mb-3">
            {calzado.descripcion}
        </Card.Text>

        <div className="mt-auto">
            <div className="text-success fw-bold fs-5 mb-2">
                ${calzado.precio?.toLocaleString()}
            </div>
            
            <div className="d-flex gap-2">
                <Link to={`/detalle/${calzado.id}`} className="flex-fill">
                    <Button variant="outline-dark" size="sm" className="w-100">
                        Ver Detalle
                    </Button>
                </Link>
                <Button 
                    variant={btnProps.variant} 
                    size="sm" 
                    className="flex-fill"
                    onClick={handleComprar}
                    disabled={btnProps.disabled}
                >
                    {btnProps.text}
                </Button>
            </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CalzadoCard;
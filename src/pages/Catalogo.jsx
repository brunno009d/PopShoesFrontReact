import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { ProductService } from '../services/ProductService';
import CalzadoCard from '../components/organisms/CalzadoCard';
import ProductFilters from '../components/organisms/ProductFilters'; 
import Texto from '../components/atoms/Texto';

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados de Filtros
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await ProductService.getAll();
        setProductos(data);
      } catch (error) {
        console.error("Error cargando catalogo", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  
  const marcasDisponibles = productos.reduce((acc, producto) => {
      if (producto.marca) {
          const existe = acc.find(m => m.id === producto.marca.id);
          if (!existe) acc.push(producto.marca);
      }
      return acc;
  }, []);

  const handleMarcaChange = (marcaId) => {
      setMarcasSeleccionadas(prev => 
          prev.includes(marcaId) 
              ? prev.filter(id => id !== marcaId) 
              : [...prev, marcaId]
      );
  };

  const handleLimpiarTodo = () => {
      setMarcasSeleccionadas([]);
  };

  const productosFiltrados = productos.filter(p => {
      if (marcasSeleccionadas.length > 0 && (!p.marca || !marcasSeleccionadas.includes(p.marca.id))) {
          return false;
      }
      
      return true;
  });

  const filterConfig = [
      {
          id: 'marca',
          title: 'Marcas',
          type: 'checkbox',
          options: marcasDisponibles.map(m => ({
              id: m.id,
              label: m.nombre,
              checked: marcasSeleccionadas.includes(m.id),
              onChange: () => handleMarcaChange(m.id)
          }))
      }
      
  ];

  return (
    <Container className="my-5">
      <Texto variant="h1" className="text-center mb-4">Catálogo</Texto>
      
      {loading ? (
        <div className="text-center py-5">
            <Spinner animation="border" role="status" />
            <p>Cargando zapatillas...</p>
        </div>
      ) : (
        <Row>
            <Col md={3} className="mb-4">
                <ProductFilters 
                    groups={filterConfig}
                    onClear={handleLimpiarTodo}
                    hasActiveFilters={marcasSeleccionadas.length > 0}
                />
            </Col>

            <Col md={9}>
                <Row>
                    {productosFiltrados.map((calzado) => (
                    <Col
                        key={calzado.id}
                        xs={12}    
                        sm={6}     
                        lg={4}     
                        className="d-flex justify-content-center mb-4"
                    >
                        <CalzadoCard calzado={calzado} />
                    </Col>
                    ))}
                    
                    {productosFiltrados.length === 0 && (
                        <Col className="text-center py-5">
                            <h5 className="text-muted">No hay productos que coincidan.</h5>
                            <p>Intenta limpiando los filtros.</p>
                        </Col>
                    )}
                </Row>
            </Col>
        </Row>
      )}
    </Container>
  );
}

export default Catalogo;
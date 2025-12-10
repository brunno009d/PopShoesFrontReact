import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Form, InputGroup, Button } from 'react-bootstrap';
import { ProductService } from '../services/ProductService';
import CalzadoCard from '../components/organisms/CalzadoCard';
import ProductFilters from '../components/organisms/ProductFilters'; 
import Texto from '../components/atoms/Texto';

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true);
      try {
        let data;
        
        // En caso de que el buscador este vacio trae a todos los calzados
        if (busqueda.trim() === "") {
            data = await ProductService.getAll();
        } else {
            data = await ProductService.getByName(busqueda);
        }
        
        setProductos(data || []);
      } catch (error) {
        console.error("Error cargando catalogo", error);
        setProductos([]); 
      } finally {
        setLoading(false);
      }
    };

    // Espera 500 ms para la peticion, con esto hacemos solo una llamada mientras escirbimos
    const timeoutId = setTimeout(() => {
        cargarProductos();
    }, 500);

    // Si el usuario sigue escribiendo se resetea el contador
    return () => clearTimeout(timeoutId);
  }, [busqueda]); // Se ejecuta cada vez que cambia la busqeuda

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
      setBusqueda("");
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
      
      {/* Barra de busqeuda */}
      <Row className="justify-content-center mb-5">
        <Col md={8} lg={6}>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
                <Form.Control
                    placeholder="Buscar zapatillas"
                    aria-label="Buscar"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    style={{ padding: '10px' }}
                />
                {busqueda && (
                    <Button variant="outline-secondary" onClick={() => setBusqueda("")}>
                        ✕
                    </Button>
                )}
            </InputGroup>
            {busqueda && (
                 <p className="text-center text-muted small">
                    Buscando resultados similares a: <strong>"{busqueda}"</strong>
                 </p>
            )}
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
            <Spinner animation="border" role="status" variant="primary"/>
            <p className="mt-3">Cargando....</p>
        </div>
      ) : (
        <Row>
            <Col md={3} className="mb-4">
                <ProductFilters 
                    groups={filterConfig}
                    onClear={handleLimpiarTodo}
                    hasActiveFilters={marcasSeleccionadas.length > 0 || busqueda !== ""}
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
                            <h5 className="text-muted">No se ha encontrado ningun calzado</h5>
                            <p>Intentalo denuevo</p>
                            <Button variant="link" onClick={handleLimpiarTodo}>
                                Ver todos los productos
                            </Button>
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
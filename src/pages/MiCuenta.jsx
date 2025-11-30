import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Table, Badge, Button, Alert, Tab, Nav } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { UserService } from '../services/UserService';
import { SaleService } from '../services/SaleService';
import { uploadImage } from '../utils/uploadImage';
import InputFile from '../components/atoms/InputFile';
import Texto from '../components/atoms/Texto';

const MiCuenta = () => {
    const { user } = useAuth();
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [perfilData, setPerfilData] = useState({
        nombre: '',
        direccion: '',
        imagen: ''
    });
    const [msg, setMsg] = useState({ type: '', text: '' });

    useEffect(() => {
        if (user) {
            cargarDatos();
        }
    }, [user]);

    const cargarDatos = async () => {
        setLoading(true);
        const misCompras = await SaleService.getByUser(user.id);
        setCompras(misCompras);
        setPerfilData({
            nombre: user.nombre || '',
            direccion: user.direccion || '',
            imagen: user.imagen || ''
        });
        setLoading(false);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await UserService.update(user.id, perfilData);
            setMsg({ type: 'success', text: 'Perfil actualizado correctamente' });
            window.location.reload(); 
        } catch (error) {
            setMsg({ type: 'danger', text: 'Error al actualizar perfil' });
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setMsg({ type: 'info', text: 'Subiendo imagen...' });
        try {
            const url = await uploadImage(file);
            setPerfilData(prev => ({ ...prev, imagen: url }));
            setMsg({ type: 'success', text: 'Imagen cargada. Recuerda guardar los cambios.' });
        } catch (error) {
            setMsg({ type: 'danger', text: 'Error al subir imagen' });
        }
    };

    if (!user) return <Container className="my-5">Debes iniciar sesion</Container>;

    return (
        <Container className="my-5">
            <h2 className="mb-4">Mi Cuenta</h2>
            {msg.text && <Alert variant={msg.type}>{msg.text}</Alert>}

            <Tab.Container defaultActiveKey="datos">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column mb-4">
                            <Nav.Item>
                                <Nav.Link eventKey="datos">Mis Datos</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="compras">Historial de Compras</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="datos">
                                <Card className="p-4 shadow-sm">
                                    <div className="text-center mb-4">
                                        <img 
                                            src={perfilData.imagen || "https://via.placeholder.com/150"} 
                                            alt="Perfil" 
                                            className="rounded-circle mb-3"
                                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                        />
                                        <div style={{ maxWidth: '300px', margin: '0 auto' }}>
                                            <InputFile onChange={handleImageUpload} label="Cambiar Foto" />
                                        </div>
                                    </div>
                                    
                                    <Form onSubmit={handleUpdateProfile}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nombre Completo</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                value={perfilData.nombre} 
                                                onChange={(e) => setPerfilData({...perfilData, nombre: e.target.value})}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Direccion de Envio</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                value={perfilData.direccion} 
                                                onChange={(e) => setPerfilData({...perfilData, direccion: e.target.value})}
                                                placeholder="Calle, Numero, Comuna"
                                            />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">Actualizar Perfil</Button>
                                    </Form>
                                </Card>
                            </Tab.Pane>

                            <Tab.Pane eventKey="compras">
                                <Card className="p-4 shadow-sm">
                                    <h4>Mis Pedidos</h4>
                                    {compras.length === 0 ? (
                                        <p>No tienes compras registradas.</p>
                                    ) : (
                                        <Table responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Fecha</th>
                                                    <th>Total</th>
                                                    <th>Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {compras.map(compra => (
                                                    <tr key={compra.id}>
                                                        <td>{new Date(compra.fecha).toLocaleDateString()}</td>
                                                        <td>${compra.total.toLocaleString()}</td>                                        
                                                        <td>
                                                            <Badge bg={compra.estado === 'Entregado' ? 'success' : 'warning'}>
                                                                {compra.estado}
                                                            </Badge>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    )}
                                </Card>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default MiCuenta;
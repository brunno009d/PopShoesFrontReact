import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Tabs, Tab, Form, Spinner } from 'react-bootstrap';
import { MainService as MockDatabase } from '../../services/MainService';
import ProductModal from '../../components/organisms/ProductModal';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomeAdmin = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    // Estados de datos
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estados de UI
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Seguridad: Redirigir si no esta logueado o no es admin
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
        } else {
            loadAllData();
        }
    }, [user, navigate]);

    const loadAllData = async () => {
        setLoading(true);
        try {
            const [pData, uData, sData] = await Promise.all([
                MockDatabase.getProducts(),
                MockDatabase.getUsers(),
                MockDatabase.getSales()
            ]);
            setProducts(pData);
            setUsers(uData);
            setSales(sData);
        } catch (error) {
            console.error("Error cargando datos", error);
        } finally {
            setLoading(false);
        }
    };

    // Funciones de Productos
    const handleSaveProduct = async (formData) => {
        if (editingProduct) await MockDatabase.updateProduct(editingProduct.id, formData);
        else await MockDatabase.addProduct(formData);
        setIsModalOpen(false);
        loadAllData();
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm("Eliminar producto permanentemente?")) {
            await MockDatabase.deleteProduct(id);
            loadAllData();
        }
    };

    // Funciones de Usuarios
    const handleDeleteUser = async (id) => {
        if (window.confirm("Eliminar usuario?")) {
            try {
                await MockDatabase.deleteUser(id);
                loadAllData();
            } catch (e) { alert(e.message); }
        }
    };

    // Funciones de Ventas
    const handleStatusChange = async (id, newStatus) => {
        await MockDatabase.updateSaleStatus(id, newStatus);
        loadAllData();
    };

    // Evitar renderizado si no hay usuario (mientras redirige)
    if (!user) return null;

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Panel de Administracion</h2>
                <div className="d-flex gap-2 align-items-center">
                    <span className="text-muted me-2">Hola, {user.name}</span>
                    <Button variant="outline-dark" size="sm" onClick={logout}>Cerrar Sesion</Button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5"><Spinner animation="border" /></div>
            ) : (
                <Tabs defaultActiveKey="products" className="mb-3 bg-white rounded shadow-sm border-0 p-2">
                    <Tab eventKey="products" title="Productos">
                        <div className="bg-white p-3 rounded shadow-sm">
                            <div className="d-flex justify-content-end mb-3">
                                <Button variant="success" onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}>
                                    + Nuevo Producto
                                </Button>
                            </div>
                            <Table hover responsive>
                                <thead className="table-light">
                                    <tr><th>Img</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id} className="align-middle">
                                            <td>
                                                <img 
                                                    src={p.imagen} 
                                                    alt="p" 
                                                    width="40" 
                                                    height="40" 
                                                    className="rounded object-fit-cover"
                                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/40?text=X"; }} 
                                                />
                                            </td>
                                            <td>
                                                <div className="fw-bold">{p.titulo}</div>
                                                <small className="text-muted text-truncate d-block" style={{maxWidth: '200px'}}>
                                                    {p.descripcion}
                                                </small>
                                            </td>
                                            <td>${p.precio}</td>
                                            <td><Badge bg={p.stock > 5 ? 'success' : 'danger'}>{p.stock}</Badge></td>
                                            <td>
                                                <Button size="sm" variant="outline-primary" className="me-1" onClick={() => { setEditingProduct(p); setIsModalOpen(true); }}>Editar</Button>
                                                <Button size="sm" variant="outline-danger" onClick={() => handleDeleteProduct(p.id)}>Borrar</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>
                    <Tab eventKey="users" title="Usuarios">
                        <div className="bg-white p-3 rounded shadow-sm">
                            <Table hover>
                                <thead className="table-light"><tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Acciones</th></tr></thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u.id} className="align-middle">
                                            <td>{u.nombre}</td>
                                            <td>{u.email}</td>
                                            <td><Badge bg={u.role === 'admin' ? 'dark' : 'info'}>{u.role}</Badge></td>
                                            <td>
                                                {u.role !== 'admin' && (
                                                    <Button size="sm" variant="outline-danger" onClick={() => handleDeleteUser(u.id)}>Eliminar</Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>
                    <Tab eventKey="sales" title="Ventas">
                        <div className="bg-white p-3 rounded shadow-sm">
                            <Table hover>
                                <thead className="table-light"><tr><th>#ID</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Estado</th><th>Gestion</th></tr></thead>
                                <tbody>
                                    {sales.map(s => (
                                        <tr key={s.id} className="align-middle">
                                            <td>{s.id}</td>
                                            <td>{s.usuario}</td>
                                            <td>{s.fecha}</td>
                                            <td>${s.total.toLocaleString()}</td>
                                            <td>
                                                <Badge bg={s.estado === 'Entregado' ? 'success' : s.estado === 'Pendiente' ? 'warning' : 'primary'}>
                                                    {s.estado}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Form.Select size="sm" value={s.estado} onChange={(e) => handleStatusChange(s.id, e.target.value)}>
                                                    <option value="Pendiente">Pendiente</option>
                                                    <option value="Enviado">Enviado</option>
                                                    <option value="Entregado">Entregado</option>
                                                    <option value="Cancelado">Cancelado</option>
                                                </Form.Select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>
                </Tabs>
            )}

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSaveProduct}
                title={editingProduct ? "Editar Producto" : "Crear Producto"}
                submitText={editingProduct ? "Actualizar" : "Crear"}
                initialData={editingProduct}
            />
        </Container>
    );
};

export default HomeAdmin;
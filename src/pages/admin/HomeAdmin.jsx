import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Tabs, Tab, Form, Spinner, Alert } from 'react-bootstrap';
import { ProductService } from '../../services/ProductService';
import { UserService } from '../../services/UserService';
import { SaleService } from '../../services/SaleService';
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
    const [error, setError] = useState('');

    // Estados de UI
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        if (!user || (user.role !== 'admin' && user.rol?.id !== 1)) {
            navigate('/login');
        } else {
            loadAllData();
        }
    }, [user, navigate]);

    const loadAllData = async () => {
        setLoading(true);
        setError('');
        
        try {
            const pData = await ProductService.getAll();
            setProducts(pData);
        } catch (err) {
            console.error("Error cargando productos:", err);
            setError("Error al cargar productos. Revisa la consola.");
        }

        try {
            const uData = await UserService.getAll();
            setUsers(uData);
        } catch (err) {
            console.error("Error cargando usuarios:", err);
        }

        try {
            const sData = await SaleService.getAll();
            setSales(sData);
        } catch (err) {
            console.error("Error cargando ventas:", err);
        }

        setLoading(false);
    };
    const handleSaveProduct = async (formData) => {
        try {
            if (editingProduct) {
                await ProductService.update(editingProduct.id, formData);
            } else {
                await ProductService.create(formData);
            }
            
            setIsModalOpen(false);
            loadAllData(); 
        } catch (err) {
            alert("Error al guardar: " + err.message);
        }
    };

    // Eliminar Producto
    const handleDeleteProduct = async (id) => {
        if (window.confirm("¿Eliminar producto permanentemente?")) {
            try {
                await ProductService.delete(id);
                loadAllData();
            } catch (err) {
                alert("Error al eliminar: " + err.message);
            }
        }
    };

    // Eliminar Usuario
    const handleDeleteUser = async (id) => {
        if (window.confirm("¿Eliminar usuario?")) {
            try {
                await UserService.delete(id);
                loadAllData();
            } catch (e) { alert(e.message); }
        }
    };

    // Cambiar Estado de Venta
    const handleStatusChange = async (id, newStatus) => {
        try {
            await SaleService.updateStatus(id, newStatus);
            loadAllData();
        } catch (e) { alert(e.message); }
    };

    if (!user) return null;

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Panel de Administración</h2>
                <div className="d-flex gap-2 align-items-center">
                    <span className="text-muted me-2">Hola, {user.nombre || user.name}</span>
                    <Button variant="outline-dark" size="sm" onClick={logout}>Cerrar Sesión</Button>
                </div>
            </div>

            {error && <Alert variant="warning">{error}</Alert>}

            {loading ? (
                <div className="text-center py-5"><Spinner animation="border" /></div>
            ) : (
                <Tabs defaultActiveKey="products" className="mb-3 bg-white rounded shadow-sm border-0 p-2">
                    
                    <Tab eventKey="products" title={`Productos (${products.length})`}>
                        <div className="bg-white p-3 rounded shadow-sm">
                            <div className="d-flex justify-content-end mb-3">
                                <Button variant="success" onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}>
                                    + Nuevo Producto
                                </Button>
                            </div>
                            <Table hover responsive>
                                <thead className="table-light">
                                    <tr>
                                        <th>Img</th>
                                        <th>Nombre</th>
                                        <th>Marca/Género</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id} className="align-middle">
                                            <td>
                                                <img 
                                                    src={p.imagen} 
                                                    alt="p" 
                                                    width="50" 
                                                    height="50" 
                                                    className="rounded object-fit-cover border"
                                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/50?text=X"; }} 
                                                />
                                            </td>
                                            <td>
                                                <div className="fw-bold">{p.titulo}</div>
                                                <small className="text-muted text-truncate d-block" style={{maxWidth: '200px'}}>
                                                    {p.descripcion}
                                                </small>
                                            </td>
                                            <td>
                                                <Badge bg="secondary" className="me-1">{p.marca?.nombre || 'N/A'}</Badge>
                                                <Badge bg="light" text="dark">{p.genero?.nombre || 'N/A'}</Badge>
                                            </td>
                                            <td>${p.precio?.toLocaleString()}</td>
                                            <td>
                                                <Badge bg={p.stock > 5 ? 'success' : 'danger'}>{p.stock}</Badge>
                                            </td>
                                            <td>
                                                <Button size="sm" variant="outline-primary" className="me-1" onClick={() => { setEditingProduct(p); setIsModalOpen(true); }}>
                                                    Editar
                                                </Button>
                                                <Button size="sm" variant="outline-danger" onClick={() => handleDeleteProduct(p.id)}>
                                                    Borrar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && <tr><td colSpan="6" className="text-center">No hay productos registrados</td></tr>}
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
                                            <td>{u.nombre} {u.apaterno}</td>
                                            <td>{u.correo || u.email}</td>
                                            <td>
                                                <Badge bg={u.rol?.id === 1 ? 'dark' : 'info'}>
                                                    {u.rol?.id === 1 ? 'Admin' : 'Cliente'}
                                                </Badge>
                                            </td>
                                            <td>
                                                {u.rol?.id !== 1 && (
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
                            {sales.length === 0 ? (
                                <p className="text-center text-muted py-4">Aún no hay ventas registradas.</p>
                            ) : (
                                <Table hover>
                                    <thead className="table-light"><tr><th>#ID</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Estado</th><th>Gestión</th></tr></thead>
                                    <tbody>
                                        {sales.map(s => (
                                            <tr key={s.id} className="align-middle">
                                                <td>{s.id}</td>
                                                <td>
                                                    <div className="fw-bold">{s.usuario?.nombre || 'Desconocido'}</div>
                                                    <small className="text-muted">{s.usuario?.correo}</small>
                                                </td>
                                                <td>{new Date(s.fecha).toLocaleDateString()}</td>
                                                <td>${s.total?.toLocaleString()}</td>
                                                <td>
                                                    <Badge bg={
                                                        s.estado === 'Entregado' ? 'success' : 
                                                        s.estado === 'Cancelado' ? 'danger' : 
                                                        s.estado === 'Enviado' ? 'primary' : 'warning'
                                                    }>
                                                        {s.estado}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <Form.Select 
                                                        size="sm" 
                                                        value={s.estado} 
                                                        onChange={(e) => handleStatusChange(s.id, e.target.value)}
                                                        style={{minWidth: '120px'}}
                                                    >
                                                        <option value="Pendiente">Pendiente</option>
                                                        <option value="Pagado">Pagado</option>
                                                        <option value="Enviado">Enviado</option>
                                                        <option value="Entregado">Entregado</option>
                                                        <option value="Cancelado">Cancelado</option>
                                                    </Form.Select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
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
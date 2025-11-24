import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import InputFile from '../atoms/InputFile';
import { uploadImage } from '../../utils/uploadImage';

function ProductModal({ isOpen, onClose, onSubmit, title, submitText, loading, initialData }) {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagen: '',
        marcaId: '1', 
        generoId: '1'
    });
    
    const [uploading, setUploading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                titulo: initialData.titulo || '',
                descripcion: initialData.descripcion || '',
                precio: initialData.precio || '',
                stock: initialData.stock || 0,
                imagen: initialData.imagen || '',
                marcaId: initialData.marca?.id || '1',
                generoId: initialData.genero?.id || '1'
            });
        } else {
            setFormData({ titulo: '', descripcion: '', precio: '', stock: '', imagen: '', marcaId: '1', generoId: '1' });
        }
        setErrorMsg('');
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setErrorMsg('');
        try {
            const url = await uploadImage(file);
            setFormData(prev => ({ ...prev, imagen: url }));
        } catch (error) {
            console.error(error);
            setErrorMsg("Error al subir imagen. Verifica tu API Key.");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = () => {
        if (!formData.titulo || !formData.precio) {
            setErrorMsg("Nombre y Precio son obligatorios");
            return;
        }
        onSubmit(formData);
    };

    return (
        <Modal show={isOpen} onHide={onClose} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre del Producto</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="titulo" 
                            value={formData.titulo} 
                            onChange={handleChange} 
                        />
                    </Form.Group>
                    
                    <div className="row">
                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Marca</Form.Label>
                                <Form.Select name="marcaId" value={formData.marcaId} onChange={handleChange}>
                                    <option value="1">Nike</option>
                                    <option value="2">Adidas</option>
                                    <option value="3">Puma</option>
                                    <option value="4">Vans</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Género</Form.Label>
                                <Form.Select name="generoId" value={formData.generoId} onChange={handleChange}>
                                    <option value="1">Hombre</option>
                                    <option value="2">Mujer</option>
                                    <option value="3">Unisex</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            name="descripcion" 
                            value={formData.descripcion} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <div className="row">
                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Precio ($)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    name="precio" 
                                    value={formData.precio} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                        </div>
                        <div className="col-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    name="stock" 
                                    value={formData.stock} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <InputFile onChange={handleImageUpload} label="Imagen del Producto" />
                    
                    {uploading && <div className="text-info mb-2">Subiendo imagen a la nube...</div>}
                    {formData.imagen && formData.imagen.length > 0 && (
                        <div className="mb-3 text-center">
                            <p className="small text-muted">Vista previa:</p>
                            <img 
                                src={formData.imagen} 
                                alt="Preview" 
                                style={{ maxHeight: '100px' }} 
                                className="img-fluid rounded" 
                            />
                        </div>
                    )}

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button 
                    variant="primary" 
                    onClick={handleSubmit} 
                    disabled={loading || uploading}
                >
                    {loading ? <Spinner as="span" animation="border" size="sm" /> : submitText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProductModal;
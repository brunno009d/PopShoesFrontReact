import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FormularioRegistro = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        a_paterno: "",
        a_materno: "",
        run: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); 
    };

    return (
        <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white" style={{ minWidth: "350px" }}>
            <h4 className="mb-3">Registro</h4>

            <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Apellido Paterno</Form.Label>
                <Form.Control
                    name="a_paterno"
                    value={formData.a_paterno}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Apellido Materno</Form.Label>
                <Form.Control
                    name="a_materno"
                    value={formData.a_materno}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>RUN</Form.Label>
                <Form.Control
                    name="run"
                    value={formData.run}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Button type="submit" className="w-100">
                Registrarse
            </Button>
        </Form>
    );
};

export default FormularioRegistro;

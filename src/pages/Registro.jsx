import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import FormularioRegistro from '../components/organisms/FormularioRegistro';

const Registro = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const manejarEnvio = async (formData) => {
        const resultado = await register(formData);

        if (resultado.success) {
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            navigate('/login');
        } else {
            alert('Error al registrar: ' + resultado.message);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <FormularioRegistro onSubmit={manejarEnvio} />

            <Link
                to="/login"
                className="position-absolute bottom-0 mb-4 text-decoration-none"
            >
                ¿Ya tienes cuenta? Inicia sesión
            </Link>
        </Container>
    );
};

export default Registro;

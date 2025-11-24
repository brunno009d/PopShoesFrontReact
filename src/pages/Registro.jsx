import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Boton from '../components/atoms/Boton';
import Texto from '../components/atoms/Texto';
import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; 

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [errores, setErrores] = useState({});
  
  const navigate = useNavigate();
  const { register } = useAuth(); 

  const manejarEnvio = async (e) => { 
    e.preventDefault();
    const nuevosErrores = {};

    if (!nombre.trim()) nuevosErrores.nombre = 'Por favor ingresa tu nombre';
    if (!email.trim()) nuevosErrores.email = 'Por favor ingresa tu correo';
    if (!clave.trim()) nuevosErrores.clave = 'Por favor ingresa tu clave';

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      const resultado = await register({ nombre, email, clave });

      if (resultado.success) {
        alert('Registro exitoso en la base de datos. Ahora puedes iniciar sesion.');
        navigate('/login');
      } else {
        alert('Error al registrar: ' + resultado.message);
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={manejarEnvio}
        className="bg-white p-4 rounded-4 shadow w-100"
        style={{ maxWidth: '380px' }}
        noValidate
      >
        <Texto variant="h2" className="text-center mb-4 fw-bold">Crear cuenta</Texto>

        <Container className="mb-3">
          <input
            type="text"
            id="nombre" 
            name="nombre" 
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
            autoComplete="name"
          />
          {errores.nombre && <Container className="invalid-feedback">{errores.nombre}</Container>}
        </Container>

        <Container className="mb-3">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo electronico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control ${errores.email ? 'is-invalid' : ''}`}
            autoComplete="email"
          />
          {errores.email && <Container className="invalid-feedback">{errores.email}</Container>}
        </Container>

        <Container className="mb-4">
          <input
            type="password"
            id="clave"
            name="clave"
            placeholder="Clave"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className={`form-control ${errores.clave ? 'is-invalid' : ''}`}
            autoComplete="new-password"
          />
          {errores.clave && <Container className="invalid-feedback">{errores.clave}</Container>}
        </Container>

        <Boton type="submit" variant="success" className="w-100">
          Registrarse
        </Boton>

        <Texto variant="p" className="text-center mt-3">
          Ya tienes cuenta?{' '}
          <Link to="/login" className="text-decoration-none">
            Inicia sesion
          </Link>
        </Texto>
      </form>
    </Container>
  );
};

export default Registro;
import { useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Boton from '../components/atoms/Boton';
import Texto from '../components/atoms/Texto';
import { Container } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!email.trim()) nuevosErrores.email = 'Por favor ingresa tu correo';
    if (!clave.trim()) nuevosErrores.clave = 'Por favor ingresa tu contraseña';

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioRegistrado'));

      if (usuarioGuardado && usuarioGuardado.email === email && usuarioGuardado.clave === clave) {
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioGuardado));
        alert(`Bienvenido, ${usuarioGuardado.nombre}`);
        navigate('/');
      } else {
        alert('Correo o contraseña incorrectos');
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
        <Texto variant="h2" className="text-center mb-4 fw-bold">Iniciar sesión</Texto>

        <Container className="mb-3">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control ${errores.email ? 'is-invalid' : ''}`}
          />
          {errores.email && <Container className="invalid-feedback">{errores.email}</Container>}
        </Container>

        <Container className="mb-4">
          <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className={`form-control ${errores.clave ? 'is-invalid' : ''}`}
          />
          {errores.clave && <Container className="invalid-feedback">{errores.clave}</Container>}
        </Container>

        <Boton type="submit" variant="primary" className="w-100">
          Entrar
        </Boton>

        <Texto variant="p" className="text-center mt-3">
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="text-decoration-none">
            Regístrate aquí
          </Link>
        </Texto>
      </form>
    </Container>
  );
};

export default Login;
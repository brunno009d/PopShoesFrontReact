import { useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Boton from '../components/atoms/Boton';
import Texto from '../components/atoms/Texto';
import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();
  
  const { login } = useAuth(); 

  // CAMBIO 1: Agregamos 'async' aquí
  const manejarEnvio = async (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!email.trim()) nuevosErrores.email = 'Por favor ingresa tu correo';
    if (!clave.trim()) nuevosErrores.clave = 'Por favor ingresa tu clave';

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      
      try {
          // CAMBIO 2: Agregamos 'await' aquí para esperar a que Render responda
          const resultado = await login(email, clave);

          if (resultado.success) {
            if (resultado.role === 'admin') {
                navigate('/admin'); 
            } else {
                alert('Bienvenido de nuevo');
                navigate('/');
            }
          } else {
            // Aquí capturamos si la contraseña está mal
            alert(resultado.message || 'Correo o clave incorrectos');
          }
      } catch (error) {
          console.error("Error en login:", error);
          alert("Hubo un error de conexión");
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
        <Texto variant="h2" className="text-center mb-4 fw-bold">Iniciar sesion</Texto>

        <Container className="mb-3">
          <input
            type="email"
            placeholder="Correo electronico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control ${errores.email ? 'is-invalid' : ''}`}
          />
          {errores.email && <Container className="invalid-feedback">{errores.email}</Container>}
        </Container>

        <Container className="mb-4">
          <input
            type="password"
            placeholder="Clave"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className={`form-control ${errores.clave ? 'is-invalid' : ''}`}
          />
          {errores.clave && <Container className="invalid-feedback">{errores.clave}</Container>}
        </Container>

        <Boton type="submit" variant="primary" className="w-100">
          Entrar
        </Boton>

        <div className="mt-3 text-center text-muted small">
            {/* Ojo: el usuario que creaste es admin@popshoes.com, ajusta este texto si quieres recordar el real */}
            <small>Usuario creado: admin@popshoes.com / 123456</small>
        </div>

        <Texto variant="p" className="text-center mt-3">
          No tienes cuenta?{' '}
          <Link to="/registro" className="text-decoration-none">
            Registrate aqui
          </Link>
        </Texto>
      </form>
    </Container>
  );
};

export default Login;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!nombre.trim()) nuevosErrores.nombre = 'Por favor ingresa tu nombre';
    if (!email.trim()) nuevosErrores.email = 'Por favor ingresa tu correo';
    if (!clave.trim()) nuevosErrores.clave = 'Por favor ingresa tu contraseña';

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      const nuevoUsuario = { nombre, email, clave };
      localStorage.setItem('usuarioRegistrado', JSON.stringify(nuevoUsuario));

      alert('Registro completado con éxito. Ahora puedes iniciar sesión.');
      navigate('/login');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={manejarEnvio}
        className="bg-white p-4 rounded-4 shadow w-100"
        style={{ maxWidth: '380px' }}
        noValidate
      >
        <h2 className="text-center mb-4 fw-bold">Crear cuenta</h2>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
          />
          {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control ${errores.email ? 'is-invalid' : ''}`}
          />
          {errores.email && <div className="invalid-feedback">{errores.email}</div>}
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className={`form-control ${errores.clave ? 'is-invalid' : ''}`}
          />
          {errores.clave && <div className="invalid-feedback">{errores.clave}</div>}
        </div>

        <button type="submit" className="btn btn-success w-100">
          Registrarse
        </button>

        <p className="text-center mt-3">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-decoration-none">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registro;

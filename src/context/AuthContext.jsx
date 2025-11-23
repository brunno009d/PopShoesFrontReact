import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem('usuario');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const login = async (email, contrasena) => { 
    try {
        // 1. LIMPIEZA PREVENTIVA
        // A veces tokens viejos de pruebas anteriores causan ruido
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        console.log("1. [LOGIN] Intentando logear con:", email);

        // 2. PAYLOAD EXACTO (Java espera 'correo' y 'contrasena')
        const payload = { 
            correo: email,       // Mapeo: email -> correo
            contrasena: contrasena 
        };
        
        console.log("2. [LOGIN] Enviando a Backend:", JSON.stringify(payload));

        // 3. PETICIÓN
        const usuarioData = await api.post('/api/usuarios/login', payload);
        
        console.log("3. [LOGIN] Respuesta del Backend:", usuarioData);
        
        if (usuarioData && usuarioData.id) {
            // Simulamos un token (o usamos el ID si no hay JWT real aun)
            const tokenSimulado = 'token-falso-' + usuarioData.id;
            localStorage.setItem('token', tokenSimulado);
            
            // Calculamos el rol
            const rolId = usuarioData.rol ? usuarioData.rol.id : 2;
            const rolNombre = (rolId === 1) ? 'admin' : 'user';
            
            const usuarioConRol = { ...usuarioData, role: rolNombre };
            
            setUser(usuarioConRol);
            localStorage.setItem('usuario', JSON.stringify(usuarioConRol));

            return { success: true, role: rolNombre };
        }
        
        return { success: false, message: 'Credenciales incorrectas (Backend devolvió null)' };

    } catch (error) {
        console.error("Error Login:", error);
        return { success: false, message: error.message || 'Error de conexión' };
    }
};

    // REGISTRO CON DIAGNOSTICO
    const register = async (userData) => {
        try {
            console.log("1. [DIAGNOSTICO] Datos del form:", userData);

            // 1. Obtener contraseña (asegura compatibilidad con distintos names)
            const passwordToSend = userData.clave || userData.password || userData.contrasena;
            if (!passwordToSend) throw new Error("La contraseña es obligatoria");

            // 2. Generar RUN aleatorio (SOLO PARA EVITAR ERROR 'UNIQUE' EN PRUEBAS)
            // PostgreSQL en Render fallará si intentas registrar el mismo RUN dos veces.
            const runAleatorio = Math.floor(Math.random() * 10000000) + "-9";

            // 3. Payload EXACTO para tu Modelo Java
            const payload = {
                // Datos del formulario
                nombre: userData.nombre || "Usuario Sin Nombre",
                correo: userData.email, // Asegúrate que tu input sea name="email"
                contrasena: passwordToSend,

                // DATOS DE RELLENO (Obligatorios por tu BD)
                run: userData.run || runAleatorio,
                apaterno: userData.apaterno || "ApellidoPaterno",
                amaterno: userData.amaterno || "ApellidoMaterno",

                // Fechas en formato ISO (Seguro para Spring Boot)
                fechaNacimiento: "2000-01-01T00:00:00.000Z",
                fechaCreacion: new Date().toISOString(),

                // Relación con Rol (ID 2 = Cliente/User)
                rol: { id: 2 }
            };

            console.log("2. [ENVIANDO] Payload a Java:", JSON.stringify(payload));

            // 4. Petición
            // NOTA: Asegúrate que api.post usa la URL correcta
            const response = await api.post('/api/usuarios', payload);

            console.log("3. [EXITO] Usuario creado:", response);
            return { success: true };

        } catch (error) {
            console.error("Error Registro:", error);
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
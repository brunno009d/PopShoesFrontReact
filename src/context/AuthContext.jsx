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
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        console.log("1. [LOGIN] Intentando logear con:", email);
        const payload = { 
            correo: email,     
            contrasena: contrasena 
        };
        
        console.log("2. [LOGIN] Enviando a Backend:", JSON.stringify(payload));

        const usuarioData = await api.post('/api/usuarios/login', payload);
        
        console.log("3. [LOGIN] Respuesta del Backend:", usuarioData);
        
        if (usuarioData && usuarioData.id) {
            const tokenSimulado = 'token-falso-' + usuarioData.id;
            localStorage.setItem('token', tokenSimulado);
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

    const register = async (userData) => {
        try {
            console.log("1. [DIAGNOSTICO] Datos del form:", userData);

            const passwordToSend = userData.clave || userData.password || userData.contrasena;
            if (!passwordToSend) throw new Error("La contraseña es obligatoria");
            const runAleatorio = Math.floor(Math.random() * 10000000) + "-9";

            const payload = {
                nombre: userData.nombre || "Usuario Sin Nombre",
                correo: userData.email, 
                contrasena: passwordToSend,

                run: userData.run || runAleatorio,
                apaterno: userData.apaterno || "ApellidoPaterno",
                amaterno: userData.amaterno || "ApellidoMaterno",
                fechaNacimiento: "2000-01-01T00:00:00.000Z",
                fechaCreacion: new Date().toISOString(),

                rol: { id: 2 }
            };

            console.log("2. [ENVIANDO] Payload a Java:", JSON.stringify(payload));
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
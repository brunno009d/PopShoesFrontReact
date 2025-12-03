import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';

// Contexto GLobal
const AuthContext = createContext();
// Forma de acceder mas facil al contexto
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Recuperar al usuario del localStorage
    useEffect(() => {
        const userData = localStorage.getItem('usuario');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    // Login
    const login = async (email, contrasena) => { 
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        const payload = { 
            correo: email,     
            contrasena: contrasena 
        };

        // Esperar un usuario del backend
        const usuarioData = await api.post('/api/usuarios/login', payload);
        
        // En caso de que encuentre al usuario
        if (usuarioData && usuarioData.id) {
            const tokenSimulado = 'token-falso-' + usuarioData.id;
            localStorage.setItem('token', tokenSimulado);

            // Verificar si es usuario o admin
            const rolId = usuarioData.rol ? usuarioData.rol.id : 2;
            const rolNombre = (rolId === 1) ? 'admin' : 'user';
            
            const usuarioConRol = { ...usuarioData, role: rolNombre };
            
            // Guardar usuario
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

    // Registrar al usuario y crearlo en el backend
    const register = async (userData) => {
        try {

            const passwordToSend = userData.clave || userData.password || userData.contrasena;
            if (!passwordToSend) throw new Error("La contraseña es obligatoria");
            const runAleatorio = Math.floor(Math.random() * 10000000) + "-9";

            const payload = {
                nombre: userData.nombre || "Usuario Sin Nombre",
                correo: userData.email, 
                contrasena: passwordToSend,
                imagenUsuario: userData.iimagenUsuario,
                run: userData.run || runAleatorio,
                apaterno: userData.a_paterno || "ApellidoPaterno",
                amaterno: userData.a_materno || "ApellidoMaterno",
                fechaNacimiento: "2000-01-01T00:00:00.000Z",
                fechaCreacion: new Date().toISOString(),
                rol: { id: 2 }
            };

            const response = await api.post('/api/usuarios', payload);
            return { success: true };
        } catch (error) {
            console.error("Error Registro:", error);
            return { success: false, message: error.message };
        }
    };

    // Salir de la cuenta
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = '/login';
    };

    // Dar los datos y funciones a toda la app
    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
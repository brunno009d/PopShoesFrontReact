import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('usuarioLogueado');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // 4. Funcion de Login
    const login = (email, password) => {
        
        // ADMINISTRADOR Credenciales fijas
        if (email === 'admin@zapatillas.com' && password === 'admin123') {
            const adminUser = { 
                id: 'admin_01', 
                nombre: 'Administrador', 
                email: email, 
                role: 'admin' // Rol clave para entrar al panel
            };
            setUser(adminUser);
            localStorage.setItem('usuarioLogueado', JSON.stringify(adminUser));
            return { success: true, role: 'admin' };
        }

        // Verificación de USUARIO 
        const usuarioRegistrado = JSON.parse(localStorage.getItem('usuarioRegistrado'));

        if (usuarioRegistrado && usuarioRegistrado.email === email && usuarioRegistrado.clave === password) {
            const normalUser = { 
                ...usuarioRegistrado, 
                role: 'user' 
            };
            setUser(normalUser);
            localStorage.setItem('usuarioLogueado', JSON.stringify(normalUser));
            return { success: true, role: 'user' };
        }

        return { success: false, message: 'Credenciales incorrectas' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('usuarioLogueado');
        window.location.href = '/login'; 
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
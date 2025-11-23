import { api } from './api';

export const MainService = {
    // --- PRODUCTOS (CALZADOS) ---
    getProducts: async () => {
        // CORRECCIÓN 1: La ruta real es /api/calzados
        const data = await api.get('/api/calzados');
        
        // CORRECCIÓN 2: Traductor de variables (Java -> React)
        // Si tu Java devuelve "nombre", aquí lo convertimos a "titulo" para que React lo entienda
        return data.map(item => ({
            id: item.id,
            titulo: item.nombre || item.titulo, // Java usa 'nombre', React usa 'titulo'
            precio: item.precio,
            imagen: item.imagen,
            stock: item.stock,
            descripcion: item.descripcion,
            marca: item.marca, 
            genero: item.genero,
            // Mantenemos el objeto original por si acaso
            ...item 
        }));
    },

    addProduct: async (prodData) => {
        // Adaptamos el objeto para enviarlo como Java lo espera (usando 'nombre')
        const payload = {
            ...prodData,
            nombre: prodData.titulo // React envía titulo, Java guarda nombre
        };
        return await api.post('/api/calzados', payload);
    },
    
    updateProduct: async (id, prodData) => {
        const payload = { ...prodData, nombre: prodData.titulo };
        return await api.put(`/api/calzados/${id}`, payload);
    },
    
    deleteProduct: async (id) => {
        return await api.delete(`/api/calzados/${id}`);
    },

    // --- USUARIOS ---
    // Asumo que tus controladores de usuarios también empiezan con /api
    getUsers: async () => {
        return await api.get('/api/usuarios'); // Ajusta si es /users
    },
    
    updateUser: async (id, userData) => {
        const updatedUser = await api.put(`/api/usuarios/${id}`, userData);
        
        const currentUser = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')) : null;
        if (currentUser && currentUser.id === id) {
            const newSession = { ...currentUser, ...updatedUser };
            localStorage.setItem('usuario', JSON.stringify(newSession));
        }
        return updatedUser;
    },
    
    deleteUser: async (id) => {
        return await api.delete(`/api/usuarios/${id}`);
    },

    // --- VENTAS ---
    getSales: async () => {
        return await api.get('/api/ventas'); // Ajusta si es /sales
    },
    
    getSalesByUserId: async (userId) => {
        return await api.get(`/api/ventas/usuario/${userId}`); // Ajusta según tu Controller de Ventas
    },

    addSale: async (saleData) => {
        return await api.post('/api/ventas', saleData);
    },

    updateSaleStatus: async (id, newStatus) => {
        return await api.put(`/api/ventas/${id}`, { estado: newStatus }); // Ajusta si es PATCH o PUT
    }
};
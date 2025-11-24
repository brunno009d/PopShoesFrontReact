import { api } from './api';

export const MainService = {
    getProducts: async () => {
        const data = await api.get('/api/calzados');
        if (!Array.isArray(data)) return [];
        return data.map(item => ({
            id: item.id,
            titulo: item.nombre || item.titulo,
            precio: item.precio,
            imagen: item.imagen,
            stock: item.stock,
            descripcion: item.descripcion,
            marca: item.marca,
            genero: item.genero,
            ...item
        }));
    },

    addProduct: async (prodData) => {
        const payload = {
            nombre: prodData.titulo,
            descripcion: prodData.descripcion,
            precio: prodData.precio,
            stock: prodData.stock,
            urlImagenInput: prodData.imagen, 
            marca: { id: prodData.marcaId }, 
            genero: { id: prodData.generoId }
        };
        return await api.post('/api/calzados', payload);
    },
    
    // --- CAMBIO AQUI: Usamos PATCH ---
    updateProduct: async (id, prodData) => {
        const payload = {
            nombre: prodData.titulo,
            descripcion: prodData.descripcion,
            precio: prodData.precio,
            stock: prodData.stock,
            urlImagenInput: prodData.imagen,
            
            marca: prodData.marcaId ? { id: prodData.marcaId } : undefined,
            genero: prodData.generoId ? { id: prodData.generoId } : undefined
        };
        // Cambiamos .put por .patch
        return await api.patch(`/api/calzados/${id}`, payload);
    },
    
    deleteProduct: async (id) => {
        return await api.delete(`/api/calzados/${id}`);
    },

    getUsers: async () => {
        return await api.get('/api/usuarios');
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

    getSales: async () => {
        return await api.get('/api/ventas');
    },
    
    getSalesByUserId: async (userId) => {
        return await api.get(`/api/ventas/usuario/${userId}`);
    },

    addSale: async (saleData) => {
        return await api.post('/api/ventas', saleData);
    },

    updateSaleStatus: async (id, newStatus) => {
        return await api.put(`/api/ventas/${id}`, { estado: newStatus });
    }
};
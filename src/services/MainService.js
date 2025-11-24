import { api } from './api';

export const MainService = {
    // --- PRODUCTOS (CALZADOS) ---
    getProducts: async () => {
    const response = await api.get('/api/calzados');
    const data = response.data; // <-- AQUÍ ESTÁ LA CLAVE

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
        // Mapeo de escritura (React -> Java)
        const payload = {
            nombre: prodData.titulo,
            descripcion: prodData.descripcion,
            precio: prodData.precio,
            stock: prodData.stock,
            urlImagenInput: prodData.imagen, 
            
            // 2. RELACIONES: Java espera objetos, no solo IDs sueltos
            marca: { id: prodData.marcaId }, 
            genero: { id: prodData.generoId }
        };
        
        return await api.post('/api/calzados', payload);
    },
    
    updateProduct: async (id, prodData) => {
        const payload = {
            nombre: prodData.titulo,
            descripcion: prodData.descripcion,
            precio: prodData.precio,
            stock: prodData.stock,
            urlImagenInput: prodData.imagen,
            
            // Validamos que existan antes de enviarlos para evitar errores en edición
            marca: prodData.marcaId ? { id: prodData.marcaId } : undefined,
            genero: prodData.generoId ? { id: prodData.generoId } : undefined
        };
        return await api.put(`/api/calzados/${id}`, payload);
    },
    
    deleteProduct: async (id) => {
        return await api.delete(`/api/calzados/${id}`);
    },

    // --- USUARIOS ---
    getUsers: async () => {
        return await api.get('/api/usuarios');
    },
    
    updateUser: async (id, userData) => {
        const updatedUser = await api.put(`/api/usuarios/${id}`, userData);
        
        // Actualizar sesión si el usuario se editó a sí mismo
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
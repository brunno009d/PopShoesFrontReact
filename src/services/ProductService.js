import { api } from './api';

export const ProductService = {
    getAll: async () => {
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

    getById: async (id) => {
        const item = await api.get(`/api/calzados/${id}`);
        return {
            id: item.id,
            titulo: item.nombre || item.titulo,
            precio: item.precio,
            imagen: item.imagen,
            stock: item.stock,
            descripcion: item.descripcion,
            marca: item.marca,
            genero: item.genero,
            ...item
        };
    },

    getByName: async (nombre) => {
        // Usamos encodeURIComponent para manejar espacios de los nombres dee las zapas
        const data = await api.get(`/api/calzados/buscar/nombre?nombre=${encodeURIComponent(nombre)}`);
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

    create: async (prodData) => {
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
    
    update: async (id, prodData) => {
        const payload = {
            nombre: prodData.titulo,
            descripcion: prodData.descripcion,
            precio: prodData.precio,
            stock: prodData.stock,
            urlImagenInput: prodData.imagen,
            marca: prodData.marcaId ? { id: prodData.marcaId } : undefined,
            genero: prodData.generoId ? { id: prodData.generoId } : undefined
        };
        return await api.patch(`/api/calzados/${id}`, payload);
    },
    
    delete: async (id) => {
        return await api.delete(`/api/calzados/${id}`);
    }
};
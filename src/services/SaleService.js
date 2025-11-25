import { api } from './api';

export const SaleService = {
    getAll: async () => {
        return await api.get('/api/compras');
    },
    
    getByUser: async (userId) => {
        return await api.get(`/api/compras/usuario/${userId}`);
    },

    create: async (saleData) => {
        const payload = {
            total: saleData.total,
            direccion: saleData.direccion,
            envioNombre: saleData.envio, 
            pagoNombre: saleData.pago,
            usuario: { id: saleData.usuario_id },
            detalles: saleData.detalle.map(item => ({
                cantidad: item.cantidad,
                calzado: { id: item.id },
                precioUnitario: item.precio,
                subtotal: item.precio * item.cantidad
            }))
        };
        return await api.post('/api/compras', payload);
    },

    updateStatus: async (id, newStatus) => {
        return await api.patch(`/api/compras/${id}/estado`, { estado: newStatus });
    }
};
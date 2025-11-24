import { api } from './api';

export const UserService = {
    getAll: async () => {
        return await api.get('/api/usuarios');
    },
    
    update: async (id, userData) => {
        const updatedUser = await api.patch(`/api/usuarios/${id}`, userData);
        
        // Actualizamos la sesión local si es necesario
        const currentUser = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')) : null;
        if (currentUser && currentUser.id === id) {
            const newSession = { ...currentUser, ...updatedUser };
            localStorage.setItem('usuario', JSON.stringify(newSession));
        }
        return updatedUser;
    },
    
    delete: async (id) => {
        return await api.delete(`/api/usuarios/${id}`);
    }
};
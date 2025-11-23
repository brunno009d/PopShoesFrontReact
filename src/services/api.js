const API_URL = import.meta.env.VITE_API_URL;

// Helper: Busca el token en la caja fuerte (localStorage) del navegador
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    } : { 
        'Content-Type': 'application/json' 
    };
};

export const api = {
    // Peticion GET (Leer datos desde React hacia Java)
    get: async (endpoint) => {
        try {
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'GET',
                headers: getAuthHeaders()
            });
            if (!res.ok) throw new Error(`Error GET ${endpoint}`);
            return await res.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    // Peticion POST (Enviar datos: Login, Registro, Crear Prod)
    post: async (endpoint, body) => {
        try {
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(body)
            });
            
            // Manejo seguro por si el backend no devuelve JSON
            const text = await res.text();
            const data = text ? JSON.parse(text) : {};
            
            if (!res.ok) throw new Error(data.message || `Error POST ${endpoint}`);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    // Peticion PUT (Actualizar datos)
    put: async (endpoint, body) => {
        try {
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(body)
            });
            if (!res.ok) throw new Error(`Error PUT ${endpoint}`);
            return await res.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    // Peticion DELETE (Borrar datos)
    delete: async (endpoint) => {
        try {
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            if (!res.ok) throw new Error(`Error DELETE ${endpoint}`);
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};
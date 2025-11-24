const API_URL = import.meta.env.VITE_API_URL;

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

    post: async (endpoint, body) => {
        try {
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(body)
            });
            const text = await res.text();
            const data = text ? JSON.parse(text) : {};
            if (!res.ok) throw new Error(data.message || `Error POST ${endpoint}`);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

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

    patch: async (endpoint, body) => {
        try {
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify(body)
            });
            if (!res.ok) throw new Error(`Error PATCH ${endpoint}`);
            return await res.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

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
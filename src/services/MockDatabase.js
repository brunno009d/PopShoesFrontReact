import productsData from '../data/calzados'; 

// Datos iniciales de usuarios
const initialUsers = [
    { id: 1, nombre: "Admin Principal", email: "admin@zapatillas.com", role: "admin", direccion: "Oficina Central", imagen: "" },
    { id: 2, nombre: "Juan Cliente", email: "cliente@gmail.com", role: "user", direccion: "Av. Siempre Viva 123", imagen: "" }
];

// Datos iniciales de ventas
const initialSales = [
    { id: 101, usuario_id: 2, usuario: "Juan Cliente", total: 112000, fecha: "2023-11-20", estado: "Pendiente", items: 1, envio: "BlueExpress" },
    { id: 102, usuario_id: 2, usuario: "Juan Cliente", total: 89000, fecha: "2023-11-18", estado: "Entregado", items: 2, envio: "Chilexpress" },
];

const getStorage = (key, initial) => {
    const stored = localStorage.getItem(key);
    if (!stored) {
        localStorage.setItem(key, JSON.stringify(initial));
        return initial;
    }
    return JSON.parse(stored);
};

const setStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const MockDatabase = {
    // --- PRODUCTOS ---
    getProducts: async () => {
        return new Promise(resolve => setTimeout(() => resolve(getStorage('db_products', productsData)), 500));
    },
    addProduct: async (prod) => {
        const products = getStorage('db_products', productsData);
        const newProd = { ...prod, id: Date.now(), stock: parseInt(prod.stock) || 0, precio: parseInt(prod.precio) || 0 };
        products.push(newProd);
        setStorage('db_products', products);
    },
    updateProduct: async (id, data) => {
        const products = getStorage('db_products', productsData);
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...data };
            setStorage('db_products', products);
        }
    },
    deleteProduct: async (id) => {
        const products = getStorage('db_products', productsData);
        const filtered = products.filter(p => p.id !== id);
        setStorage('db_products', filtered);
    },

    // --- USUARIOS ---
    getUsers: async () => new Promise(resolve => setTimeout(() => resolve(getStorage('db_users', initialUsers)), 400)),
    
    // funcion para actualizar perfil de usuario
    updateUser: async (id, newData) => {
        const users = getStorage('db_users', initialUsers);
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...newData };
            setStorage('db_users', users);
            const currentUser = JSON.parse(localStorage.getItem('usuarioLogueado'));
            if (currentUser && currentUser.id === id) {
                const updatedSession = { ...currentUser, ...newData };
                localStorage.setItem('usuarioLogueado', JSON.stringify(updatedSession));
            }
            return users[index];
        }
        throw new Error("Usuario no encontrado");
    },
    deleteUser: async (id) => {
        const users = getStorage('db_users', initialUsers);
        if (users.find(u => u.id === id)?.role === 'admin') throw new Error("No puedes borrar al admin");
        setStorage('db_users', users.filter(u => u.id !== id));
    },

    // --- VENTAS ---
    getSales: async () => new Promise(resolve => setTimeout(() => resolve(getStorage('db_sales', initialSales)), 400)),
    
    // Obtener ventas solo de un usuario especifico
    getSalesByUserId: async (userId) => {
        const sales = getStorage('db_sales', initialSales);
        return new Promise(resolve => 
            setTimeout(() => resolve(sales.filter(s => s.usuario_id === userId)), 400)
        );
    },

    addSale: async (saleData) => {
        const sales = getStorage('db_sales', initialSales);
        const newSale = { 
            ...saleData, 
            id: Date.now(), 
            fecha: new Date().toLocaleDateString(),
            estado: 'Pendiente'
        };
        sales.push(newSale);
        setStorage('db_sales', sales);
        return newSale;
    },

    updateSaleStatus: async (id, newStatus) => {
        const sales = getStorage('db_sales', initialSales);
        const index = sales.findIndex(s => s.id === id);
        if (index !== -1) {
            sales[index].estado = newStatus;
            setStorage('db_sales', sales);
        }
    }
};
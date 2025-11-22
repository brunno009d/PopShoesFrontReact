import React, { createContext, useState, useContext, useEffect } from 'react';

const CarritoContext = createContext();

export const useCart = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
        try {
            const storedCart = localStorage.getItem('carrito');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    // FUNCION AGREGAR 
    const agregarCarrito = (producto, cantidad = 1) => {
        setCarrito(prevCarrito => {
            const stockMax = producto.stock !== undefined ? producto.stock : 0;

            if (stockMax <= 0) {
                alert("Lo sentimos, este producto esta agotado o no tiene stock definido.");
                return prevCarrito; 
            }

            const itemIndex = prevCarrito.findIndex(item => item.id === producto.id);
            
            if (itemIndex >= 0) {
                const newCarrito = [...prevCarrito];
                const itemActual = newCarrito[itemIndex];
                if (itemActual.cantidad + cantidad <= stockMax) {
                    newCarrito[itemIndex] = {
                        ...itemActual,
                        cantidad: itemActual.cantidad + cantidad
                    };
                } else {
                    alert(`Stock insuficiente. Solo quedan ${stockMax} unidades y ya tienes ${itemActual.cantidad} en el carrito.`);
                }
                return newCarrito;
            } else {
                if (cantidad <= stockMax) {
                    return [...prevCarrito, { ...producto, cantidad }];
                } else {
                    alert(`No puedes agregar ${cantidad} unidades. Solo hay ${stockMax} disponibles.`);
                    return prevCarrito;
                }
            }
        });
    };

    // FUNCION ELIMINAR
    const eliminarCarrito = (id) => {
        setCarrito(prev => prev.filter(item => item.id !== id));
    };

    // FUNCION VACIAR
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    // FUNCION ACTUALIZAR CANTIDAD 
    const actualizarCantidad = (id, nuevaCantidad) => {
        setCarrito(prev => prev.map(item => {
            if (item.id === id) {
                const stockMax = item.stock !== undefined ? item.stock : 0;
                const cantidadValida = Math.max(1, Math.min(nuevaCantidad, stockMax));
                
                return { ...item, cantidad: cantidadValida };
            }
            return item;
        }));
    };

    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const precioTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    return (
        <CarritoContext.Provider value={{
            carrito,
            agregarCarrito,
            eliminarCarrito,
            vaciarCarrito,
            actualizarCantidad, 
            cantidadTotal,
            precioTotal,
            actualizarNumeroCarrito: cantidadTotal 
        }}>
            {children}
        </CarritoContext.Provider>
    );
};

export default CarritoContext;
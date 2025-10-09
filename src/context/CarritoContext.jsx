import React, { createContext, useContext, useState, useEffect } from "react";

const CarritoContexto = createContext();

export const CarritoProvider = ({children}) => {
    const [carrito, setCarrito] = useState(() => {
        const carritoGuardado = localStorage.getItem('carrito');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const agregarCarrito = (calzado) => {
        setCarrito((prevCarrito) => {
            const CalzadoActual = prevCarrito.findIndex(
                (articulo) => articulo.id === calzado.id
            );
            if(CalzadoActual >= 0){
                const carritoActualizado = [...prevCarrito];
                carritoActualizado[CalzadoActual].cantidad += 1;
                return carritoActualizado;
            } else {
                return [...prevCarrito, {...calzado, cantidad: 1}]
            }
        })
    }
    const eliminarCarrito = (id) => {
        setCarrito((prevCarrito) => prevCarrito.filter((articulo) => articulo.id !== id));
    }
    const vaciarCarrito = () => {
        setCarrito([]);
    }
    return(
        <CarritoContexto.Provider value={{
            carrito,
            agregarCarrito,
            eliminarCarrito,
            vaciarCarrito
            }}>
            {children}
        </CarritoContexto.Provider>
    )
}

export const useCart = () => useContext(CarritoContexto)
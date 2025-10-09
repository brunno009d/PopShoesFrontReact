import React from 'react';
import { CarritoContexto } from '../../context/CarritoContext'; // importa tu contexto real

export const MockCarritoProvider = ({ children }) => {
  const carritoMock = [];
  const agregarCarritoMock = () => {}; // función vacía para que no falle
  const eliminarCarritoMock = () => {};
  const vaciarCarritoMock = () => {};
  const actualizarNumeroCarritoMock = 0;

  const contextValue = {
    carrito: carritoMock,
    agregarCarrito: agregarCarritoMock,
    eliminarCarrito: eliminarCarritoMock,
    vaciarCarrito: vaciarCarritoMock,
    actualizarNumeroCarrito: actualizarNumeroCarritoMock,
  };

  return (
    <CarritoContexto.Provider value={contextValue}>
      {children}
    </CarritoContexto.Provider>
  );
};
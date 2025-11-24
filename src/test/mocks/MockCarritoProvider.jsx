import React from 'react';
import CarritoContexto from '../../context/CarritoContext';

export const MockCarritoProvider = ({ children }) => {
  const contextValue = {
    carrito: [],    
    agregarCarrito: jasmine.createSpy('agregarCarrito'), 
    eliminarCarrito: jasmine.createSpy('eliminarCarrito'),
    vaciarCarrito: jasmine.createSpy('vaciarCarrito'),
    actualizarCantidad: jasmine.createSpy('actualizarCantidad'),
    cantidadTotal: 0,
    precioTotal: 0,
    actualizarNumeroCarrito: 0,
  };

  return (
    <CarritoContexto.Provider value={contextValue}>
      {children}
    </CarritoContexto.Provider>
  );
};

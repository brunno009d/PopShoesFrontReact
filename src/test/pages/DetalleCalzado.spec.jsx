import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetalleCalzado from '../../pages/DetalleCalzado';
import { MockCarritoProvider } from '../mocks/MockCarritoProvider';

// Mock de calzados.js
jest.mock('../../data/calzados.js', () => ({
  __esModule: true,
  default: [
    {
      id: 1,
      titulo: 'Producto Test',
      descripcion: 'Descripción test',
      precio: 10000,
      imagen: 'https://via.placeholder.com/300x200.png',
    },
  ],
}));

describe('DetalleCalzado Page', () => {
  it('muestra mensaje de error cuando el producto no existe', () => {
    render(
      <MockCarritoProvider>
        <MemoryRouter initialEntries={['/calzados/999']}>
          <Routes>
            <Route path="/calzados/:id" element={<DetalleCalzado />} />
          </Routes>
        </MemoryRouter>
      </MockCarritoProvider>
    );

    expect(screen.getByText('Producto no encontrado')).toBeTruthy();
  });

  it('muestra los detalles del producto correctamente', () => {
    render(
      <MockCarritoProvider>
        <MemoryRouter initialEntries={['/calzados/1']}>
          <Routes>
            <Route path="/calzados/:id" element={<DetalleCalzado />} />
          </Routes>
        </MemoryRouter>
      </MockCarritoProvider>
    );

    // Verifica los datos del producto
    expect(screen.getByText('Producto Test')).toBeTruthy();
    expect(screen.getByText('Descripción test')).toBeTruthy();
    expect(screen.getByText('$10000')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Añadir al carrito/i })).toBeTruthy();
  });
});

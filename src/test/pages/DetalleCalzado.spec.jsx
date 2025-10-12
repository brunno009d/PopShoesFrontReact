import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetalleCalzado from '../../pages/DetalleCalzado';
import { MockCarritoProvider } from '../mocks/MockCarritoProvider';

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

    // Verifica que se renderiza algún contenido (sin especificar datos exactos)
    expect(screen.getByRole('button', { name: /Añadir al carrito/i })).toBeTruthy();
  });
});

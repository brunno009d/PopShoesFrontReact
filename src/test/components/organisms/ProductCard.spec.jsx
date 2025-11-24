import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import CalzadoCard from '../../../components/organisms/CalzadoCard';
import { MockCarritoProvider } from '../../mocks/MockCarritoProvider';

const MockRouter = ({ children, mockNavigate }) => {
  const router = createMemoryRouter(
    [{ path: '*', element: children }],
    { initialEntries: ['/'] }
  );

  router.navigate = mockNavigate; 
  return <RouterProvider router={router} />;
};

describe('CalzadoCard Component', () => {
  const mockNavigate = jasmine.createSpy('navigate');

  const mockCalzado = {
    id: 1,
    titulo: 'Producto Test',
    descripcion: 'Descripción test',
    precio: 10000,
    imagen: 'https://via.placeholder.com/300x200.png',
    stock: 10
  };

  const renderCard = () =>
    render(
      <MockCarritoProvider>
        <MockRouter mockNavigate={mockNavigate}>
          <CalzadoCard calzado={mockCalzado} />
        </MockRouter>
      </MockCarritoProvider>
    );

  it('renderiza el título del producto', () => {
    renderCard();
    expect(screen.getByText(mockCalzado.titulo)).toBeTruthy();
  });

  it('renderiza la descripción del producto', () => {
    renderCard();
    expect(screen.getByText(mockCalzado.descripcion)).toBeTruthy();
  });

  it('renderiza el precio del producto', () => {
    renderCard();
    expect(screen.getByText(/10000/)).toBeTruthy();
  });

  it('renderiza la imagen del producto', () => {
    renderCard();
    const image = screen.getByRole('img', { name: mockCalzado.titulo });
    expect(image).toBeTruthy();
    expect(image.getAttribute('src')).toBe(mockCalzado.imagen);
  });

  it('renderiza el botón de detalles', () => {
    renderCard();
    const button = screen.getByRole('button', { name: 'Ver detalles' });
    expect(button).toBeTruthy();
    expect(button).toHaveClass('btn-outline-primary');
  });

  it('renderiza el botón de comprar', () => {
    renderCard();
    const button = screen.getByText('Comprar');
    expect(button).toBeTruthy();
    expect(button).toHaveClass('btn-success');
  });

  it('navega a detalles al hacer click en el botón', () => {
    renderCard();
    const button = screen.getByText('Ver detalles');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(
      '/calzados/1',
      jasmine.any(Object)
    );
  });
});

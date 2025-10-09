import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import CalzadoCard from '../../../components/organisms/CalzadoCard';
import { MockCarritoProvider } from '../../mocks/MockCarritoProvider';


// Componente envolvente para mockear useNavigate
const MockRouter = ({ children, mockNavigate }) => {
 const router = createMemoryRouter(
   [{ path: '*', element: children }],
   { initialEntries: ['/'] }
 );
 router.navigate = mockNavigate; // Inyectamos el mock de navigate
 return <RouterProvider router={router} />;
};


describe('CalzadoCard Component', () => {
 const mockNavigate = jasmine.createSpy('navigate');


 const mockCalzado = {
   id: 1,
   titulo: 'Producto Test',
   descripcion: 'Descripción test',
   precio: 10000,
   imagen: 'test.jpg',
 };


 it('renderiza el título del producto', () => {
   render(
    <MockCarritoProvider>
     <MockRouter mockNavigate={mockNavigate}>
       <CalzadoCard calzado={mockCalzado} />
     </MockRouter>
     </MockCarritoProvider>
   );
   expect(screen.getByText(mockCalzado.titulo)).toBeTruthy();
 });


 it('renderiza la descripción del producto', () => {
   render(
    <MockCarritoProvider>
     <MockRouter mockNavigate={mockNavigate}>
       <CalzadoCard calzado={mockCalzado} />
     </MockRouter>
     </MockCarritoProvider>
   );
   expect(screen.getByText(mockCalzado.descripcion)).toBeTruthy();
 });


 it('renderiza el precio del producto', () => {
   render(
    <MockCarritoProvider>
     <MockRouter mockNavigate={mockNavigate}>
       <CalzadoCard calzado={mockCalzado} />
     </MockRouter>
     </MockCarritoProvider>
   );
   expect(screen.getByText(/10000/)).toBeTruthy();
 });


 it('renderiza la imagen del producto', () => {
   render(
    <MockCarritoProvider>
     <MockRouter mockNavigate={mockNavigate}>
       <CalzadoCard calzado={mockCalzado} />
     </MockRouter>
     </MockCarritoProvider>
   );
   const image = screen.getByRole('img', { name: mockCalzado.titulo });
   expect(image).toBeTruthy();
   expect(image.getAttribute('src')).toBe(mockCalzado.imagen);
 });


 it('renderiza el botón de detalles', () => {
   render(
    <MockCarritoProvider>
     <MockRouter mockNavigate={mockNavigate}>
       <CalzadoCard calzado={mockCalzado} />
     </MockRouter>
     </MockCarritoProvider>
   );
   const button = screen.getByText('Ver detalles');
   expect(button).toBeTruthy();
   expect(button).toHaveClass('btn-primary');
 });


 it('navega a detalles al hacer click en el botón', () => {
   render(
    <MockCarritoProvider>
     <MockRouter mockNavigate={mockNavigate}>
       <CalzadoCard calzado={mockCalzado} />
     </MockRouter>
     </MockCarritoProvider>
   );
   const button = screen.getByText('Ver detalles');
   fireEvent.click(button);
   expect(mockNavigate).toHaveBeenCalledWith('/calzados/1');
 });
});

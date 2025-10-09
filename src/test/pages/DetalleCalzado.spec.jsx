import React from 'react';
import { render, screen } from '@testing-library/react';
import { Profiler } from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import DetalleCalzado from '../../pages/DetalleCalzado';
import { MockCarritoProvider } from '../mocks/MockCarritoProvider';




// Mock de useParams
const mockUseParams = jasmine.createSpy('useParams');


// Mock de calzados.js
const mockCalzado = [
 {
   id: 1,
   titulo: 'Producto Test',
   descripcion: 'Descripción test',
   precio: 10000,
   imagen: 'https://via.placeholder.com/300x200.png',
 },
];


// Mockear el módulo calzados.js
beforeEach(() => {
 delete require.cache[require.resolve('../../data/calzados.js')];
 require.cache[require.resolve('../../data/calzados.js')] = {
   exports: { default: mockCalzado },
 };
});


afterEach(() => {
 delete require.cache[require.resolve('../../data/calzados.js')];
});


// Componente envolvente para mockear useParams
const MockRouter = ({ children, params }) => {
 mockUseParams.and.returnValue(params);
 const router = createMemoryRouter(
   [{ path: '*', element: children }],
   { initialEntries: ['/calzados/:id'] }
 );
 return <RouterProvider router={router} />;
};


describe('DetalleCalzado Page', () => {
 let renderSpy;


 beforeEach(() => {
   renderSpy = jasmine.createSpy('onRender');
   mockUseParams.and.returnValue({ id: '1' });
   console.log('mockUseParams devuelve:', mockUseParams());
 });


 it('muestra mensaje de error cuando el producto no existe', () => {
   mockUseParams.and.returnValue({ id: '999' });
   render(
     <MockCarritoProvider>
       <Profiler id="DetalleCalzado" onRender={renderSpy}>
         <MockRouter params={{ id: '999' }}>
           <DetalleCalzado />
         </MockRouter>
       </Profiler>
     </MockCarritoProvider>
   );
   console.log(screen.debug()); // Inspeccionar el DOM
   expect(screen.getByText('Producto no encontrado')).toBeTruthy();
 });


 it('mide el tiempo de renderizado del componente', () => {
   render(
     <MockCarritoProvider>
       <Profiler id="DetalleCalzado" onRender={renderSpy}>
         <MockRouter params={{ id: '1' }}>
           <DetalleCalzado />
         </MockRouter>
       </Profiler>
     </MockCarritoProvider>
   );
   console.log(screen.debug()); // Inspeccionar el DOM
   expect(renderSpy).toHaveBeenCalled();
   const call = renderSpy.calls.mostRecent();
   const actualDuration = call.args[3]; // actualDuration de onRender
   console.log('Tiempo de renderizado de DetalleCalzado:', actualDuration, 'ms');
   expect(actualDuration).toBeLessThan(100); // Umbral ajustado a 100 ms
 });
});

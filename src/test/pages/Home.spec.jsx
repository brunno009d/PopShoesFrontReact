import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';


describe('Home Page', () => {
 it('renderiza el título de la página de inicio', () => {
   render(<Home />);
   const title = screen.getByText('LAS MEJORES ZAPATILLAS');
   expect(title).toBeTruthy();
 });


 it('renderiza el contenedor de Bootstrap', () => {
   render(<Home />);
   const container = screen.getByText('LAS MEJORES ZAPATILLAS').closest('div');
   expect(container).toBeTruthy();
 });
});
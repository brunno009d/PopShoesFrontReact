import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';


describe('Home Page', () => {
 it('renderiza el título de la página de inicio', () => {
   render(<Home />);
   const title = screen.getByText('PopShoes Lo mejor en calzados');
   expect(title).toBeTruthy();
 });


 it('renderiza el contenedor de Bootstrap', () => {
   render(<Home />);
   const container = screen.getByRole('heading').closest('div');
   expect(container).toHaveClass('container');
   expect(container).toHaveClass('my-5');
 });
});
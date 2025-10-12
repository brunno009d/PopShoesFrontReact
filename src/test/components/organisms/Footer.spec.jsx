import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../../components/organisms/Footer';

describe('Componente Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('se renderiza correctamente el elemento footer', () => {
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeTruthy();
  });


  it('muestra el logo de PopShoes con el alt correcto', () => {
    const logo = screen.getByAltText('PopShoes');
    expect(logo).toBeTruthy();
    expect(logo.getAttribute('src')).toBe('/imghome/logo.webp');
  });


  it('muestra la sección de contacto con teléfono y correo', () => {
    expect(screen.getByText('Contacto')).toBeTruthy();
    expect(screen.getByText(/4545 4545/)).toBeTruthy();
    expect(screen.getByText(/popshoes@gmail.com/)).toBeTruthy();
  });


  it('muestra la sección de métodos de pago', () => {
    expect(screen.getByText('Métodos de pago')).toBeTruthy();
    expect(screen.getByText(/Tarjetas/)).toBeTruthy();
    expect(screen.getByText(/Transferencias/)).toBeTruthy();
  });
});

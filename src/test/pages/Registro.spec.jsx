import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Registro from '../../pages/Registro';


const MockRouter = ({ children, mockNavigate }) => {
  const router = createMemoryRouter([{ path: '*', element: children }], { initialEntries: ['/registro'] });
  router.navigate = mockNavigate;
  return <RouterProvider router={router} />;
};

describe('Componente Registro', () => {
  let mockNavigate;
  let alertSpy;

  beforeEach(() => {
    mockNavigate = jasmine.createSpy('navigate');
    alertSpy = spyOn(window, 'alert'); 
    localStorage.clear(); 
  });


  it('muestra errores si los campos están vacíos', () => {
    render(<MockRouter mockNavigate={mockNavigate}><Registro /></MockRouter>);

    const boton = screen.getByRole('button', { name: /registrarse/i });
    fireEvent.click(boton); 

    expect(screen.getByText('Por favor ingresa tu nombre')).toBeTruthy();
    expect(screen.getByText('Por favor ingresa tu correo')).toBeTruthy();
    expect(screen.getByText('Por favor ingresa tu contraseña')).toBeTruthy();
    expect(mockNavigate).not.toHaveBeenCalled();
  });


  it('guarda el usuario en localStorage y navega a /login', () => {
    render(<MockRouter mockNavigate={mockNavigate}><Registro /></MockRouter>);

   
    fireEvent.change(screen.getByPlaceholderText(/nombre completo/i), { target: { value: 'Juan Pérez' } });
    fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), { target: { value: 'juan@mail.com' } });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), { target: { value: '1234' } });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

   
    expect(alertSpy).toHaveBeenCalledWith('Registro completado con éxito. Ahora puedes iniciar sesión.');

    
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioRegistrado'));
    expect(usuarioGuardado.nombre).toBe('Juan Pérez');
    expect(usuarioGuardado.email).toBe('juan@mail.com');
    expect(usuarioGuardado.clave).toBe('1234');

   
    expect(mockNavigate).toHaveBeenCalledWith('/login', jasmine.any(Object));
  });


  it('aplica clases is-invalid cuando faltan campos', () => {
    render(<MockRouter mockNavigate={mockNavigate}><Registro /></MockRouter>);

    const boton = screen.getByRole('button', { name: /registrarse/i });
    fireEvent.click(boton);

    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => {
      expect(input.className.includes('is-invalid')).toBeTrue();
    });
  });
});

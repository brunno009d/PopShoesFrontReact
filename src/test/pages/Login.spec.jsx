import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Login from '../../pages/Login';


const MockRouter = ({ children, mockNavigate }) => {
  const router = createMemoryRouter([{ path: '*', element: children }], { initialEntries: ['/login'] });
  router.navigate = mockNavigate;
  return <RouterProvider router={router} />;
};

describe('Componente Login', () => {
  let mockNavigate;
  let alertSpy;

  beforeEach(() => {
    mockNavigate = jasmine.createSpy('navigate');
    alertSpy = spyOn(window, 'alert'); 
    localStorage.clear();
  });

  it('muestra errores si los campos están vacíos', () => {
    render(<MockRouter mockNavigate={mockNavigate}><Login /></MockRouter>);
    const boton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(boton);
    expect(screen.getByText('Por favor ingresa tu correo')).toBeTruthy();
    expect(screen.getByText('Por favor ingresa tu contraseña')).toBeTruthy();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('muestra alerta si correo o clave son incorrectos', () => {
    const usuarioRegistrado = { nombre: 'Ana', email: 'ana@mail.com', clave: '1234' };
    localStorage.setItem('usuarioRegistrado', JSON.stringify(usuarioRegistrado));

    render(<MockRouter mockNavigate={mockNavigate}><Login /></MockRouter>);
    fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), { target: { value: 'otro@mail.com' } });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), { target: { value: '0000' } });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(alertSpy).toHaveBeenCalledWith('Correo o contraseña incorrectos');
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('loguea correctamente y navega al home', () => {
    const usuarioRegistrado = { nombre: 'Ana', email: 'ana@mail.com', clave: '1234' };
    localStorage.setItem('usuarioRegistrado', JSON.stringify(usuarioRegistrado));

    render(<MockRouter mockNavigate={mockNavigate}><Login /></MockRouter>);
    fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), { target: { value: 'ana@mail.com' } });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(alertSpy).toHaveBeenCalledWith('Bienvenido, Ana');
    expect(mockNavigate).toHaveBeenCalledWith('/', jasmine.any(Object));
    const logueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    expect(logueado.email).toBe('ana@mail.com');
  });
});

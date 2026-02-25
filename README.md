# PopShoes - E-Commerce de Calzado (Frontend)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Este es el cliente web para PopShoes, una plataforma moderna de comercio electrónico dedicada a la venta de calzado. La aplicación consume una API REST personalizada y ofrece una experiencia de usuario fluida y reactiva mediante componentes modulares y una arquitectura escalable.

## Funcionalidades Principales

- Catálogo Dinámico: Visualización de productos con filtros avanzados por marca, género, precio, estilo y talla.
- Gestión de Carrito: Flujo completo para agregar, eliminar y gestionar cantidades de productos mediante un contexto global persistente.
- Autenticación de Usuarios: Sistema de login y registro integrado con seguridad basada en tokens JWT.
- Perfiles Personalizados: Sección "Mi Cuenta" para gestionar datos personales y visualizar el historial de actividad.
- Blog de Tendencias: Espacio con artículos detallados sobre el mundo del calzado y la moda.
- Panel de Administración: Interfaz dedicada para la gestión de inventario y control de la plataforma.

## Stack Tecnológico

- Framework: React.js con Vite para un entorno de desarrollo de alto rendimiento.
- Gestión de Estado: Uso de Context API (AuthContext y CarritoContext) para el manejo eficiente del estado global.
- Enrutamiento: React Router para la navegación fluida entre las diversas vistas de la aplicación.
- Estilos: Arquitectura de CSS modular para un diseño responsivo y mantenible.
- Pruebas: Suite de tests configurada con Karma, Babel y Jasmine.

## Instalación y Desarrollo

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/brunno009d/popshoesfrontreact.git

2. Instalar dependencias:
   ```bash
   npm install

3. Configurar variables de entorno:
   Crea un archivo .env en la raíz con la URL de tu API:
   ```bash
   VITE_API_URL=https://tu-api-backend.com/api

5. Iniciar en modo desarrollo:
   ```bash
   npm run dev

## Pruebas Unitarias

La aplicación cuenta con pruebas unitarias para componentes clave como botones, entradas de archivos y pies de página. Para ejecutar la suite completa:
npm run test

## Despliegue

La aplicación cuenta con configuración nativa para Vercel (vercel.json), permitiendo despliegues automáticos y manejo optimizado de rutas para una Single Page Application (SPA).

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import DetalleCalzado from './pages/DetalleCalzado';
import Carrito from './pages/Carrito';
import Blogs from './pages/Blog'; 
import DetalleBlog from './pages/DetalleBlog'; 
import Login from './pages/Login';        
import Registro from './pages/Registro'; 
import MiCuenta from './pages/MiCuenta';
import HomeAdmin from './pages/admin/HomeAdmin'; 
import NotFound from './pages/NotFound'; 
import AuthProvider from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/detalle/:id" element={<DetalleCalzado />} /> 
              <Route path="/carrito" element={<Carrito />} />    
              <Route path="/login" element={<Login />} />    
              <Route path="/blog" element={<Blogs />} /> 
              <Route path="/blogs/:id" element={<DetalleBlog />} /> 
              <Route path="/registro" element={<Registro />} />
              <Route path="/admin" element={<HomeAdmin />} />
              <Route path="/mi-cuenta" element={<MiCuenta />} />
              <Route path="*" element={
                  <div className="text-center mt-5">
                      <h2>404 - Página no encontrada</h2>
                  </div>
              } />    
            </Routes>
          </main>

          <Footer />
        </div>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
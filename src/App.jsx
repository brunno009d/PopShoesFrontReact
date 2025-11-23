import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import DetalleCalzado from './pages/DetalleCalzado';
import Carrito from './pages/Carrito';
import Blogs from './pages/Blog';
import DetalleBlog from './pages/DetalleBlog';
import Login from './pages/Login';        
import Registro from './pages/Registro'; 
import Footer from './components/organisms/Footer';
import NotFound from './pages/NotFound';
import HomeAdmin from './pages/admin/HomeAdmin';
import MiCuenta from './pages/MiCuenta'; // Asegurate de importar MiCuenta si ya lo creaste

function App() {
  return (
    // CLAVE: d-flex flex-column min-vh-100 hace que la app ocupe toda la pantalla
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      
      {/* flex-grow-1 empuja el footer hacia abajo si hay poco contenido */}
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />   
          <Route path="/calzados/:id" element={<DetalleCalzado />} />   
          <Route path="/carrito" element={<Carrito />} />    
          <Route path="/blog" element={<Blogs />} />    
          <Route path="/blogs/:id" element={<DetalleBlog />} />    
          
          <Route path="/login" element={<Login />} />    
          <Route path="/registro" element={<Registro />} />
          
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/mi-cuenta" element={<MiCuenta />} />

          <Route path="*" element={<NotFound />} />    
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
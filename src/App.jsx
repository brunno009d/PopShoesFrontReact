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


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />   
        <Route path="/calzados/:id" element={<DetalleCalzado />} />   
        <Route path="/carrito" element={<Carrito />} />    
        <Route path="/blog" element={<Blogs />} />    
        <Route path="/blogs/:id" element={<DetalleBlog />} />    
        <Route path="/login" element={<Login />} />    
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Home />} />    
        <Route path="*" element={<NotFound />} />    
      </Routes>
      <Footer />
    </>
  );
}

export default App;

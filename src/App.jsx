import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import DetalleCalzado from './pages/DetalleCalzado';



function App() {
 return (
   <>
     <NavBar />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/catalogo" element={<Catalogo />} />   
       <Route path="/calzados/:id" element={<DetalleCalzado />} />    
     </Routes>
   </>
 );

}


export default App;
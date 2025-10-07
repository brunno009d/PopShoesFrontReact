import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Home from './pages/Home';
// import Catalogo from './pages/Catalogo';



function App() {
 return (
   <>
     <NavBar />
     <Routes>
       <Route path="/" element={<Home />} />
       
     </Routes>
   </>
 );
 // <Route path="/catalogo" element={<Catalogo />} />
}


export default App;
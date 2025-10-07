import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Home from './pages/Home';
import Calzados from './pages/Calzados';



function App() {
 return (
   <>
     <NavBar />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/calzados" element={<Calzados />} />
     </Routes>
   </>
 );
}


export default App;
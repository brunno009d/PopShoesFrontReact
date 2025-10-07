import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// Nos permite ir cambiando entre sitios
import { BrowserRouter } from 'react-router-dom';
// Incluimos bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// y llamos a los estilos
import './styles/global.css';


createRoot(document.getElementById('root')).render(
 <StrictMode>
   <BrowserRouter>
     <App />
   </BrowserRouter>
 </StrictMode>,
)

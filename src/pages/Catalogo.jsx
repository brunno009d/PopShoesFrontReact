import { Container, Row } from 'react-bootstrap';
import calzados from '../data/calzados'
import ProductCard from '../components/organisms/CalzadoCard';


function Catalogo() {
 return (
   <Container className="my-5">
     <h1>Catalogo</h1>
     <Row>
      {calzados.map((calzado) => (
        <ProductCard key={calzado.id} calzado={calzado}/>
      ))}
     </Row>
   </Container>
 );
}


export default Catalogo;
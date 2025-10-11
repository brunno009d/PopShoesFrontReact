import { Card } from 'react-bootstrap';
import Imagen from '../atoms/Imagen';
import Boton from '../atoms/Boton';
import CardBlog from '../molecules/CardBlog';
import { useNavigate } from 'react-router-dom';


function BlogCard({ blog }) {
 const navigate = useNavigate();


 return (
   <Card style={{ width: '18rem' }} className="m-2">
     <Imagen src={blog.imagen} alt={blog.titulo} className="card-img-top" />
     <Card.Body>
       <CardBlog
         titulo={blog.titulo}
         descripcion={blog.descripcion}
       />
       <Boton variant="primary" onClick={() => navigate(`/blogs/${blog.id}`)}>
         leer mas
       </Boton>
     </Card.Body>
   </Card>
 );
}


export default BlogCard;
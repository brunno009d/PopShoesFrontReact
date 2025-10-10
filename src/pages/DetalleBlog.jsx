import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import blogs from '../data/blogs.js';
import Imagen from '../components/atoms/Imagen.jsx';
import Texto from '../components/atoms/Texto.jsx';

function DetalleBlog() {
  const { id } = useParams();
  const blog = blogs.find((p) => p.id === parseInt(id));

  if (!blog) {
    return (
      <Container className="my-5">
        <h1>Blog no encontrado</h1>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card>
        <Imagen src={blog?.imagen} alt={blog.titulo} className="card-img-top" />
        <Card.Body>
          <Texto variant="h2">{blog.titulo}</Texto>
          <Texto variant="p">{blog.descripcion}</Texto>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DetalleBlog;

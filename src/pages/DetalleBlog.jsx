import { Container, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import blogs from '../data/blogs.js';
import Imagen from '../components/atoms/Imagen.jsx';
import Boton from '../components/atoms/Boton.jsx';
import { ArrowLeft } from 'react-bootstrap-icons';
import Texto from '../components/atoms/Texto.jsx';

function DetalleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((p) => p.id === parseInt(id));

  if (!blog) {
    return (
      <Container className="my-5">
        <Texto variant="h1">Blog no encontrado</Texto>
        <Boton variant="secondary" onClick={() => navigate('/catalogo')}>
          <ArrowLeft className="me-2" /> Volver al catálogo
        </Boton>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card>
      <Boton
          variant="link"
          className="text-decoration-none text-dark d-flex align-items-center mb-2"
          onClick={() => navigate(-1)}
      >
          <ArrowLeft className="me-2" /> Volver
      </Boton>
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

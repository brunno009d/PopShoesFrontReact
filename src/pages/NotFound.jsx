import React from 'react';
import { Container } from 'react-bootstrap';
import Imagen from '../components/atoms/Imagen';
import Texto from '../components/atoms/Texto';

const imagen = {
    src: 'https://ih1.redbubble.net/image.5171963319.2981/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
    alt: 'Not Found Image',
}

function NotFound() {
  return (
    <Container className="my-5">
      <Texto variant='h1'>Página no encontrada</Texto>
      <Texto variant='p'>Ups...</Texto>
      
      <Imagen src={imagen.src} alt={imagen.alt} className="" />
    </Container>
  );
}

export default NotFound;
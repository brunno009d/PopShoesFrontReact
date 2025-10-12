import React from 'react';
import { Container, Row, Col, Carousel } from "react-bootstrap";
import "../styles/home.css";
import Texto from '../components/atoms/Texto';
import Imagen from '../components/atoms/Imagen';

function Home() {
  return (
    <main>
      {/* 🔹 Slider principal con controles */}
      <section className="mb-5">
        <Carousel>
          <Carousel.Item>
            <picture>
              <source media="(max-width: 768px)" srcSet="/imghome/slider1m.webp" />
              <Imagen
                className="d-block w-100 slider-img"
                src="/imghome/slider1.webp"
                alt="Slide 1"
              />
            </picture>
          </Carousel.Item>

          <Carousel.Item>
            <picture>
              <source media="(max-width: 768px)" srcSet="/imghome/slider2m.webp" />
              <Imagen
                className="d-block w-100 slider-img"
                src="/imghome/slider2.webp"
                alt="Slide 2"
              />
            </picture>
          </Carousel.Item>

          <Carousel.Item>
            <picture>
              <source media="(max-width: 768px)" srcSet="/imghome/slider3m.webp" />
              <Imagen
                className="d-block w-100 slider-img"
                src="/imghome/slider3.webp"
                alt="Slide 3"
              />
            </picture>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* 🔹 Título principal */}
      <Texto variant="h1" className="text-center titulo-principal text-dark fw-bold mb-5">
        LAS MEJORES ZAPATILLAS
      </Texto>

      {/* 🔹 Sección banners */}
      <Container className="mb-5">
        <Row xs={2} md={3} lg={6} className="g-3">
          <Col><Imagen src="/imghome/banner 1.webp" alt="Banner 1" className="banner-img img-fluid" /></Col>
          <Col><Imagen src="/imghome/banner 2.webp" alt="Banner 2" className="banner-img img-fluid" /></Col>
          <Col><Imagen src="/imghome/banner 3.webp" alt="Banner 3" className="banner-img img-fluid" /></Col>
          <Col><Imagen src="/imghome/banner 4.webp" alt="Banner 4" className="banner-img img-fluid" /></Col>
          <Col><Imagen src="/imghome/banner 5.webp" alt="Banner 5" className="banner-img img-fluid" /></Col>
          <Col><Imagen src="/imghome/banner 6.webp" alt="Banner 6" className="banner-img img-fluid" /></Col>
        </Row>
      </Container>


      {/* 🔹 Sección estilos */}
      <Container className="text-center mb-5">
        <Texto variant="h2">Encuentra el estilo que más te represente</Texto>
        <Texto variant="p" className="text-muted">
          Inspirate con los famosos más importantes del mundo de la moda y el espectáculo.
        </Texto>

        <Row xs={1} md={3} className="g-4 mt-4">
          <Col><Imagen src="/imghome/estilo5.webp" alt="Img 1" className="img-fluid rounded shadow-sm" /></Col>
          <Col><Imagen src="/imghome/estilo4.webp" alt="Img 2" className="img-fluid rounded shadow-sm" /></Col>
          <Col><Imagen src="/imghome/estilo1.webp" alt="Img 3" className="img-fluid rounded shadow-sm" /></Col>
        </Row>
      </Container>

      {/* Sección Estilo urbano */}
      <Container className="my-5">
        <Row className="align-items-center">
          {/* Texto */}
          <Col md={6} className="text-center text-md-center mb-4 mb-md-0">
            <Texto variant="h2">Estilo urbano</Texto>
            <Texto variant="p">
              Descubre las últimas tendencias en zapatillas que combinan
              comodidad y diseño para que te destaques en cada paso.
            </Texto>
          </Col>

          {/* Imágenes: usamos 3 Col dentro de un Row */}
          <Col md={6}>
            <Row className="justify-content-center g-3">
              <Col xs={4}>
                <Imagen
                  src="/imghome/estilo6.webp"
                  alt="Zapatilla 1"
                  className="img-fluid rounded shadow-sm"
                />
              </Col>
              <Col xs={4}>
                <Imagen
                  src="/imghome/estilo7.webp"
                  alt="Zapatilla 2"
                  className="img-fluid rounded shadow-sm"
                />
              </Col>
              <Col xs={4}>
                <Imagen
                  src="/imghome/Famosos.webp"
                  alt="Zapatilla 3"
                  className="img-fluid rounded shadow-sm"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Home;


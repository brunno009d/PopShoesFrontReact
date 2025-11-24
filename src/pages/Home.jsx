import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "../styles/pages/home.css";
import MainCarousel from '../components/organisms/MainCarousel';
import BannerGrid from '../components/organisms/BannerGrid';
import Texto from '../components/atoms/Texto';
import Imagen from '../components/atoms/Imagen';
import { sliders } from '../data/sliders';
import { banners } from '../data/banners';

function Home() {
  return (
    <main>
      <MainCarousel slides={sliders} />
      <Texto variant="h1" className="text-center titulo-principal text-dark fw-bold mb-5">
        LAS MEJORES ZAPATILLAS
      </Texto>
      <BannerGrid banners={banners} columns={6} />
      <Container className="text-center mb-5">
        <Texto variant="h2">Encuentra el estilo que más te represente</Texto>
        <Texto variant="p" className="text-muted">
          Inspirate con los famosos más importantes del mundo de la moda y el espectáculo.
        </Texto>

        <Row xs={1} md={3} className="g-4 mt-4">
          <Col><Imagen src="/imghome/estilo5.webp" alt="Estilo 5" className="img-fluid rounded shadow-sm" /></Col>
          <Col><Imagen src="/imghome/estilo4.webp" alt="Estilo 4" className="img-fluid rounded shadow-sm" /></Col>
          <Col><Imagen src="/imghome/estilo1.webp" alt="Estilo 1" className="img-fluid rounded shadow-sm" /></Col>
        </Row>
      </Container>
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-center mb-4 mb-md-0">
            <Texto variant="h2">Estilo urbano</Texto>
            <Texto variant="p">
              Descubre las últimas tendencias en zapatillas que combinan
              comodidad y diseño para que te destaques en cada paso.
            </Texto>
          </Col>

          <Col md={6}>
            <Row className="justify-content-center g-3">
              <Col xs={4}>
                <Imagen src="/imghome/estilo6.webp" alt="Urbano 1" className="img-fluid rounded shadow-sm" />
              </Col>
              <Col xs={4}>
                <Imagen src="/imghome/estilo7.webp" alt="Urbano 2" className="img-fluid rounded shadow-sm" />
              </Col>
              <Col xs={4}>
                <Imagen src="/imghome/Famosos.webp" alt="Urbano 3" className="img-fluid rounded shadow-sm" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Home;
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Imagen from '../atoms/Imagen';


function BannerGrid({ banners, columns = 6 }) {
    if (!banners || banners.length === 0) {
        return null;
    }

    return (
        <Container className="mb-5">
            <Row xs={2} md={3} lg={columns} className="g-3">
                {banners.map((banner) => (
                    <Col key={banner.id}>
                        <Imagen 
                            src={banner.src} 
                            alt={banner.alt} 
                            className="banner-img img-fluid" 
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default BannerGrid;
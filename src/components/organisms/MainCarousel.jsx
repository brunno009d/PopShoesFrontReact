import React from 'react';
import { Carousel } from 'react-bootstrap';
import Imagen from '../atoms/Imagen';


function MainCarousel({ slides }) {
    if (!slides || slides.length === 0) {
        return null; 
    }

    return (
        <section className="mb-5">
            <Carousel>
                {slides.map((slide) => (
                    <Carousel.Item key={slide.id}>
                        <picture>
                            <source media="(max-width: 768px)" srcSet={slide.mobileSrc} />
                            <Imagen
                                className="d-block w-100 slider-img"
                                src={slide.desktopSrc}
                                alt={slide.alt}
                            />
                        </picture>
                    </Carousel.Item>
                ))}
            </Carousel>
        </section>
    );
}

export default MainCarousel;
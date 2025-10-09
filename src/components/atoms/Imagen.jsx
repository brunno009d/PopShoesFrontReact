import React from 'react';

function Imagen({ src, alt, className }) {
  return <img src={src} alt={alt} className={className} />;
}

export default Imagen;
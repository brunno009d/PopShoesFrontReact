import React from 'react';
import Texto from '../atoms/Texto';


function CardCalzado({ titulo, descripcion, precio }) {
 return (
   <>
     <Texto variant="h5">{titulo}</Texto>
     <Texto variant="p">{descripcion}</Texto>
     <Texto variant="span" className="texto-muted">
       ${precio}
     </Texto>
   </>
 );
}


export default CardCalzado;
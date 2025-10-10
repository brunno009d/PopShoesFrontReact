import Texto from '../atoms/Texto';


function CardBlog({ titulo, descripcion }) {
 return (
   <>
     <Texto variant="h6">{titulo}</Texto>
     <Texto variant="p">{descripcion}</Texto>
   </>
 );
}


export default CardBlog;
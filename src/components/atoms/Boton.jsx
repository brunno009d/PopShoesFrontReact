import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';


function Boton({ children, ...props }) {
 return <BootstrapButton {...props}>{children}</BootstrapButton>;
}


export default Boton;
import React from 'react';
import './Formulario.css';

const FormularioExito = () => {
  const imgExito = "https://jorge-zientarski.com/imgs/success.png"
  return (
    <div className='formulario-contenido-derecha'>
      <h1 className='formulario-exito'>¡Hemos recibido su registración!</h1>
      <img className='formulario-img-2' src={imgExito} alt='exito' />
    </div>
  );
};

export default FormularioExito;

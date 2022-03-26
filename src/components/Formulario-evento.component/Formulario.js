import React, { useState } from 'react';
import './Formulario.css';
import FormularioRegistroEvento from './FormularioRegistroEvento';
import FormularioExito from './FormularioExito';

const Formulario = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const imgStartBolivia = "https://jorge-zientarski.com/imgs/start.jpg"

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='formulario-container'>
        <span className='cerrar-btn'>×</span>
        <div className='formulario-contenido-izquierda'>
          <img className='formulario-img' src={imgStartBolivia} alt='StartLogo' />
        </div>
        {!isSubmitted ? (
          <FormularioRegistroEvento submitForm={submitForm} />
        ) : (
          <FormularioExito />
        )}
      </div>
    </>
  );
};

export default Formulario;

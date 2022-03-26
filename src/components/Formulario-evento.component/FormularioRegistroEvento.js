import React from 'react';
import validar from './ValidarInformacion';
import utilizarFormulario from './UtilizarFormulario';
import './Formulario.css';

const FormularioRegistroEvento = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = utilizarFormulario(
    submitForm,
    validar
  );

  return (
    <div className='formulario-contenido-derecha'>
      <form onSubmit={handleSubmit} className='formulario' noValidate>
        <h1>
          Ingrese sus datos y los del evento
        </h1>
        <div className='formulario-inputs'>
          <label className='formulario-label'>Nombre completo</label>
          <input
            className='formulario-input'
            type='text'
            name='nombre'
            placeholder='Ingrese su nombre completo'
            value={values.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <p>{errors.nombre}</p>}
        </div>
        <div className='formulario-inputs'>
          <label className='formulario-label'>Email</label>
          <input
            className='formulario-input'
            type='email'
            name='email'
            placeholder='Ingrese su correo electronico'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='formulario-inputs'>
          <label className='formulario-label'>Nombre del evento</label>
          <input
            className='formulario-input'
            type='text'
            name='nombreEvento'
            placeholder='Ingrese el nombre del evento'
            value={values.nombreEvento}
            onChange={handleChange}
          />
          {errors.nombreEvento && <p>{errors.nombreEvento}</p>}
        </div>
        <div className='formulario-inputs'>
          <label className='formulario-label'>Fecha del evento</label>
          <input
            className='formulario-input'
            type='date'
            name='fechaEvento'
            value={values.fechaEvento}
            onChange={handleChange}
          />
        </div>
        <button className='formulario-input-btn' type='submit'>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default FormularioRegistroEvento;

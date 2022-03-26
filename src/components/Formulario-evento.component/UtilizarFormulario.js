import { useState, useEffect } from 'react';

const UtilizarFormulario = (callback, validate) => {
  const [values, setValues] = useState({
    nombre: '',
    email: '',
    nombreEvento: '',
    fechaEvento:''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const callback_function = ()=>{
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }
  useEffect(
    callback_function,
    [errors, isSubmitting, callback]
  ) 

  return { handleChange, handleSubmit, values, errors };
};

export default UtilizarFormulario;

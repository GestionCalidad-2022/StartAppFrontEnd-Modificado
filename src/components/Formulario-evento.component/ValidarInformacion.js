export default function validateInfo(values) {
  let errors = {};

  if (!values.nombre) {
    errors.nombre = 'Su nombre es requerido';
  }

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Su correo electronico tiene formato incorrecto';
  }

  if (!values.nombreEvento) {
    errors.nombreEvento = 'El nombre del evento es requerido';
  }

  return errors;
}

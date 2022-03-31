export default function ValidarInformacion(values) {
  let errors = {};

  if (!values.nombre) {
    errors.nombre = 'Su nombre es requerido';
  }

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|((\w+\.)+\w{2,}))$/.test(values.email)) {
    errors.email = 'Su correo electronico tiene formato incorrecto';
  }

  if (!values.nombreEvento) {
    errors.nombreEvento = 'El nombre del evento es requerido';
  }

  return errors;
}

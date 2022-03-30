import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Form, Field } from "react-final-form";
import { useMediaQuery, Button, Grid } from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { TextField } from "final-form-material-ui";
import { validEmail, validPassword } from "./RegEx";
import { useHistory } from "react-router-dom";
import AxiosClient from "./AxiosClient";
import LogoAndSlogan from "../components/LogoAndSlogan";
import MaskedInput from "react-text-mask";
import SnackbarMessage from "../components/templates/SnackbarMessage";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoginGoogle from "./LoginGoogle";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  registerContainer: {
    margin: "150px 0",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  nameContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  smallNameContainer: {
    display: "flex",
    flexDirection: "column",
  },
  registerCard: {
    padding: "30px",
    width: "750px",
    margin: "auto auto",
    background: "#F2F2F2",
    boxShadow:
      "0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.14), 0px 8px 10px -5px rgba(0, 0, 0, 0.2)",
    borderRadius: "6px 6px 0px 0px",
  },
  smallRegisterCard: {
    padding: "15px",
    width: "100%",
    boxShadow: "none",
  },
  buttonContainer: {
    width: "100%",
    marginTop: "15px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  registerButton: {
    color: "white",
    fontWeight: "bold",
    width: "100%",
  },
  textField: {
    marginBottom: "16px",
  },
  titleCreaCuenta: {
    fontFamily: "'DM Sans', sans-serif !important",
    fontWeight: "700 !important",
    fontStyle: "normal",
    lineHeight: "31px",
    marginLeft: "5%",
  },
  fontSize12: {
    marginTop: "10px",
    fontSize: 12,
    fontFamily: "'DM Sans', sans-serif !important",
    color: "#545454",
  },
  preguntaIni: {
    marginTop: "10px",
    fontSize: 16,
    fontFamily: "'DM Sans', sans-serif !important",
    color: "black",
  },
}));
const RegisterForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const [validateButton, setValidateButton] = useState(false);

  const [activeProgressBar, setActiveProgressBar] = useState(false);
  const smallScreen = !useMediaQuery("(min-width:811px)");
  const [phoneValue, setPhoneValue] = useState("591");
  const [snackbar, setSnackbar] = useState({
    message: "",
    active: false,
    severity: "success",
    afterClose: () => {return ""},
  });
  const validate = (values) => {
    const requiredValues = "Debe tener 6 caracteres y 1 número";
    setValidateButton(false);
    const errors = {};
    if (!validEmail.test(values.email)) {
      errors.email = "Correo no valido";
    }
    if (!values.username) {
      errors.username = "Nombre req.";
    }
    if (!values.lastname) {
      errors.lastname = "Apellido req.";
    }
    if (phoneValue.replace(/\s+/g, '').length<7) {
      errors.phoneValue = "Telefono req.";
    }
    if (!validPassword.test(values.password)) {
      errors.password = requiredValues;
    }
    if (values.confirmPassword !== values.password || !values.confirmPassword) {
      errors.confirmPassword = "Contraseñas no coinciden";
    }
    if (
      !errors.username &&
      !errors.lastname &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword&&
      !errors.phoneValue
    ) {
      setValidateButton(true);
    }
    return errors;
  };
  const URL_AUTH = process.env.REACT_APP_API_AUTH;
  const URL = process.env.REACT_APP_API;
  const onSubmit = async (values) => {
    setActiveProgressBar(true);
    const bodyAuth = {
      email: values.email,
      password: values.password,
      tipo: "normal",
    };
    AxiosClient.post(`${URL_AUTH}api/auth/signup`, bodyAuth)
      .then((response) => {
        if (response.status === 200) {
          const id_auth = response.data.id_autenticacion;
          const body = {
            nombre: values.username,
            apellido: values.lastname,
            telefono: phoneValue,
            foto_url:
              "https://i.pinimg.com/originals/14/a8/cd/14a8cd8c46df11082f60ae15b97f47ff.jpg",
            id_autenticacion: parseInt(id_auth),
          };
          AxiosClient.post(`${URL}extended_form`, body)
            .then((response) => {
              if (response.status === 201) {
                setActiveProgressBar(false);
                activeSnackbar(
                  `Se ha enviado un correo de confirmación al email: ${bodyAuth.email}`,
                  "success",
                  () => {
                    history.push(`/login`);
                  }
                );
              }
            })
            .catch((response) => {
              setActiveProgressBar(false);
              activeSnackbar(`${response}`, "error", () => {
                window.location.reload();
              });
            });
        }
      })
      .catch((response) => {
        setActiveProgressBar(false);
        activeSnackbar(
          `El correo: ${values.email} ya ha sido registrado.`,
          "error",
          () => {
            window.location.reload();
          }
        );
      });
  };
  const activeSnackbar = (message, severity, afterClose) => {
    setSnackbar({ message, severity, afterClose, active: true });
  };
  const handleChangePhone = (event) => {
    setPhoneValue(event.target.value);
  };
  return (
    <div className={classes.registerContainer}>
      <LogoAndSlogan />
      <Grid>
        <div>
          <h2 className={classes.titleCreaCuenta}>Crea Tu Cuenta</h2>
        </div>
        <CircularProgress
          style={{
            left: "45%",
            display: activeProgressBar ? "" : "none",
            zIndex: "99",
            top: "50%",
            position: "absolute",
          }}
          color="secondary"
        />
        <Card
          className={
            smallScreen ? classes.smallRegisterCard : classes.registerCard
          }
        >
          <Form onSubmit={onSubmit} validate={validate}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: "15px" }}>
                  Regístrate para participar de proyectos y eventos
                </div>
                <div className={classes.nameContainer}>
                  <Field
                    style={{ width: "48%" }}
                    name="username"
                    type="text"
                    placeholder="Nombre *"
                    className={classes.textField}
                    component={TextField}
                    variant="outlined"
                    size="small"
                    required
                  />

                  <Field
                    style={{ width: "48%" }}
                    name="lastname"
                    type="text"
                    placeholder="Apellido *"
                    className={classes.textField}
                    component={TextField}
                    variant="outlined"
                    size="small"
                    required
                  />
                </div>
                <Field
                  fullWidth
                  name="email"
                  type="text"
                  placeholder="Correo *"
                  className={classes.textField}
                  component={TextField}
                  variant="outlined"
                  size="small"
                  required
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <OutlinedInput
                    value={phoneValue}
                    style={{
                      width: "100%",
                      height: "45px",
                      marginBottom: "10px",
                    }}
                    onChange={handleChangePhone}
                    name="phone"
                    id="phone-input"
                    size="small"
                    inputComponent={TextMaskCustom}
                  />
                </div>
                <Field
                  fullWidth
                  placeholder="Contraseña *"
                  name="password"
                  type="password"
                  className={classes.textField}
                  component={TextField}
                  variant="outlined"
                  size="small"
                  required
                />
                <Field
                  fullWidth
                  placeholder="Confirma tu contraseña *"
                  name="confirmPassword"
                  type="password"
                  className={classes.textField}
                  component={TextField}
                  variant="outlined"
                  size="small"
                  required
                />
                <div className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.registerButton}
                    type="submit"
                    disabled={validateButton ? false : true}
                  >
                    Crea tu cuenta de start
                  </Button>
                  <Typography variant="h6">
                    o
                  </Typography>           
                  <LoginGoogle name = "Regístrate con Google"/>
                </div>
                <div className={classes.preguntaIni}>
                  <a href="/login" className={classes.preguntaIni}>
                    <strong>¿Ya tienes cuenta? Inicia Sesión. </strong>
                  </a>
                </div>
                <div className={classes.fontSize12}>
                  Al crear tu cuenta aceptas que miembros de START se pongan en
                  contacto contigo para futuras actividades
                </div>
              </form>
            )}
          </Form>
        </Card>
      </Grid>
      <SnackbarMessage snackbar={snackbar} setActive={setSnackbar} />
    </div>
  );
};

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        "+",
        /\d/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

export default RegisterForm;

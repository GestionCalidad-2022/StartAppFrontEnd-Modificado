import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import { useMediaQuery, Button, Typography, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { validEmail } from "./RegEx";
import AxiosClient from "./AxiosClient";
import LogoAndSlogan from "../components/LogoAndSlogan";
import CircularProgress from "@material-ui/core/CircularProgress";
import SnackbarMessage from "../components/templates/SnackbarMessage";
import Card from "@material-ui/core/Card";
import LoginGoogle from "./LoginGoogle";
import { NavLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  Container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "250px 0",
  },
  smallContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "100px 0",
    marginBottom: "0",
  },
  buttonContainer: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  loginContainer: {
    width: "400px",
    color: "white",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  pregunta: {
    marginTop: "10px",
    fontSize: 16,
    fontFamily: "'DM Sans', sans-serif !important",
    textAlign: "center",
    color: "black",
  },
  registerCard: {
    padding: "30px",
    width: "480px",
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
  textField: {
    marginBottom: "30px",
  },
}));
const LoginForm = ({ sessionData, setSessionData }) => {
  const history = useHistory();
  const classes = useStyles();
  const [validateButton, setValidateButton] = useState(false);
  const smallScreen = !useMediaQuery("(min-width:900px)");
  const [snackbar, setSnackbar] = useState({
    message: "",
    active: false,
    severity: "success",
    afterClose: () => {return ""},
  });
  const [activeProgressBar, setActiveProgressBar] = useState(false);

  const validate = (values) => {
    setValidateButton(false);
    const errors = {};
    const campoNoValido="Campo no valido";
    const campoRequerido="Campo requerido";

    if (!validEmail.test(values.email)) {
      errors.email = campoNoValido;
    }
    if (!values.email) {
      errors.email = campoRequerido;
    }
    if (!values.password) {
      errors.password = campoRequerido;
    }
    if (!errors.email && !errors.password) {
      setValidateButton(true);
    }
    return errors;
  };
  const activeSnackbar = (message, severity, afterClose) => {
    setSnackbar({ message, severity, afterClose, active: true });
  };
  const URL_AUTH = process.env.REACT_APP_API_AUTH;
  const onSubmit = async (values) => {
    const body = {
      email: values.email,
      password: values.password,
      tipo: "normal",
    };
    setActiveProgressBar(true);
    await AxiosClient.post(`${URL_AUTH}api/auth/signin`, body)
      .then((response) => {
        if (response.status === 200) {
          const jwt = response.data.accessToken;
          const id_auth = response.data.id;
          sessionStorage.setItem("jwt", jwt);
          sessionStorage.setItem("id", id_auth);
          history.push(`/`);
          window.location.reload(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 405) {
          setActiveProgressBar(false);
          activeSnackbar("La cuenta no se ha validado.", "warning", () => {return ""});
        } else {
          setActiveProgressBar(false);
          activeSnackbar("Correo o contraseña inválidos.", "error", () => {return ""});
        }
      });
  };
  return (
    <div className={smallScreen ? classes.smallContainer : classes.Container}>
      <LogoAndSlogan />
      <div>
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
        <Grid className={classes.loginContainer}>
          <Card
            className={
              smallScreen ? classes.smallRegisterCard : classes.registerCard
            }
          >
            <Form onSubmit={onSubmit} validate={validate}>
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid>
                    <Typography
                      style={{
                        textAlign: "center",
                        fontSize: "40px",
                        fontWeight: "bold",
                        marginBottom: "15px",
                      }}
                    >
                      Inicia Sesión
                    </Typography>
                    <Field
                      fullWidth
                      name="email"
                      type="text"
                      placeholder="Correo *"
                      className={classes.textField}
                      component={TextField}
                      variant="outlined"
                      size="small"
                    />
                    <Field
                      fullWidth
                      placeholder="Contraseña *"
                      name="password"
                      type="password"
                      className={classes.textField}
                      component={TextField}
                      variant="outlined"
                      size="small"
                    />
                    <Button
                      className={classes.buttonContainer}
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={validateButton ? false : true}
                    >
                      Iniciar Sesión
                    </Button>
                    <div className={classes.buttonContainer}>
                      <LoginGoogle name = "Iniciar con Google"/>
                    </div>
                    <div className={classes.pregunta}>
                      <NavLink to="/register" className={classes.pregunta}>
                        ¿No tienes cuenta? Regístrate aquí.
                      </NavLink>
                    </div>
                    <div className={classes.pregunta}>
                      <NavLink to="/reset_password" className={classes.pregunta}>
                        ¿Has olvidado tu contraseña? Recupera tu contraseña.
                      </NavLink>
                    </div>
                  </Grid>
                </form>
              )}
            </Form>
          </Card>
        </Grid>
        <SnackbarMessage snackbar={snackbar} setActive={setSnackbar} />
      </div>
    </div>
  );
};

export default LoginForm;

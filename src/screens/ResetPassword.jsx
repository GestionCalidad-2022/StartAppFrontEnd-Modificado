import React from "react";
import { makeStyles, Typography, Button, TextField } from "@material-ui/core";
import axios from "axios";
import SnackbarMessage from "../components/templates/SnackbarMessage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%",
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [snackbar, setSnackbar] = React.useState({
    message: "",
    active: false,
    severity: "success"
  });
  const sendEmail = () => {
    const URL_API = process.env.REACT_APP_API_AUTH;
    const body = { email };
    axios
      .post(`${URL_API}api/recover`, body)
      .then((response) => {
        if (response.status === 200) {
          activeSnackbar(
            "Se le ha enviado el correo de recuperación.",
            "success"
          );
        }
      })
      .catch((error) => {
        activeSnackbar(
          "No se ha enviado el correo de recuperación.",
          "error"
        );
      });
  };
  const activeSnackbar = (message, severity) => {
    setSnackbar({ message, severity, active: true });
  };
  return (
    <div className={classes.root}>
      <Typography
        style={{ color: "Black", marginBottom: "25px", paddingLeft: "0", textAlign: "center",}}
        variant="h1"
      >
        Ingrese el correo para restablecer su contraseña.
      </Typography>
      <TextField
        name="email"
        value={email}
        variant="outlined"
        color="primary"
        placeholder="ejemplo@gmail.com"
        onChange={(event) => setEmail(event.target.value)}
        style={{width:"300px"}}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "20px 0" }}
        onClick={() => sendEmail()}
      >
        Enviar Correo
      </Button>
      <SnackbarMessage snackbar={snackbar} setActive={setSnackbar} />
    </div>
  );
};

export default ResetPassword;

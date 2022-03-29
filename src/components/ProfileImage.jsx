import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useMediaQuery } from '@material-ui/core';
import {
  Chip,
  Grid,
  Box,
  Switch,
  FormControlLabel,
  Badge,
} from "@material-ui/core/";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  large: {
    marginTop: "5px",
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: "auto",
  },
  small: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: "auto",
    marginLeft: "5px"
  },
  switchStyle: {
    marginRight: "10%",
  },
  chipStyle: {
    marginRight: "28%",
  },
}));

const url = process.env.REACT_APP_API;
const baseURL = `${url}extended_form/`;

//const baseURL = "http://localhost:5000/extended_form/";

export default function ProfileImage({ getDataProfile, setDataProfile, sessionData }) {
  const classes = useStyles();
  const smallScreen = !useMediaQuery("(min-width:760px)")

  var peticionPut = (disponibilidad) => {
    axios
      .put(baseURL + getDataProfile.id_usuario, disponibilidad)
      .catch((error) => {
        alert(error.message);
      });
  };
  function sendAvailable() {
    var stateAvailable = getDataProfile.estado_de_disponibilidad;
    if (stateAvailable === "disponible") {
      stateAvailable = "no disponible";
    } else {
      stateAvailable = "disponible";
    }
    setDataProfile({
      ...getDataProfile,
      estado_de_disponibilidad: stateAvailable,
    });
    const disponibilidad = {
      estado_de_disponibilidad: stateAvailable,
    };
    peticionPut(disponibilidad);

  }

  const handleChange = () => {};

  return (
    <Grid>
      <div className={smallScreen? classes.small: classes.large}>
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent= ""
          color={
            getDataProfile.estado_de_disponibilidad === "disponible"
              ? "secondary"
              : "primary"
          }
        >
          <Avatar
            alt="Imagen de Perfil"
            src={sessionData.foto_url?sessionData.foto_url:"https://i.pinimg.com/originals/14/a8/cd/14a8cd8c46df11082f60ae15b97f47ff.jpg"}
            className={smallScreen? classes.small: classes.large}
          />
        </Badge>
      </div>
      <Box textAlign={smallScreen? "left": "center"} sx={smallScreen? {marginLeft: "10px"}: {margin:"10px"}}>
        <Grid>
        {smallScreen? <Typography variant="subtitle1" style={{fontWeight: "bold"}}>
            {getDataProfile.nombre? getDataProfile.nombre.split(" ")[0]: " "} {getDataProfile.apellido? getDataProfile.apellido.split(" ")[0]: " "} 
          </Typography>:
          <Typography variant="subtitle1" style={{fontWeight: "bold"}}>
            {getDataProfile.nombre} {getDataProfile.apellido}
          </Typography>}
        </Grid>
        <Grid container justifyContent={smallScreen? "flex-start": "center"}>
          <Grid container justifyContent={smallScreen? "flex-start": "center"}>
            <Chip label={getDataProfile.rol} color="secondary" />
          </Grid>
          <Grid
            className={classes.switchStyle}
            container
            justifyContent={smallScreen? "flex-start": "flex-end"}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={
                    getDataProfile.estado_de_disponibilidad === "disponible"
                  }
                  onClick={sendAvailable}
                  onChange={handleChange}
                  color="secondary"
                />
              }
              label={`${
                getDataProfile.estado_de_disponibilidad === "disponible"
                  ? "Estoy disponible"
                  : "No disponible"
              }`}
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

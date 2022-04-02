import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Insignia from "./Insignia";

const useStyles = makeStyles((theme) => ({
  styleGrid: {
    textAlign: "center",
  },
  root: {
    flexGrow: 1,
  },
}));

const url = process.env.REACT_APP_API;
const baseURL = `${url}insignias`;
const api = axios.create({
  baseURL: baseURL,
});
function ListaInsignias() {
  const classes = useStyles();
  const [insignias, setInsignias] = useState([]);
  const [insigniasOfUser, setInsigniasUser] = useState([]);
  const obtenerInsigniasUsuario = async () => {
    const idSesion = sessionStorage.getItem("id");
    let getDataUsuario = await api
      .get(`${baseURL}/${idSesion}`)
      .then((dataUsuario) => dataUsuario);
    setInsigniasUser(getDataUsuario.data.data);
  };
  const obtenerInsignias = async () => {
    let dataLocal = await api.get(`${baseURL}`).then((data) => data);
    setInsignias(dataLocal.data.data);
  };

  useEffect(() => {
    obtenerInsignias();
    obtenerInsigniasUsuario();
  }, []);

  return (
    <Grid
      className={classes.styleGrid}
      justifyContent="space-around"
      container
      spacing={3}
    >
      <Insignia insignias={insignias} insigniasOfUser={insigniasOfUser} />
    </Grid>
  );
}

export default ListaInsignias;

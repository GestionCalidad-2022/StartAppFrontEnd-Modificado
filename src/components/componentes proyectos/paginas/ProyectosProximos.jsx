import React, { useState, useEffect } from "react";
import { Typography, useMediaQuery, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//import CardEvento from './CardEvento'
import axios from "axios";
import ResumedCardProyect from "../organismos/ResumedCardProyect";

const useStyles = makeStyles((theme) => ({
  root_container: {
    margin: "40px 10px",
  },
  resp_root_container: {
    margin: "10px 15px",
  },
  containerEvents: {
    margin: "20px 0",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: "30px 30px",
  },
  noEvents: {
    margin: "200px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  resp_noevents_message: {
    fontSize: "16px",
  },
}));

const ProyectosProximos = ({ title }) => {
  const smallScreen = !useMediaQuery("(min-width:500px)");
  const [events, setEvents] = useState([]);
  const classes = useStyles();
  const idSesion = sessionStorage.getItem("id");
  const baseURL = `${process.env.REACT_APP_API}sesion/${idSesion}/get_my_proyectos`;
  useEffect(
    () =>
      axios
        .get(baseURL)
        .then((response) => {
          var resp = response.data;
          console.log(resp);
          setEvents(resp);
        })
        .catch((error) => {
          console.log(error);
        }),
    [baseURL]
  );
  return (
    <div
      className={
        smallScreen ? classes.resp_root_container : classes.root_container
      }
    >
      {title ? (
        <Typography variant="h2" component="h2" gutterBottom>
          Tus Próximos Proyectos
        </Typography>
      ) : (
        <div style={{ display: "none" }}></div>
      )}
      {events.length ? (
        <div
          className={classes.containerEvents}
          style={smallScreen ? { gap: "10px" } : {}}
        >
          {events.map((event) => (
            <ResumedCardProyect event={event} enlisted={true} key={event.id} />
          ))}
        </div>
      ) : (
        <div className={classes.noEvents}>
          <Typography
            color="textSecondary"
            className={
              smallScreen
                ? classes.resp_noevents_message
                : classes.noevents_message
            }
          >
            Aún no te has registrado a ningún proyecto. Una vez te hayas
            registrado a alguno de nuestros proyectos, aparecerán en tu página de
            inicio.
          </Typography>
          <Button
            onClick={() => (window.location.href = "/projects/categories")}
            variant="contained"
            color="primary"
            style={{ margin: "20px 0" }}
          >
            Explorar proyectos
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProyectosProximos;
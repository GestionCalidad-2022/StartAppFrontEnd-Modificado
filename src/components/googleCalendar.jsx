import React from "react";
import {
  Avatar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SnackbarMessage from "./templates/SnackbarMessage"

const useStyles = makeStyles((theme) => ({
  root_container: {
    borderRadius: "15px",
    padding: "20px",
    width: "50%",
    margin: "30px 0",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function GoogleCalendar({ eventData, active }) {
  const [snackbar, setSnackbar] = React.useState({
    message: "",
    active: false,
    severity: "success",
    afterClose: () => {},
  })
  const activeSnackbar = (message, severity, afterClose) => {
    setSnackbar({ message, severity, afterClose, active: true })
  }
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (active) {
      handleClickOpen();
    }
  }, [active]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  var gapi = window.gapi;
  /* 
    Update with your own Client Id and Api key 
  */
  var CLIENT_ID =
    "956290037147-hfsvlfocglghd9no50hqpck843usd43a.apps.googleusercontent.com";
  var API_KEY = "AIzaSyBcrLinpV6s-V_FPjFC8luy61tU3H3JTn0";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const handleClick = () => {

    gapi.load("client:auth2", () => {

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3", () => console.log("bam!"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: eventData.nombre_evento? eventData.nombre_evento:"Evento de Start",
            location: eventData.lugar_evento?eventData.lugar_evento:"Lugar de Evento",
            description: eventData.descripcion_evento?eventData.descripcion_evento:"no hay descripción",
            start: {
              dateTime: `${eventData.fecha_evento}T${eventData.hora_inicio}:00-04:00`,
              timeZone: "America/Puerto_Rico",
            },
            end: {
              dateTime: `${eventData.fecha_evento}T${eventData.hora_fin}:00-04:00`,
              timeZone: "America/Puerto_Rico",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 30 },
              ],
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            console.log(event);
            window.open(event.htmlLink);
            window.location.reload();
          });
        });
    });
    handleClose();
  };

  return (
    <div className={classes.root_container}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" variant="h3">
          <Typography>Agregar el evento a tu calendario Google</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography style={{ fontSize: 18 }}>
            Puedes agregar el evento en tu calendario Google. Recuerda que el
            calendario de Google envía recordatorios a tus dispositivos.
          </Typography>
        </DialogContent>
        <DialogActions style={{ padding: "20px 24px" }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{ color: "#989898" }}
          >
            Cancelar
          </Button>
          <Button
            style={{
              textTransform: "none",
            }}
            variant="outlined"
            color="primary"
            onClick={()=>{
              if(eventData.fecha_evento && eventData.hora_inicio && eventData.hora_fin)
              {
                handleClick()
              }else{
                activeSnackbar("El evento no tiene hora de inicio y fin o fecha.", "error", () => {})
              }}}
          >
            {"Añadir "}
            <Avatar
              alt="Google Calendar icon"
              src={
                "//ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_1_2x.png#"
              }
              style={{ width: "70" }}
            />
          </Button>
        </DialogActions>
        <SnackbarMessage snackbar={snackbar} setActive={setSnackbar} />
      </Dialog>
    </div>
  );
}

export default GoogleCalendar;

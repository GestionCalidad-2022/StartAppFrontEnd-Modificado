//aca viene el eliminar evento
import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const url = process.env.REACT_APP_API;
const urlDeploy = `${url}eventos`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EliminarEvento = (event) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteEvento = async (evento) => {
    await axios.delete(urlDeploy + "/" + evento.event.id);
    console.log("Evento eliminado");
    handleClose();
    window.location.reload();
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          borderRadius: 4,
          height: 51,
          backgroundColor: "#f00",
          fontSize: "16px",
          margin: "3px",
          textTransform: 'none',
          width: "110px",

        }}
        onClick={handleClickOpen}
      >
        Eliminar
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            ¿Está seguro de eliminar el evento {event.event.nombre_evento}?
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            Se eliminará definitivamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => deleteEvento(event)}>
            Confimar
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EliminarEvento;

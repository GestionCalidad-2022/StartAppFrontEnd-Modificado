import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AxiosClient from "./AxiosClient";
import SnackbarMessage from "./templates/SnackbarMessage"

const urlBase = process.env.REACT_APP_API

export default function PhoneDialog({user}) {
  const [open, setOpen] = React.useState(false);
  const [NuevoTelefono, setTelefono]= React.useState("");
  const [snackbar, setSnackbar] = React.useState({
    message:"",
    active:false,
    severity:"success",
    afterClose:()=>{},
})
  React.useEffect(()=>{
    AxiosClient.get(`${urlBase}extended_form/${user}`)
      .then((response) => {
        if (response.status === 200)
            if (response.data.data.telefono === null || response.data.data.telefono === "")
            {
                handleClickOpen();
            }
        })
      .catch((response) => { console.log(response)});
  },[user])
  const activeSnackbar = (message, severity, afterClose)=>{
    setSnackbar({message, severity, afterClose, active:true})
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    let to_send= {
        telefono: NuevoTelefono,
    };
    AxiosClient.put(`${urlBase}extended_form/${user}`, to_send)
      .then((response) => {
        if (response.status === 202)
            activeSnackbar("Se ha registrado el numero de telefono", "success", ()=>{})
        })
      .catch((response) => { console.log(response)});
  };

  return (
    <div>
      <Dialog disableEscapeKeyDown="true" onBackdropClick="false" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Completa tus Datos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Porfavor agrega tu número de teléfono para continuar con la navegación
          </DialogContentText>
          <TextField
            value = {NuevoTelefono}
            onChange = {(event)=>{setTelefono(event.target.value)}}
            autoFocus
            margin="dense"
            id="telefono"
            label="Numero de Contacto"
            type="text"
            placeholder="(+591) ********"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Registrar
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarMessage snackbar={snackbar} setActive={setSnackbar}/>
    </div>
  );
}

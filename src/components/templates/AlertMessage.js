import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
//Importar al componente todos estos elementos
import { withStyles } from "@material-ui/core/styles";

function AlertDialog({message, handleConfirm, active}) {
  //copiar este state al archivo
  const [open, setOpen] = React.useState(true);

  //Copiar estas funciones

  const handleClose = () => {
    setOpen(false);
    handleConfirm();
  };

  //El boton es un ejemplo, no se debe copiar
  //Para ver un ejemplo de uso ver el archivo ParticiparEnProyectoBtn en 'componentes proyectos/atomos'
  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{display:(active)?"":"none"}}
      >
        <DialogTitle id="alert-dialog-title">
          {message}
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <OkButton variant="contained" color="primary" onClick={handleClose} autoFocus>
            Ok  
            </OkButton>
        </DialogActions>
      </Dialog>
  );
}

//Copiar estilos del boton OK

const OkButton = withStyles((theme) => ({
    root: {
      marginRight: "auto",
      marginLeft: "auto",
    },
  }))(Button);

export default AlertDialog

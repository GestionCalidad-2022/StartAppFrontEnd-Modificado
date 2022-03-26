import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

const url = process.env.REACT_APP_API;
const urlEliminarCuenta=`${url}disable_user/`

const DeleteButton = withStyles((theme) => ({
        root: {
          backgroundColor: "#ED2020",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#a90e0e",
          },
        },
      }))(Button);

const CancelButton = withStyles((theme) => ({
        root: {
          color: "white",
          backgroundColor: "#a8a8a8",
          "&:hover": {
            backgroundColor: "#818181",
          },
        },
      }))(Button);
      
function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
  }
export default function AlertDialog() {
  
  const [transition, setTransition] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);//Dialog

  const [state, setState] = React.useState({
    openSnakbar: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, openSnakbar } = state;
  const handleClickOpenSnakbar = (Transition,newState) => {
      setTransition(() => Transition);
      setState({ openSnakbar: true, ...newState });
  };

  const handleCloseSnakbar = () => {
      setState({ ...state, openSnakbar: false });
      window.location.reload();
      
  };
  
  


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };  

  var peticionDelete=()=>{
    const idsessionstorage = sessionStorage.getItem("id");
    axios.delete(urlEliminarCuenta+idsessionstorage).then(response=>{
      sessionStorage.removeItem("jwt")      
      handleClickOpenSnakbar( TransitionDown,{ vertical: 'top', horizontal: 'center' })   
    })
    
    
  }
  return (
    <div>
        
      <span onClick={handleClickOpen} style={{ marginTop: "20px",textDecoration:"underline black" }}  variant="contained">
        Deseo eliminar mi cuenta
      </span>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Eliminar Perfil"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          ¿Está seguro que desea eliminar su cuenta? <br/>
            No podra ingresar con sus credenciales de nuevo
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          
        <DeleteButton onClick={peticionDelete} style={{ height: "30px",margin: "7px",}}     variant="contained">
            Eliminar 
        </DeleteButton>


        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openSnakbar}
            autoHideDuration={1000}
            onClose={handleCloseSnakbar}
            TransitionComponent={transition}
            key={transition ? transition.name : ''}
        >
            <Alert onClose={handleCloseSnakbar} severity="success" variant="filled">
                Se eliminó su cuenta correctamente!
            </Alert>
        </Snackbar>
        <CancelButton onClick={handleClose}  style={{ height: "30px",margin: "7px",}} color="primary" autoFocus>
            Cancelar
        </CancelButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
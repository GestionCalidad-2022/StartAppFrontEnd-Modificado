// Componentes:
import SnackbarMessage from '../../templates/SnackbarMessage';
// Permisos/Roles:
// Librerias-Paquetes:
import './ContenidoProyecto.css';
import { Box } from '@material-ui/core';
import { useState, useEffect, useRef } from "react";

function SnackBarProyectos({infoSnackbar}) {

    // States:
    const [snackbar, setSnackbar] = useState({
        message:"",
        active:false,
        severity:"success"
    })

    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true

        const activateSnackBar = () => {
            let activar = true//snackbarStatus.active
            let estado = infoSnackbar && infoSnackbar.status//snackbarStatus.status
            let mensaje = infoSnackbar && infoSnackbar.message//snackbarStatus.message
            
            if(!activar) return
            if(estado){
                activeSnackbar(mensaje, "success")
            } else{
                activeSnackbar(mensaje, "error")
            }
        }
        activateSnackBar()
        
        return () => {
            mountedRef.current = false
        }
    }, [infoSnackbar])

    const activeSnackbar = (message, severity )=>{
        setSnackbar({message, severity, active:true})
    }
    

    return (
        <Box >
            <SnackbarMessage snackbar={snackbar} setActive={setSnackbar}/>
        </Box>
    );
}

export default SnackBarProyectos
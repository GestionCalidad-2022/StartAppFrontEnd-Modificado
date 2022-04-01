// Componentes:
import './ParticiparEnProyectoBtn.css';
// Librerias-Paquetes:
import React from "react";
import { Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";


// Merce Vic
function CancelarParticipacionBtn( {proyecto, onCancelarParticipacion, onAsignarSnackbarStatus, onAsignarParticipacion, onAvisoAccion}) {

    const onClick = async (event) => {
        const cancelResponse = await onCancelarParticipacion(proyecto.id);
        if(cancelResponse){
            onAsignarParticipacion();
            onAsignarSnackbarStatus("Participacion cancelada", true, true);
            onAvisoAccion()
        }else{
            onAsignarParticipacion();
            onAsignarSnackbarStatus("Participacion no cancelada", true, false);
            onAvisoAccion()
        }
    }

    return (
                <CancelParticipationButton variant="contained" color="primary"
                onClick={onClick}
                >
                    Dejar Proyecto
                </CancelParticipationButton>
    );
}

const CancelParticipationButton = withStyles((theme) => ({
    root: {
        backgroundColor: "#E3E3E3",
        fontSize: "16px",
        color: "#545454",
        "&:hover": {
            color: 'whitesmoke',
            backgroundColor: "#818181",
        },
        //height: "51px", <---
        minWidth: "119px",
        // display: "none" <---
    },
    
}))(Button);

export default CancelarParticipacionBtn
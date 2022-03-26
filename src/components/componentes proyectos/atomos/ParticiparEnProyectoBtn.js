// Componentes:
//import './ParticiparEnProyectoBtn.css';
import React from "react";
import { Button, Box } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import {VARIABLES} from '../organismos/variables-compartidas'
// Librerias-Paquetes:
import { withStyles, makeStyles } from "@material-ui/core/styles";

const ParticipateButton = withStyles((theme) => ({
    root: {
        backgroundColor: "#269BD5",
        height: "100%",//51, heigth: 51 NOTE: perjudica a la vista individual del ptoyecto.
        width: 119,
        //fontSize: 16, NOTE: perjudica a la vista individual del ptoyecto.
    },
}))(Button);

const useStyles = makeStyles({
    contenedorBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8%'
    },
    contenedorBtnPasado: {
        display: 'flex',
        alignItems: 'center',
        gap: '8%',
        backgroundColor: "#a8a8a8",
        "&:hover": {
            backgroundColor: "#818181",
        },
    },
});

const varProyectos = VARIABLES.datosProyectos

function ParticiparEnProyectoBtn( {proyecto,  onPartiparProy, onAsignarSnackbarStatus, onAsignarParticipacion, onAvisoAccion}) {
    const classes = useStyles()

    const onClick = async (event) => {
        if(proyecto){
            if(proyecto.estado === varProyectos.estadoAcabado){
                onAsignarSnackbarStatus("Participacion bloqueada", true, false);
                onAvisoAccion()
            } else{
                const participarResponse = await onPartiparProy(proyecto.id)
                if(participarResponse){
                    onAsignarParticipacion();
                    onAsignarSnackbarStatus("Participacion exitosa", true, true);
                    onAvisoAccion()
                }else{
                    onAsignarParticipacion();
                    onAsignarSnackbarStatus("Participacion fallida", true, false);
                    onAvisoAccion()
                }
            }
        }
    }
    /*OPCIONALMENTE MOVER EL BOTON DE VOLVER ATRAS DE KEVIN*/
    const candado = proyecto && proyecto.estado === varProyectos.estadoAcabado? <LockIcon/> : ""
    const estilosBtnPasado = proyecto && proyecto.estado === varProyectos.estadoAcabado? classes.contenedorBtnPasado : ""
    return (
        <div>
            <div id={proyecto.id}>
                <ParticipateButton variant="contained"
                                    color="primary"
                                    className={estilosBtnPasado}
                                    onClick={onClick}>
                    <Box className={classes.contenedorBtn}>
                        Unirme
                        {candado}
                    </Box>
                </ParticipateButton>
            </div>
        </div>
    );
}



export default ParticiparEnProyectoBtn
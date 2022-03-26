// Componentes:
import BannerProyecto from '../moleculas/BannerProyecto'
import ContenidoProyecto from '../moleculas/ContenidoProyecto'
import './ProyectoVoluntario.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

// Librerias-Paquetes:

const useStyles = makeStyles({
    root: {
      maxWidth: 344,
      minWidth: 344,
      minHeight: 301,
      maxHeight: 301,
      margin: "20px",
    },
    media: {
      height: 140,
    },
  });

// Diego
function ProyectoVoluntario({proyecto, rol, onEliminarProy, onActivarForm, onPartiparProy, onGetParticipacion, onCancelarParticipacion, onNumeroParticipantes}) {
    
    const classes = useStyles();
    
    return (
        <Card className={classes.root}>
                <BannerProyecto proyecto={proyecto}/>
                <ContenidoProyecto rol={rol}
                            proyecto={proyecto} 
                            onEliminarProy={onEliminarProy} 
                            onActivarForm={onActivarForm}
                            onPartiparProy={onPartiparProy}
                            onGetParticipacion={onGetParticipacion}
                            onCancelarParticipacion={onCancelarParticipacion}
                            onNumeroParticipantes={onNumeroParticipantes}/>
        </Card>
    );
}

/*
<Box className="proyect-container">
            <BannerProyecto />
            <ContenidoProyecto rol={rol}
                            proyecto={proyecto} 
                            onEliminarProy={onEliminarProy} 
                            onActivarForm={onActivarForm}
                            onPartiparProy={onPartiparProy}
                            onGetParticipacion={onGetParticipacion}
                            onCancelarParticipacion={onCancelarParticipacion}
                            onNumeroParticipantes={onNumeroParticipantes}/>
           
        </Box>

*/
export default ProyectoVoluntario
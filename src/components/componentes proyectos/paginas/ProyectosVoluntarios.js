// Componentes:
import HeaderProyectos from '../organismos/HeaderProyectos'
import HeaderProyectosPasados from '../organismos/HeaderProyectosPasados';
import BodyProyectos from '../organismos/BodyProyectos'
// Librerias-Paquetes:
import { Box } from '@material-ui/core';
//import SelectFiltroCategoria from '../atomos/SelectFiltroCategoria';
import React from 'react';

// DIEGO
//victor y Merce 
function ProyectosVoluntarios({proyectos, rol, onPartiparProy, onGetParticipacion, onCancelarParticipacion, onNumeroParticipantes, tituloHeader, proyectosPasadosCategoria}) {
    //const classes = useStyles();

    return (
        <Box style={styles}>
            <HeaderProyectos tituloHeader={tituloHeader}/>
            <BodyProyectos rol = {rol}
                            proyectos={proyectos}
                            onPartiparProy={onPartiparProy}
                            onGetParticipacion={onGetParticipacion}
                            onCancelarParticipacion={onCancelarParticipacion}
                            onNumeroParticipantes={onNumeroParticipantes}/>
            <HeaderProyectosPasados/>
            <BodyProyectos rol = {rol}
                            proyectos={proyectosPasadosCategoria}
                            onPartiparProy={onPartiparProy}
                            onGetParticipacion={onGetParticipacion}
                            onCancelarParticipacion={onCancelarParticipacion}
                            onNumeroParticipantes={onNumeroParticipantes}/>
        </Box>
    );
}

const styles= {
    minHeight: "650px"
    //border: "4px solid orange"
}
/*
const useStyles = makeStyles({ 
    root: {
      maxWidth: 345,
    },
  });*/

export default ProyectosVoluntarios
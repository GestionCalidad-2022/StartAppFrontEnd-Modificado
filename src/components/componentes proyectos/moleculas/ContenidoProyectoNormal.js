// Componentes:
import ParticiparEnProyectoBtn from '../atomos/ParticiparEnProyectoBtn';

// Librerias-Paquetes:
import './ContenidoProyecto.css';
import { Box } from '@material-ui/core';

// Merce y Vic
function ContenidoProyectoNormal({proyecto,  onPartiparProy, onGetParticipacion}) {
    return (
        <Box className="content-container">
            <p>Proyecto: {proyecto.titulo}</p>
            <p> Objetivo: {proyecto.objetivo}</p>
            <p> Descripción: {proyecto.descripcion}</p>
            <p> Lider: {proyecto.lider}</p>
            
            <div className="button-container">
                <div className="space-button"></div>
                <ParticiparEnProyectoBtn proyecto={proyecto} onPartiparProy={onPartiparProy} onGetParticipacion={onGetParticipacion}/>
            </div>
        </Box>
    );
}

export default ContenidoProyectoNormal
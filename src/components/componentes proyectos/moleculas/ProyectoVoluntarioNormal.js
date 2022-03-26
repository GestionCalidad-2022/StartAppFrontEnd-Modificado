// Componentes:
import BannerProyecto from '../moleculas/BannerProyecto'
import ContenidoProyectoNormal from '../moleculas/ContenidoProyectoNormal'
import './ProyectoVoluntario.css';

// Librerias-Paquetes:
import { Box } from '@material-ui/core';

// Victor y Merce
function ProyectoVoluntarioNormal({proyecto,  onPartiparProy, onGetParticipacion, onNumeroParticipantes}) {
    return (
        <Box className="proyect-container">
            <BannerProyecto />
            <ContenidoProyectoNormal proyecto={proyecto} onPartiparProy={onPartiparProy} onGetParticipacion={onGetParticipacion} onNumeroParticipantes={onNumeroParticipantes}/>
        </Box>
    );
}

export default ProyectoVoluntarioNormal
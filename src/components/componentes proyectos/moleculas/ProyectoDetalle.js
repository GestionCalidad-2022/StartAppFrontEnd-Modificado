// Componentes:
// Librerias-Paquetes:
import './ProyectoDetalle.css';
import { Box } from '@material-ui/core';
import BannerProyectoDetalle from '../moleculas/BannerProyectoDetalle';
import ContenidoProyectoDetalle from './ContenidoProyectoDetalle';

function ProyectoDetalle({proyecto, onPartiparProy, onGetParticipacion}) {
    
    return (
        <Box className="proyect-detail-container">
            <BannerProyectoDetalle />
            <ContenidoProyectoDetalle proyecto={proyecto} onPartiparProy={onPartiparProy} onGetParticipacion={onGetParticipacion}/>
        </Box>
    );
}


export default ProyectoDetalle
// Componentes:
import ProyectoDetalle from '../moleculas/ProyectoDetalle'
import VolverProyectoBtn from '../atomos/VolverProyectoBtn';
import './BodyProyectos.css';
// Librerias-Paquetes:
import { Box } from '@material-ui/core';

function BodyProyectoIndividual({proyecto, onPartiparProy, onGetParticipacion, onCancelarParticipacion}) {
    
    return (
        <Box>
            <VolverProyectoBtn/>
            {
                <ProyectoDetalle
                    proyecto={proyecto} 
                    onPartiparProy={onPartiparProy}
                    onGetParticipacion={onGetParticipacion}
                    onCancelarParticipacion={onCancelarParticipacion}/>
            }
        </Box>
    );
}
export default BodyProyectoIndividual
// Componentes:
import ProyectoVoluntario from '../moleculas/ProyectoVoluntario'
import './BodyProyectos.css';
// Librerias-Paquetes:
import { Box } from '@material-ui/core';

// diego
function BodyProyectos({proyectos, rol, onEliminarProy,  onPartiparProy, onActivarForm, onGetParticipacion, onCancelarParticipacion, onNumeroParticipantes}) {
    // OJO!
    // BodyProyectos se renderiza varias veces.
    // El endpoint de 'Crear Proyecto' es await. Entonces antes de que el nuevo
    // proyecto obtenga su 'id', el "BodyProyectos" ya se renderiza sin el 'id'.
    // Esto ocasiona que en ese momento haya un warning, que ya no estara presente
    // una vez que el metodo async de 'Crear Proyecto' termine el el nuevo proyecto
    // obtenga su id.
    // La idea del "renderProyectos" es que se reenderizen los proyectos solo cuando el
    // ultimo proyecto tenga su 'id', para controlar ese warning al crear un proyecto.
    /*function renderProyectos(){
        if(typeof(proyectos) !== "undefined"){
            if(proyectos.length > 0){
                //console.log(proyectos.length)
                if(proyectos[proyectos.length - 1].hasOwnProperty('id')===true){
                    //console.log('aqui vendria el map, pero falta algo')
                }
            }
        }
    }*/
    return (
        <Box>
            <div className="body-container">
                    {
                        proyectos.map(proyecto => (
                            <ProyectoVoluntario  className="card-container"
                            key={proyecto.id} 
                            rol={rol}
                            proyecto={proyecto} 
                            onEliminarProy={onEliminarProy}
                            onActivarForm={onActivarForm}
                            onPartiparProy={onPartiparProy}
                            onGetParticipacion={onGetParticipacion}
                            onCancelarParticipacion={onCancelarParticipacion}
                            onNumeroParticipantes={onNumeroParticipantes}/>
                        ))
                    }
            </div>
        </Box>
    );
}
export default BodyProyectos

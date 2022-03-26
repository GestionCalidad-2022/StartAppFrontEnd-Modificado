// Componentes:
import HeaderProyectosAdmin from '../organismos/HeaderProyectosAdmin';
import HeaderProyectosPasados from '../organismos/HeaderProyectosPasados';
import BodyProyectos from '../organismos/BodyProyectos'
//import FormularioCrearProyecto from '../moleculas/FormularioCrearProyecto'
import FormularioEditarProyecto from '../moleculas/FormularioEditarProyecto'
// Librerias-Paquetes:
import {useState} from 'react'
import { Box } from '@material-ui/core';


function ProyectosAdmins({proyectos,lideres,categorias, rol, onEliminarProy, onPartiparProy, onEditarProy, onGetParticipacion, onCancelarParticipacion, onNumeroParticipantes, tituloHeader, proyectosPasadosCategoria}) {
    // Hooks
    const [mostrarFormEditar, setMostrarFormEditar] = useState(false)
    const [proyectoEditar, setProyectoEditar] = useState({})

    // Funciones

    // NOTE: Es importante ambas funciones (activarFormEditar y onlyActivarFormEditar) 
    //       Una obtiene la data y activa el form para un proyecto. (obtiene data de ContenidoProyecto)
    //       La otra solo activa el formulario, pero no recibe data (solo se activa/desactiva para FormularioEditarProyecto)
    // Si no se tiene ambas funciones, la data se tratara obtener desde FormularioEditarProyecto y
    // eso es redundante, ocacionando un error (huevo y la gallina)
    const activarFormEditar = (proyecto) => {
        //`debugger
        setProyectoEditar(proyecto)
        //console.log(proyecto)
        setMostrarFormEditar(!mostrarFormEditar);
    }
    const onlyActivarFormEditar = (proyecto) => {
        
        setMostrarFormEditar(!mostrarFormEditar);
    }

    //Componentes
    const FormularioEditar = mostrarFormEditar===true ? 
                            <FormularioEditarProyecto onEditarProy={onEditarProy}
                                                    onActivarForm={onlyActivarFormEditar}
                                                    proyecto={proyectoEditar} 
                                                    mostrarFormEditar={mostrarFormEditar} 
                                                    lideres={lideres} 
                                                    categorias={categorias}/> : <></>

    return (
        <Box style={styles}>
            <HeaderProyectosAdmin tituloHeader={tituloHeader}/>
            {FormularioEditar}
            <BodyProyectos rol={rol}
                            proyectos={proyectos} 
                            onEliminarProy={onEliminarProy} 
                            onActivarForm={activarFormEditar}
                            onPartiparProy={onPartiparProy}
                            onGetParticipacion={onGetParticipacion}
                            onCancelarParticipacion={onCancelarParticipacion}
                            onNumeroParticipantes={onNumeroParticipantes}/>
            <HeaderProyectosPasados/>
            <BodyProyectos rol={rol}
                            proyectos={proyectosPasadosCategoria} 
                            onEliminarProy={onEliminarProy} 
                            onActivarForm={activarFormEditar}
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

export default ProyectosAdmins
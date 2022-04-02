// Librerias-Paquetes:
import ListaParticipantesProyecto from './ListaParticipantesProyecto';
import CancelarParticipacionBtn from '../atomos/CancelarParticipacionBtn';
import SnackBarProyectos from '../moleculas/SnackBarProyectos';
import ParticiparEnProyectoBtn from '../atomos/ParticiparEnProyectoBtn';
import EliminarProjectoBtn from '../atomos/EliminarProjectoBtn'
import {useHistory, Switch} from "react-router-dom"
import './ContenidoProyectoDetalle.css';
import { Box } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import EventosProyecto from '../paginas/EventosProyecto';
// Permisos/Roles:
import PuertaPermisos from '../organismos/PuertaPermisos';
import {SCOPES} from '../organismos/map-permisos';
import {useState, useRef, useEffect } from 'react';

function ContenidoProyectoDetalle ({proyecto}) {
    const fechaFin = proyecto.fecha_fin? proyecto.fecha_fin.substring(0, 10) : "En Progreso"
    const fechaInicio = proyecto.fecha_inicio? proyecto.fecha_inicio.substring(0, 10) : "Por definir..."
    
    const [visualizarP, setVisualizarP] = useState(proyecto.visualizar)
    let history = useHistory();

    const Onchange = async () => {
        setVisualizarP(!visualizarP)
        const proyectoEditar={
            visualizar: visualizarP
        }
        await fetch(
            `${process.env.REACT_APP_API}update_proyecto/${proyecto.id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(proyectoEditar)
            })
    }

     const switchListaParticipantes = proyecto.visualizar === true?
        <ListaParticipantesProyecto/>
        :<PuertaPermisos scopes={[SCOPES.canCrudProyectos]}>
        <ListaParticipantesProyecto/>
        </PuertaPermisos>
        

    const listaPartipantes = <PuertaPermisos scopes={[SCOPES.canCrudProyectos]}>
                                    <Switch
                                    onClick={Onchange}
                                    checked={!visualizarP} 
                                    
                                    />
                                </PuertaPermisos>

    //CANCELAR
    const [infoSnackbar, setInfoSnackbar] = useState()
    const [activarSnackbar, setActivarSnackbar] = useState(false)
    const [participacion, setParticipacion] = useState(false)
    const [actualizar, setActualizar] = useState(false)
    const mountedRef = useRef(false)

    function asignarSnackbarStatus(message, active, status){
        setInfoSnackbar({
            message: message,
            active: active,
            status: status
        })
        setActivarSnackbar(active)
    }
    
    function avisoAccion() {
        setActualizar(!actualizar)
    }

    async function asignarParticipacion() {
        const pid = proyecto.id
        const participa = await onGetParticipacion(pid)
        return participa === true? true : false
    }
    
    // OJO. no borrar el comentario dentro del useEffect() 
    useEffect(() => {
        mountedRef.current = true
        const colocarParticipacion = async () => {
            const participa = await asignarParticipacion()
            mountedRef.current && setParticipacion(participa)
            
        }
        
        colocarParticipacion()
        
        
        return () => {
            mountedRef.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [proyecto.id, actualizar])

    const onCancelarParticipacion = async (id) => {
        const idSesion = sessionStorage.getItem("id");
        const response = await fetch(
            `${URLCancelarParticipProy}/${id}/sesion/${idSesion}`,
            { 
                method: 'DELETE'
            })
        return response.json()
    }
    const onGetParticipacion = async (idProyecto) => {
        const idSesion = sessionStorage.getItem("id");
        const response = await fetch(`${URLParticpaVoluntario}/${idProyecto}/sesion/${idSesion}`,
        { 
            method: 'GET'
        });
        return response.json();
    }
    const participarEnProyecto = async (id) => { 
        const idSesion = sessionStorage.getItem("id");
        const response = await fetch(
        `${URLParticiparProy}/${id}/sesion/${idSesion}`,
        { 
            method: 'PUT'
        })
        return response.json()
    }
    const eliminarProyecto = async (id) => { 
        await fetch(
        `${process.env.REACT_APP_API}delete_proyecto/${id}`,
        { 
            method: 'DELETE'
        })
    }

    //asignarParticipacion()
    const botonEliminarProyecto = <PuertaPermisos scopes={[SCOPES.canCrudProyectos]}>
                                    <EliminarProjectoBtn proyecto={proyecto}
                                                        onEliminarProy={eliminarProyecto}
                                                        onClick={() => history.goBack()}/>
                                </PuertaPermisos>
    const botonCancelarParticipacion = participacion === true?
                                <CancelarParticipacionBtn proyecto={proyecto} 
                                                        onCancelarParticipacion={onCancelarParticipacion} 
                                                        onGetParticipacion={onGetParticipacion}
                                                        onAsignarParticipacion={asignarParticipacion}
                                                        onAsignarSnackbarStatus={asignarSnackbarStatus}
                                                        onAvisoAccion={avisoAccion}
                                                        />
    : ''
    const botonParticiparProyecto = participacion === false?
                                <ParticiparEnProyectoBtn proyecto={proyecto} 
                                                        onPartiparProy={participarEnProyecto} 
                                                        onGetParticipacion={onGetParticipacion}
                                                        onAsignarParticipacion={asignarParticipacion}
                                                        onAsignarSnackbarStatus={asignarSnackbarStatus}
                                                        onAvisoAccion={avisoAccion}
                                                        />
                                : ''

    const snackBarComponent = activarSnackbar && activarSnackbar === true?
                                <SnackBarProyectos infoSnackbar={infoSnackbar}/>
                                :
                                ''
    

    return (
        <Box className="content-container-detail">
            <b>
                <h1 className="card-title-detail">{proyecto.titulo}</h1>
            </b>
            <p className="card-text-detail">
                <b>Fecha de Inicio:</b> {fechaInicio}
            </p>
            <p className="card-text-detail">
                <b>Fecha de Fin:</b> {fechaFin}
            </p>
            <p className="card-text-detail">
                <b>Descripción:</b> {proyecto.descripcion}
            </p>
            <p className="card-text-detail">
                <b>Objetivo:</b> {proyecto.objetivo}
            </p>
            <p className="card-text-detail">
                <b>Líder:</b> {proyecto.lider}
            </p>
            <p className="card-text-detail">
                <b>Categoría:</b> {proyecto.categoria}
            </p>
            <BoxButtons>
                {botonCancelarParticipacion}
                {botonParticiparProyecto}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {botonEliminarProyecto}
            </BoxButtons>
            <h2 className="titleEventos">Eventos</h2>
            <EventosProyecto id={proyecto} title={false}/>
            {listaPartipantes}
            {switchListaParticipantes}
            {snackBarComponent}
        </Box>
    );
}
const BoxButtons = withStyles((theme) => ({
    root: {
      display:'flex'
    },
  }))(Box);

const url = process.env.REACT_APP_API;
const URLCancelarParticipProy = `${url}cancel_participate_proyecto`//http://localhost:5000/cancel_participate_proyecto/37/sesion/24
const URLParticpaVoluntario = `${url}participate`//'http://localhost:5000/participate'//
const URLParticiparProy = `${url}participate_proyecto`//`http://localhost:5000/participate_proyecto`

export default ContenidoProyectoDetalle


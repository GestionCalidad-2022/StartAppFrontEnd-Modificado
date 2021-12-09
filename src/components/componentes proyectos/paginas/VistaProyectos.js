// Componentes: 
import ProyectosAdmins from './ProyectosAdmins'
import ProyectosVoluntarios from './ProyectosVoluntarios'
// Permisos/Roles:
import PuertaPermisos from '../organismos/PuertaPermisos';
import {SCOPES} from '../organismos/map-permisos';
// Librerias-Paquetes:
import {useState, useEffect, useRef} from 'react'
import {useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function VistaProyectos() {
    // Hooks
    //window.location.reload()
    const [proyectos, setProyectos] = useState([])
    const [lideres, setLideres] = useState([])
    const [categorias, setCategorias] = useState([])
    const [proyectosPasadosCategoria, setProyectosPasadosCategoria] = useState([])
    const [actualizar, setActualizar] = useState(false)
    const mountedRef = useRef(false)
    // Variables
    let categoria = useQuery().get("categoria");
    let complementoHeader = categoria//categoria? categoria : tipoEstado
    complementoHeader = complementoHeader? complementoHeader : ""
    
    function setProyectosCheck(data, mounted, pasados=false){
        if (mounted) {
            pasados? setProyectosPasadosCategoria(data) : setProyectos(data)
        }
    }

    useEffect(() => {
        mountedRef.current = true
        const getProyectos = async () => {
            const proyectosDelServer =  await fetchProyectos()
            setProyectosCheck(proyectosDelServer, mountedRef.current)
        }

        const getProyectosFiltro = async () => {
            const proyectosFiltrados = await filtrarPorCategoria(categoria)
            setProyectosCheck(proyectosFiltrados, mountedRef.current)
        }
        const getLideres = async ()=>{
            const lideresDelServer = await fetchLideres()
            mountedRef.current && setLideres(lideresDelServer)
            //console.log(lideresDelServer)
        }

        const getCategorias = async () => {
            const categosServer = await fetchCategorias()
            mountedRef.current && setCategorias(categosServer)
        }

        const getProyectosPasadosCategoria = async () => {
            const proyectosPasados =  await fetchProyectosPasadosCategoria(categoria)
            setProyectosCheck(proyectosPasados, mountedRef.current, true)
        }

        categoria? getProyectosFiltro() : getProyectos()
        getProyectosPasadosCategoria()
        getLideres()
        getCategorias()

        return () => {
            mountedRef.current = false
        }

    }, [actualizar, categoria, /*proyectosPasadosCategoria*/] )

    // HTTP requests & functions
    async function fetchProyectos() {
        const response = await fetch(URLProyectos)
        const data = await response.json()
        return data;
    }
    async function fetchLideres() {
        const response = await fetch(URLLideres)
        const data = await response.json()
        let dataLider=[]
        let index=1
        for (let x of data ) {
            dataLider.push({"id": index,"nombre":`${x.nombre}`})
            index++
            
        }
        //dataLider.pop()
        //console.log(dataLider)
        return dataLider;
    }

    /*async function fetchProyectosPasados() {
        const response = await fetch(URLProyectosPasados)
        const data = await response.json()
        return data;
    }*/

    async function fetchProyectosPasadosCategoria(categoria) {
        const response = await fetch(`${URLProyectosPasados}/${categoria}`)
        const data = await response.json()
        return data;
    }

    const fetchCategorias = async () => {
        const response = await fetch(URLCategorias)
        const data = await response.json()
        return data
    }

    const crearProyecto = async (nuevoProyecto) => {
        debugger
        const response = await fetch(
            URLCrearProy,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(nuevoProyecto)
            })
        const data = await response.json()
        //console.log(data)
        setProyectos([...proyectos, data])
        setActualizar(!actualizar)
    
    }

    const participarEnProyecto = async (id) => { 
        //debugger
        const idSesion = sessionStorage.getItem("id");
        const response = await fetch(
        `${URLParticiparProy}/${id}/sesion/${idSesion}`,
        { 
            method: 'PUT'
        })
        const data = await response.json()
        //setActualizar(!actualizar)
        return data
    }

    const cancelarParticipacionProyecto = async (id) => { 
        //debugger
        const idSesion = sessionStorage.getItem("id");
        const response = await fetch(
            `${URLCancelarParticipProy}/${id}/sesion/${idSesion}`,
            { 
                method: 'DELETE'
            })
        const data = await response.json()
        //setActualizar(!actualizar)
        return data
    }

    const obtenerParticipacionProyecto = async (idProyecto) => {
        const idSesion = sessionStorage.getItem("id");
        const response = await fetch(`${URLParticpaVoluntario}/${idProyecto}/sesion/${idSesion}`,
        { 
            method: 'GET'
        });
        const data = await response.json();
        return data;
    }

    const obtenerNumeroParticipantes = async (idProyecto) => {
        const response = await fetch(`${URLNumeroParticipantes}/${idProyecto}`,
        { 
            method: 'GET'
        });
        const data = await response.json();
        return data;
    }

    const editarProyecto = async (proyectoEditar) => {
        //debugger
        const response = await fetch(
            `${URLEditarProy}/${proyectoEditar.id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(proyectoEditar)
            })
        const data = await response.json()
        
        setProyectos([...proyectos.filter((proy) => proy.id !== proyectoEditar.id), data])
        setActualizar(!actualizar)
    }
        
    const eliminarProyecto = async (id) => { 
        await fetch(
        `${URLEliminarProy}/${id}`,
        { 
            method: 'DELETE'
        })
    
        setProyectos(proyectos.filter((proy) => proy.id !== id));
    }

    const filtrarPorCategoria = async(categoria) => {
        const response= await fetch(
            `${URLProyectos}/${categoria}`,
            {
                method: 'GET'
            }
        )
        const data = await response.json();
        return data
        //setProyectos(proyectos.filter((proy) => proy.categoria == categoria));
        
    }
    let proyectosAdmins = <ProyectosAdmins rol={"core team"}
                                proyectos={proyectos}
                                lideres={lideres} 
                                categorias={categorias}
                                onCrearProy={crearProyecto} 
                                onEliminarProy={eliminarProyecto} 
                                onPartiparProy={participarEnProyecto} 
                                onEditarProy={editarProyecto} 
                                onGetParticipacion={obtenerParticipacionProyecto}
                                onCancelarParticipacion={cancelarParticipacionProyecto}
                                onNumeroParticipantes={obtenerNumeroParticipantes}
                                tituloHeader={complementoHeader}
                                proyectosPasadosCategoria={proyectosPasadosCategoria}/> 
    let proyectosVoluntarios = <ProyectosVoluntarios rol={"core team"}
                                    proyectos={proyectos}
                                    onPartiparProy={participarEnProyecto}
                                    onGetParticipacion={obtenerParticipacionProyecto}
                                    onCancelarParticipacion={cancelarParticipacionProyecto}
                                    onNumeroParticipantes={obtenerNumeroParticipantes}
                                    tituloHeader={complementoHeader}
                                    proyectosPasadosCategoria={proyectosPasadosCategoria}/>
    //console.log(proyectosVoluntarios)
    return (
        <>
            <PuertaPermisos scopes={[SCOPES.canCrudProyectos]}>
                {proyectosAdmins}
            </PuertaPermisos>
            
            <PuertaPermisos scopes={[SCOPES.canNotCrudProyectos]}>
                {proyectosVoluntarios}
            </PuertaPermisos>
        </>
    );
}

const url = process.env.REACT_APP_API;
const URLLideres = `${url}get_lideres`
const URLParticiparProy = `${url}participate_proyecto`//`http://localhost:5000/participate_proyecto`
const URLProyectos = `${url}get_proyectos`//'http://localhost:5000/get_proyectos'
const URLCrearProy = `${url}create_proyecto`//'http://localhost:5000/create_proyecto'//
const URLEditarProy = `${url}update_proyecto`//'http://localhost:5000/update_proyecto'//
const URLEliminarProy = `${url}delete_proyecto`//'http://localhost:5000/delete_proyecto'//
const URLParticpaVoluntario = `${url}participate`//'http://localhost:5000/participate'//
const URLCancelarParticipProy = `${url}cancel_participate_proyecto`//http://localhost:5000/cancel_participate_proyecto/37/sesion/24
const URLNumeroParticipantes = `${url}get_numero_participantes` //'http://localhost:5000/get_rol/'
const URLProyectosPasados = `${url}get_proyectos_acabado`
const URLCategorias = `${url}get_categoria_proyectos`//``http://localhost:5000/get_categorias`//`
export default VistaProyectos;
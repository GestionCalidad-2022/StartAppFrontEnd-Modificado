// Componentes:
import { makeStyles } from '@material-ui/core/styles';
import HeaderCategoriasProyectos from '../organismos/HeaderCategoriasProyectos'
import FormularioCrearProyecto from '../moleculas/FormularioCrearProyecto'
import ContenidoCategoriasProyectos from '../organismos/ContenidoCategoriasProyectos'
import { Container } from '@material-ui/core';
// Librerias-Paquetes:
import {useState, useEffect, useRef} from 'react'

const useStyles = makeStyles(() => ({
    container: {
        width: '98%',
    },
}));

function VistaCategoriasProyectos() {
    const classes = useStyles();

    // Hooks:
    const [categorias, setCategorias] = useState([])
    const [lideres, setLideres] = useState([])
    const [mostrarFormCrear, setMostrarFormCrear] = useState(false)
    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true
        
        const getCategorias = async () => {
            const response = await fetch(URLCategorias)
            const data = await response.json()
            mountedRef.current && setCategorias(data)
        }
        const getLideres = async ()=>{
            const lideresDelServer = await fetchLideres()
            mountedRef.current && setLideres(lideresDelServer)
            //console.log(lideresDelServer)
        }
        getCategorias()
        getLideres()

        return () => mountedRef.current = false;// Desmontar componentes evitando warnings
    }, [] )

    // Endpoint fetch
    const crearProyecto = async (nuevoProyecto) => {
        await fetch(
            URLCrearProy,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(nuevoProyecto)
            })
    }
    async function fetchLideres() {
        const response = await fetch(URLLideres)
        const data = await response.json()
        let dataLider=[]
        let index=1
        for (let x of data ) {
            dataLider.push({"id":`${index}`,"nombre":`${x.nombre}`})
            index++
            
        }
        return dataLider;
    }

    // Methods:
    const activarFormCrear = () => {
        setMostrarFormCrear(!mostrarFormCrear);
    }

    // Components:
    const FormularioCrear = mostrarFormCrear===true ? <FormularioCrearProyecto onCrearProy={crearProyecto} onActivarForm={activarFormCrear} mostrarFormCrear={mostrarFormCrear} lideres={lideres} categorias={categorias}/> : <></>

    return (
        <Container className={classes.container}>
            <HeaderCategoriasProyectos  onActivarForm={activarFormCrear}/>
            {FormularioCrear}
            <ContenidoCategoriasProyectos categorias={categorias}/>
        </Container>
    );
}

const url = process.env.REACT_APP_API;
const URLLideres = `${url}get_lideres`
const URLCategorias = `${url}get_categoria_proyectos`//``http://localhost:5000/get_categorias`//`
const URLCrearProy = `${url}create_proyecto`//'http://localhost:5000/create_proyecto'//

export default VistaCategoriasProyectos;
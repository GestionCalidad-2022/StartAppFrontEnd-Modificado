// Componentes:
import BodyProyectoIndividual from '../organismos/BodyProyectoIndividual'

// Librerias-Paquetes:
import {useState, useEffect} from 'react'
import { Box } from '@material-ui/core';

function VistaProyectoIndividual() {
    // Hooks
    const [proyecto, setProyecto] = useState({})
    useEffect(() => {
        const getProyecto = async () => {
            let thisUrl = window.location.href;
            let id = getIdFromURL(thisUrl);
        const proyectoDelServer =  await obtenerProyecto(id)
        setProyecto(proyectoDelServer[0])
        }
        getProyecto()
    }, [])
    
    function getIdFromURL(thisUrl) {
        var id = thisUrl.substring(thisUrl.indexOf("/") + 1)
        id = thisUrl.split("/").pop()
        return id
      }

    // HTTP requests & functions

    const obtenerProyecto = async (idProyecto) => {
        const response = await fetch(`${URLProyecto}/${idProyecto}`)
        const data = await response.json()
        setProyecto(data)
        return data;
    }

    return (
        
        <Box className="body-container">
                <BodyProyectoIndividual proyecto={proyecto}/>
        </Box>
    );
}

const url = process.env.REACT_APP_API;
const URLProyecto = `${url}get_proyecto` //'http://localhost:5000/get_proyecto'

export default VistaProyectoIndividual;
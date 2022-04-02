//States
import {useState, useEffect} from 'react'
import PaginaProyectos from './Proyectos'

function ProyectosContainer() {
    const [proyectos, setProyectos] = useState([])
    // HTTP requests & functions
    useEffect(() => {
      const getProyectos = async () => {
        const proyectosDelServer =  await fetchProyectos()
        setProyectos(proyectosDelServer)
      }
      getProyectos()
    }, [] )

    async function fetchProyectos() {
      const response = await fetch(URLProyectos)
      return response.json();
    }
    //Elements
    let componenteProyectos = <PaginaProyectos proyectos={proyectos} />;
    let mensajeAlternativo = 'No Tasks To Show';
    let mostrarProyectos = proyectos.length > 0 ? componenteProyectos : mensajeAlternativo

  return (
    
    <div>
        {mostrarProyectos}
    </div>
    
  );
}

const url = process.env.REACT_APP_API
const URLProyectos = `${url}get_proyectos`

export default ProyectosContainer;

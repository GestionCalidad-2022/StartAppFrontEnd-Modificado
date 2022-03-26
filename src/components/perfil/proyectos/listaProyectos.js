import React, { useEffect, useState} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles} from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    section: {
        width:'100%',
    },
    containerSearchField:{
        display: 'flex',
        width:'100%',
        justifyContent:'space-between'
    },
    smallContainerSearchField:{
        display: 'flex',
        width:'100%',
        flexDirection: 'column',
    },
    containerTable:{
        height: 400,
        width: '100%',
    }
}))

const columns = [
    {
        field: 'titulo',
        headerName: 'Titulo',
        width: 270,
    },
    {
        field: 'lider',
        headerName: 'Lider(es)',
        width: 200,
    },
    {
        field: 'estado',
        headerName: 'Estado',
        type: 'phone',
        width: 200,
    },
    {
        field: 'categoria',
        headerName: 'Categoria',
        width: 200,
    },
    {
        field: 'fecha_inicio',
        headerName: 'Fecha de Inicio',
        width: 260,
    },
];

const url = process.env.REACT_APP_API;
const baseURL=`${url}sesion`;

function ListaProyectos () {
    const classes = useStyles()
    const [data, setData] = useState([])
    //const [originalData, setOriginalData] = useState([])
    const smallScreen = useMediaQuery('(min-width:700px)')
    const obtenerParticipacionProyecto = async () => {
        const idSesion = sessionStorage.getItem("id");
        const response = await fetch(
          `${baseURL}/${idSesion}/get_my_proyectos`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        data.map(element => element.fecha_inicio = element.fecha_inicio[0]+element.fecha_inicio[1]+element.fecha_inicio[2]+element.fecha_inicio[3]
            +element.fecha_inicio[4]+element.fecha_inicio[5]+element.fecha_inicio[6]+element.fecha_inicio[7]+element.fecha_inicio[8]+
            element.fecha_inicio[9]);
        setData(data);
        //setOriginalData(data);
    }

    useEffect( () => {
        obtenerParticipacionProyecto();
    }, [])

    return (
        <section className={classes.section}>
            <div className={(smallScreen)?classes.containerSearchField: classes.smallContainerSearchField}>
            </div>
            <div className={classes.containerTable}>
                <DataGrid 
                    columns={columns}
                    rows={data}
                    pageSize={20}
                /> 
            </div>
        </section>
        
    )
}

export default ListaProyectos
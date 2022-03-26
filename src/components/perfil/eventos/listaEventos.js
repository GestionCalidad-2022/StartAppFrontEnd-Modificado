import React, { useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles} from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';
import axios from "axios";

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
        field: 'nombre_evento',
        headerName: 'Evento', 
        width: 270,
    },
    {
        field: 'descripcion_evento',
        headerName: 'Descripcion', 
        width: 270,
    },
    {
        field: 'lider',
        headerName: 'Lider(es)',
        width: 200,
    },
    {
        field: 'modalidad_evento',
        headerName: 'Modalidad',
        width: 200,
    },
    {
        field: 'categoria',
        headerName: 'Categoria',
        width: 200,
    },
    {
        field: 'proyecto',
        headerName: 'Proyecto',
        width: 200,
    },
    {
        field: 'fecha_evento',
        headerName: 'Fecha de Inicio',
        width: 260,
    },
];

const url = process.env.REACT_APP_API;
//const localUrl=`http://localhost:5000/sesion`; //para pruebas
const localUrl=`${url}sesion`;
const api = axios.create({
 baseURL: localUrl,
  });

function ListaEventos () {
    const classes = useStyles()
    const [data, setData] = useState([])
    const smallScreen = useMediaQuery('(min-width:700px)')
    const obtenerParticipacionEvento = async () => {
        const idSesion = sessionStorage.getItem("id");
        let data = await api.get(
          `${localUrl}/${idSesion}/get_my_eventos`
        ).then(data => data);
        setData(data.data);
    }

    useEffect( () => {
        obtenerParticipacionEvento();
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

export default ListaEventos
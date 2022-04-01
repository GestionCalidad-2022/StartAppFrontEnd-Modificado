// Componentes:
import InputTexto from '../moleculas/InputTexto'
// Librerias-Paquetes:
import '../moleculas/FormularioCrearProyecto.css'
import { useState } from "react"
import React from 'react';
import { Button, Modal } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useForm, FormProvider } from "react-hook-form";
import DynamicDropdown from '../moleculas/DynamicDropdown'

function FormularioEditarProyecto({ onEditarProy, onActivarForm, proyecto, mostrarFormEditar, lideres, categorias }) {

    const methods = useForm()
    // CONSTANTES:
    const estados = [
        {value: 10, label: "CONCLUIDO", bool: false},
        {value: 20, label: "EN CURSO", bool: true}
    ]
    
    const estadoAcabadoValor = estados[0].value
    const estadoEnCursoValor = estados[1].value

    // HOOKS:
    // States fields
    const [fechaInicio, setFechaInicio] = useState(findValue("fechaInicio"))
    const [fechaFin, setFechaFin] = useState(findValue("fechaFin"))
    const [titulo, setTitulo] = useState(proyecto.titulo)
    const [descripcion, setDescripcion] = useState(proyecto.descripcion)
    const [objetivo, setObjetivo] = useState(proyecto.objetivo)//objetivo es un array en backend que esta nesteado 3 veces "{{{}}}"", pero obtenemos su string y es lo que se envia al request
    const [url_imagen, setImagenUrl] = useState(proyecto.url_imagen)
    // States dropwdown values
    const [estadoId, setEstadoId] = useState(findValue("estado"))
    const [categoriaId, setCategoriaId] = useState(findValue("categoria"))/*parseInt(categorias[0].id)*/
    const [liderId, setLiderId] = useState(findValue("lider"))/*parseInt(categorias[0].id)*/
    // Modal popup styles
    const [modalStyle] = React.useState(getModalStyle);
    

    // FUNCIONES:
    function resetStates() {
        setFechaInicio('')
        setFechaFin('')
        setTitulo('')
        setDescripcion('')
        setObjetivo('')
        setImagenUrl('')
    }
    function getModalStyle() {
        const top = 50;
        const left = 50;
        return {
            "@media (maxWidth: 375px)": {
                top: 0,
                left: 0,
            },
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    const handleModalClose = () => {
        onActivarForm()
    };


    function findValue(tipo){
        if(tipo==="estado"){
            const selectEstado = proyecto.estado===true?  estadoEnCursoValor : estadoAcabadoValor
            return selectEstado
        }
        if(tipo === "categoria"){
            const foundCategoria = categorias.find(catego => catego.tipo === proyecto.categoria)
            const selectCategoria = parseInt(foundCategoria.id)
            return selectCategoria
        }
        if(tipo === "lider"){
            const foundLider = lideres.find(lid=> lid.nombre === proyecto.lider)
            if (foundLider)
            {
                const selectLider = foundLider.id
                return selectLider
            }
            return 1  
        }
        if(tipo === "fechaInicio"){
            const mapFechaInicio = proyecto.fecha_inicio.substring(0, 10)
            return mapFechaInicio
        }
        if(tipo === "fechaFin"){
            const mapFechaFin = proyecto.fecha_fin
            return mapFechaFin? mapFechaFin.substring(0, 10) : ""
        }
        //NOTE: Completar con los ifs que hagan falta para mapear lo que haga falta
    }

    function validarFechas(estado){
        const [yearI, monthI,dayI ] = fechaInicio.split("-")
        const [yearF, monthF,dayF ] = fechaFin.split("-")
        const fecha_i_val = new Date(monthI+' '+dayI+' '+yearI);
        const fecha_f_val = new Date(monthF+' '+dayF+' '+yearF);
        const validacion = estado === true  &&  fecha_i_val >= fecha_f_val
        if(validacion){
            alert("-La fecha de finalizacion no puede ser menor ni igual a la fecha de inicio.\n\n-Amplie la fecha de finalización y coloque el estado deseado del proyecto (concluido o en curso)")
        }
        return validacion
        // NOTE: Validacion provisional para que no se pueda actualizar una fecha_fin > fecha_inicio
        // i = inicio, f = fin
    }
    
    const onChangeFechaInicio = (e) => {setFechaInicio(e.target.value)}
    const onChangeFechaFin = (e) => {setFechaFin(e.target.value)}
    const onChangeTitulo = (e) => {setTitulo(e.target.value)}
    const onChangeDescrip = (e) => {setDescripcion(e.target.value)}
    const onChangeObjetivo = (e) => {setObjetivo(e.target.value)}
    const onChangeLider = (e) => {setLiderId(e.target.value)}
    const onChangeCategoria = (e) => {setCategoriaId(e.target.value)}
    const onChangeEstado = (e) => {setEstadoId(e.target.value)}
    const onChangeImagenUrl = (e) => {setImagenUrl(e.target.value)}
    
    const onSubmit = data => {
        const estadoActual = estados.find(estado => estado.value === estadoId)
        const categoriaActual = categorias.find(catego => parseInt(catego.id) === categoriaId)
        const liderActual = lideres.find(lid=> lid.id===liderId)
        data.id = proyecto.id
        data.estado = estadoActual.bool
        data.categoria = categoriaActual.tipo
        data.lider = liderActual.nombre
        
        if(validarFechas(data.estado)) return

        onEditarProy(data) // callback editar proyecto
        resetStates()
        onActivarForm() // Oculta/Activa el formulario
        // NOTE: Los valores de dropdown se mapean y agregan al objeto "data" sin usar react-hook-form.
        //       Los demas campos si utilizan react-hook-form.
    }

    // COMPONENTS:
    const botonCancelarFormulario = 
        <Button onClick={onActivarForm}>
            <FontAwesomeIcon className="cancel-icon" icon={faTimes}/>
        </Button>;	
        
    const body = (
        <div style={modalStyle} className="paper-crear">
            <FormProvider {...methods}>
                <form  onSubmit={methods.handleSubmit(onSubmit)}>
                    {botonCancelarFormulario}
                    {/*NOTE: FORM TITLE*/}
                    <div className="crear-container-title">
                        <h4>Editar Proyecto</h4>
                    </div>
                    {/*NOTE: FORM FIELDS:*/}
                    <div style={{padding: "1% 3% 0 2%"}}>
                        {/*NOTE: FECHA INICIO*/}
                        <InputTexto type="date"
                                    tituloLabel={"Fecha de Inicio"}
                                    nameId="fecha_inicio"
                                    value={fechaInicio}
                                    onChange={onChangeFechaInicio}
                                    />
                        {/*NOTE: FECHA FIN*/}
                        <InputTexto type="date"
                                    tituloLabel={"Fecha de Fin"}
                                    nameId="fecha_fin"
                                    value={fechaFin}
                                    onChange={onChangeFechaFin}
                                    />
                        {/*NOTE: TITULO*/}
                        <InputTexto type="text"
                                    tituloLabel={"Nombre del Proyecto"}
                                    placeHolder="Nombre del Proyecto"
                                    nameId="titulo"
                                    value={titulo}
                                    onChange={onChangeTitulo}
                                    options={{required: true}}
                                    />
                        {/*NOTE: DESCRIPCION*/}
                        <InputTexto type="text"
                                    tituloLabel={"Descripción"}
                                    placeHolder="Descripción"
                                    nameId="descripcion"
                                    value={descripcion}
                                    onChange={onChangeDescrip}
                                    options={{required: true}}
                                    />
                        {/*NOTE: OBJETIVO*/}
                        <InputTexto type="text"
                                    tituloLabel={"Objetivo"}
                                    placeHolder="Objetivo"
                                    nameId="objetivo"
                                    value={objetivo}
                                    onChange={onChangeObjetivo}
                                    />
                        {/*NOTE: Dropwdown LIDER*/}
                        <DynamicDropdown titulo="Lideres"
                                        elements={lideres}
                                        value={liderId}
                                        onChange={onChangeLider}
                                        idField={'id'}
                                        labelField={'nombre'}
                        />
                        {/*NOTE: Dropwdown CATEGORIAS*/}
                        <DynamicDropdown titulo="Categorías"
                                        elements={categorias}
                                        value={categoriaId}
                                        onChange={onChangeCategoria}
                                        idField={'id'}
                                        labelField={'tipo'}/>
                        
                        {/*NOTE: Dropwdown ESTADO*/}
                        <DynamicDropdown titulo="Estados"
                                        elements={estados}
                                        value={estadoId}
                                        onChange={onChangeEstado}
                                        idField={'value'}
                                        labelField={'label'}/>
    
                        <InputTexto type="text" 
                                    tituloLabel="Imagen por Link"
                                    nameId="url_imagen" 
                                    value={url_imagen}
                                    onChange={onChangeImagenUrl}
                                    />
                        <div className="btn-crear-container">
                            <input type='submit' value='GUARDAR CAMBIOS' className='btn-proy-editar btn-proy-block'/>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>);
        
    // RENDER:
    return (
        <div>
            <Modal
                open={mostrarFormEditar}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                {body}
            </Modal>
        </div>
        
    );
}

export default FormularioEditarProyecto

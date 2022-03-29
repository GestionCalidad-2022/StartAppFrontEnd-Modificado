import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Field } from "react-final-form";
import axios from "axios";
import { useMediaQuery, Button, Grid } from "@material-ui/core";
import { TextField } from "final-form-material-ui";
import { useHistory } from "react-router-dom";


import Typography from "@material-ui/core/Typography";
import ProfileImage from "./ProfileImage";
import Chip from "@material-ui/core/Chip";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Card from "@material-ui/core/Card";

const { getCountries  } = require("country-list-spanish");
const url = process.env.REACT_APP_API;
const urlTablaExtensa = `${url}extended_form/`;
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25px',
        },
    },
    buttonContainer: {
      width: "100%",
      marginTop: "15px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    nameContainer: {
        display: "flex",
        justifyContent: "space-between",
    },
    titleCreaCuenta: {
      fontFamily: "'DM Sans', sans-serif !important",
      fontWeight: "700 !important",
      fontStyle: "normal",
      lineHeight: "31px",
      marginLeft: "5%",
    },
    registerCard: {
      padding: "30px",
      width: "750px",
      margin: "auto auto",
      background: "#F2F2F2",
      boxShadow:
        "0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.14), 0px 8px 10px -5px rgba(0, 0, 0, 0.2)",
      borderRadius: "6px 6px 0px 0px",
    },
    smallRegisterCard: {
      padding: "15px",
      width: "100%",
      boxShadow: "none",
    },
    chipRoot:{
    float: "right",
    marginRight: "12%"
    },
    titulo:{
        float: "center",
        padding : "10px"
    },
    textField: {
        marginBottom: "16px",
        background: "white",
    },
    formControl: {
        margin: "0px 0px 7px 10px",
        position: "relative",
        width: "94%",

    },
    menuPaper: {
        maxHeight: 300,
        maxWidth: 90
    },
    preguntaIni: {
        margin: "5px",
        fontSize: 16,
        fontFamily: "'DM Sans', sans-serif !important",
        color: "grey",
    },
    buttons: {
        width: "100%",
        height: "51px",
        marginTop: "7px",
        backgroundColor: "#3B3B3B",
        color: "#FFFFFF",
        fontWeight: "bold",
      },
  }));

const EditarPerfil = ({ sessionData }) => {
    const history = useHistory();
    const smallScreen = !useMediaQuery("(min-width:811px)")
    const classNames = useStyles();
    
    const [userExist, setUserExsit] = useState({
        userEx: false,
      });
    const [datos, setDatos] = useState({
        id_usuario: "",
        nombre: "",
        apellido: "",
        fecha_de_nacimiento: "",
        pais_de_recidencia: "",
        ciudad_de_recidencia: "",
        carrera: "",
        nivel_de_estudios: "",
        ocupacion: "",
        genero: "",
        descripcion_personal:"",
        estado_de_cuenta: "",
        rol: "",
        intereses: [],
        cualidades: [],
        aptitudes_tecnicas:[],
        id_autenticacion: "",
        nombre_contacto_de_emergencia: "",
        numero_contacto_de_emergencia: "",
        relacion_contacto_de_emergencia: "",
      });
      const [datosEdit, setDatosEdit] = useState({
        id_usuario: "",
        fecha_de_nacimiento: "",
        pais_de_recidencia: "",
        ciudad_de_recidencia: "",
        nivel_de_estudios: "",
        ocupacion: "",
        genero: "",
        descripcion_personal:"",
        estado_de_cuenta: "",
        rol: "",
        intereses: [],
        cualidades: [],
        aptitudes_tecnicas:[],
        id_autenticacion: "",
        nombre_contacto_de_emergencia: "",
        numero_contacto_de_emergencia: "",
        relacion_contacto_de_emergencia: "",
      });
    function removeNulls(model) {
    for (var value of Object.keys(model)) {
        model[value] = model[value] ? model[value] : "";
    }
    return model;
    }
    const handleInputChange = (event) => {
        setDatosEdit({
          ...datosEdit,
          [event.target.name]: event.target.value,
        });
    };
    const handleChange = (event) => {
        var nuevosInt = [];
        const tikeado = !event.target.checked;
          if (tikeado) {
            nuevosInt = datosEdit.intereses.filter((i) => i !== event.target.value);
          } else {
            nuevosInt = [...datosEdit.intereses, event.target.value];
          }
        setDatosEdit({ ...datosEdit, [event.target.name]: nuevosInt });
    };
    const handleChangeCualidades = (event) => {
        var nuevasCualidades = "";
        const tikeado = !event.target.checked;
       
          if (tikeado) {
            nuevasCualidades = datosEdit.cualidades.filter(
              (c) => c !== event.target.value
            );
          } else {
            nuevasCualidades = [...datosEdit.cualidades, event.target.value];
          } 
    
        setDatosEdit({ ...datosEdit, [event.target.name]: nuevasCualidades });
    };
    const handleChangeAptitudes = (event) => {
        var nuevasAptitudes = "";
        const tikeado = !event.target.checked;
          if (tikeado) {        
            nuevasAptitudes = datosEdit.aptitudes_tecnicas.filter(
              (c) => c !== event.target.value
            );
          } else {       
            nuevasAptitudes = [...datosEdit.aptitudes_tecnicas, event.target.value];        
          } 
        setDatosEdit({ ...datosEdit, [event.target.name]: nuevasAptitudes });
    };
    var peticionPost = async (asignaciones) => {
        
        await axios
          .post(urlTablaExtensa, asignaciones)
          .then((response) => {
            alert("actualizado correctamente");
        })
          .catch((error) => {
            console.log(error.message);
        });
    };
    var peticionPut = (asignaciones) => {
    axios
        .put(urlTablaExtensa + datos.id_usuario, asignaciones)
        // .then((response) => {
        //   console.log("")
        // })
        .catch((error) => {
        alert(error.message);
        });
    };
    function sendForm() {
        setDatos(datosEdit);
        console.log("datosEdit")
        console.log(datosEdit)
        const asignaciones = {
          fecha_de_nacimiento: datosEdit.fecha_de_nacimiento,
          pais_de_recidencia: datosEdit.pais_de_recidencia,
          ciudad_de_recidencia: datosEdit.ciudad_de_recidencia,
          carrera: datosEdit.carrera,
          ocupacion: datosEdit.ocupacion,
          descripcion_personal: datosEdit.descripcion_personal,
          genero: datosEdit.genero,
          estado_de_cuenta: datosEdit.estado_de_cuenta,
          rol: datosEdit.rol,
          intereses: datosEdit.intereses.toString(),
          cualidades: datosEdit.cualidades.toString(),
          aptitudes_tecnicas:datosEdit.aptitudes_tecnicas.toString(),
          id_autenticacion: sessionStorage.getItem("id"),
          nombre_contacto_de_emergencia: datosEdit.nombre_contacto_de_emergencia,
          numero_contacto_de_emergencia: datosEdit.numero_contacto_de_emergencia,
          relacion_contacto_de_emergencia:
            datosEdit.relacion_contacto_de_emergencia,
        };
        
        if (userExist.userEx) {

          peticionPut(asignaciones);      
          
        } else {
            console.log("asignaciones antes post")
        console.log(asignaciones)
          peticionPost(asignaciones);
          
        }    
    }
    useEffect(() => {
        const idsessionstorage = sessionStorage.getItem("id");
        const responseAutenticacion = {
            id_autenticacion: idsessionstorage,
        };
        axios
            .get(urlTablaExtensa + responseAutenticacion.id_autenticacion)
            .then((response) => {
            if (response.data.data) {
                setDatos({ ...removeNulls(response.data.data) });
                setDatosEdit({ ...removeNulls(response.data.data) });
            } else {
                setUserExsit({ userEx: false });
            }
            });
    }, [datos.id]);
    const onSubmit = async (values) => {
        return 1;
    }; 
    return ( 
        <div style={{backgroundColor: "#F7F7F7"}}>
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={6} md={12}  justifyContent="center">
            <Typography variant="h2" className={classNames.titulo}>Editar Perfil</Typography>
            </Grid>
            <Grid container item xs={6} md={6}  justifyContent="flex-end">
                <Chip
                    className ={smallScreen? "": classNames.chipRoot}
                    variant="outlined"
                    icon={<EditTwoToneIcon />}
                    label="Volver"
                    clickable
                    onClick={() => history.push(`/Cuenta`)}
                    />
            </Grid>
        </Grid>
        <ProfileImage getDataProfile={datosEdit} setDataProfile={setDatosEdit} sessionData={sessionData}/>
        <Card
          className={
            smallScreen ? classNames.smallRegisterCard : classNames.registerCard
          }
        >
            <Typography variant="subtitle1" style={{fontWeight: "bold", marginLeft: "10px"}}>Datos Personales</Typography>
            <Form onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                    <form className={classNames.root} onSubmit={handleSubmit} noValidate autoComplete="off">
                        <div className={classNames.nameContainer}>
                            <Field
                            style={{ width: "45%" }}
                            name="nombre"
                            type="text"
                            placeholder={datos.nombre? datos.nombre.split(" ")[0]: ""}
                            className={classNames.textField}
                            component={TextField}
                            variant="outlined"
                            size="small"
                            disabled
                            />

                            <Field
                            style={smallScreen ?  {width: "45%"}: { width: "45%", marginRight: "26px"}}
                            name="apellido"
                            type="text"
                            placeholder={datos.apellido? datos.apellido.split(" ")[0]: ""}
                            className={classNames.textField}
                            component={TextField}
                            variant="outlined"
                            size="small"
                            disabled
                            />
                        </div>
                        <Field
                            style={{ width: "95%" }}
                            name="fecha_de_nacimiento"
                            type="date"
                            placeholder="Fecha de Nacimiento"
                            className={classNames.textField}
                            component={TextField}
                            onChange={handleInputChange}
                            value={datosEdit.fecha_de_nacimiento.split("T")[0]}
                            variant="outlined"
                            size="small"
                        />
                        <FormControl className={classNames.formControl}>
                            <InputLabel id="customized-select-label">Ocupación:</InputLabel>
                            <Select
                                id='customized-select'
                                name="ocupacion"
                                value={datosEdit.ocupacion}
                                onChange={handleInputChange}
                                MenuProps={{ classes: { paper: classNames.menuPaper } }}
                            >
                                <MenuItem value="">
                                    <em>Ninguna</em>
                                </MenuItem>
                                <MenuItem value="Colegio">Colegio</MenuItem>
                                <MenuItem value="Universidad">Universidad</MenuItem>
                                <MenuItem value="Trabajando">Trabajando</MenuItem>
                            </Select>
                        </FormControl>
                        <Field
                            style={{ width: "95.5%" }}
                            name="Profesión_u_Oficio"
                            type="text"
                            placeholder="Profesión u Oficio"
                            onChange={handleInputChange}
                            className={classNames.textField}
                            component={TextField}
                            value={datosEdit.carrera}
                            variant="outlined"
                            size="small"
                        />
                        <FormControl className={classNames.formControl}>
                            <InputLabel id="customized-select-label">País de recidencia:</InputLabel>
                            <Select
                                id='customized-select'
                                name="pais_de_recidencia"
                                value={datosEdit.pais_de_recidencia}
                                onChange={handleInputChange}
                                MenuProps={{ classes: { paper: classNames.menuPaper } }}
                            >
                                <MenuItem defaultvalue="">
                                    <em>Ninguna</em>
                                </MenuItem>
                                {getCountries().map(pais => (
                                    <MenuItem key={pais} value={pais}>{pais}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Field
                            style={{ width: "95.5%" }}
                            name="ciudad_de_recidencia"
                            type="text"
                            placeholder="ciudad de recidencia"
                            className={classNames.textField}
                            onChange={handleInputChange}
                            component={TextField}
                            value={datosEdit.ciudad_de_recidencia}
                            variant="outlined"
                            size="small"
                        />
                        <Field
                            style={{ width: "95.5%" }}
                            name="telefono"
                            type="text"
                            placeholder={datos.telefono}
                            className={classNames.textField}
                            component={TextField}
                            value={datosEdit.telefono}
                            variant="outlined"
                            size="small"
                            disabled
                        />
                        <div className={classNames.preguntaIni}>
                            <Typography variant="subtitle2"className={classNames.preguntaIni}>
                                Para actualizar tu número de teléfono escribenos a perfil@startamericastogether.org
                            </Typography>
                        </div>
                        <Typography variant="subtitle1" style={{fontWeight: "bold", marginLeft: "10px"}}>Contacto de Emergencia</Typography>
                        <Field
                            style={{ width: "95.5%" }}
                            name="relacion_contacto_de_emergencia"
                            type="text"
                            placeholder="nombre de contacto de emergencia"
                            onChange={handleInputChange}
                            className={classNames.textField}
                            component={TextField}
                            value={datosEdit.nombre_contacto_de_emergencia}
                            variant="outlined"
                            size="small"
                        />
                        <Field
                            style={{ width: "95.5%" }}
                            name="relacion_contacto_de_emergencia"
                            type="text"
                            placeholder="relacion de contacto de emergencia"
                            onChange={handleInputChange}
                            className={classNames.textField}
                            component={TextField}
                            value={datosEdit.relacion_contacto_de_emergencia}
                            variant="outlined"
                            size="small"
                        />
                        <Field
                            style={{ width: "95.5%" }}
                            name="numero_contacto_de_emergencia"
                            type="text"
                            placeholder="numero de contacto de emergencia"
                            onChange={handleInputChange}
                            className={classNames.textField}
                            component={TextField}
                            value={datosEdit.numero_contacto_de_emergencia}
                            variant="outlined"
                            size="small"
                        />
                        <Typography variant="subtitle1" style={{fontWeight: "bold", marginLeft: "10px"}}>
                            Mi pequeña descripción
                        </Typography>
                        <Field
                            style={{ width: "95.5%"}}
                            name="descripcion_personal"
                            type="text"
                            placeholder="descripcion personal"
                            onChange={handleInputChange}
                            className={classNames.textField}
                            component={TextField}
                            value={datosEdit.descripcion_personal}
                            variant="outlined"
                            multiline
                            rows={4}
                            size="small"
                        />
                        <Typography variant="subtitle1" style={{fontWeight: "bold", marginLeft: "10px"}}>
                            Mis Intereses
                        </Typography>
                        <div className={classNames.checkboxes}>
                            <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <input
                                checked={datosEdit.intereses.includes("Medio ambiente")}
                                onChange={handleChange}
                                value="Medio ambiente"
                                name="intereses"
                                id="MedioambienteCheck"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="MedioambienteCheck">Medio ambiente</label>
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                checked={datosEdit.intereses.includes("Trabajo social")}
                                onChange={handleChange}
                                value="Trabajo social"
                                name="intereses"
                                id="TrabajosocialCheck"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="TrabajosocialCheck">Trabajo social</label>
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                checked={datosEdit.intereses.includes("Empoderamiento")}
                                onChange={handleChange}
                                value="Empoderamiento"
                                name="intereses"
                                id="EmpoderamientoCheck"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="EmpoderamientoCheck">Empoderamiento</label>
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                checked={datosEdit.intereses.includes("Perritos callejeros")}
                                onChange={handleChange}
                                value="Perritos callejeros"
                                name="intereses"
                                id="PerritoscallejerosCheck"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="PerritoscallejerosCheck">
                                Perritos callejeros
                                </label>
                            </Grid>
                            <Grid item xs={6.5} md={6}>
                                <input
                                checked={datosEdit.intereses.includes(
                                    "Desarrollo sostenible"
                                )}
                                onChange={handleChange}
                                value="Desarrollo sostenible"
                                name="intereses"
                                id="DesarrollosostenibleCheck"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="DesarrollosostenibleCheck">
                                Desarrollo Sostenible
                                </label>
                            </Grid>
                            <Grid item xs={4} md={6}>
                                <input
                                checked={datosEdit.intereses.includes("Educacion")}
                                onChange={handleChange}
                                value="Educacion"
                                name="intereses"
                                id="educacionCheck"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="educacionCheck">Educación</label>
                            </Grid>
                            </Grid>
                        </div>
                        <Typography variant="subtitle1" style={{fontWeight: "bold", marginLeft: "10px"}}>
                            Mis Cualidades
                        </Typography>
                        <div className={classNames.checkboxes}>
                            <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <input
                                checked={datosEdit.cualidades.includes("Liderazgo")}
                                onChange={handleChangeCualidades}
                                value="Liderazgo"
                                name="cualidades"
                                id="liderazgo-check"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="liderazgo-check">Liderazgo</label>
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                checked={datosEdit.cualidades.includes("Organizacion")}
                                onChange={handleChangeCualidades}
                                value="Organizacion"
                                name="cualidades"
                                id="organizacion-check"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="organizacion-check">Organización</label>
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                checked={datosEdit.cualidades.includes("Aprendizaje rapido")}
                                onChange={handleChangeCualidades}
                                value="Aprendizaje rapido"
                                name="cualidades"
                                id="aprendizaje-rapido"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="aprendizaje-rapido">Aprendizaje rápido</label>
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                checked={datosEdit.cualidades.includes("Trabajo en equipo")}
                                onChange={handleChangeCualidades}
                                value="Trabajo en equipo"
                                name="cualidades"
                                id="trabajo-en-equipo-check"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="trabajo-en-equipo-check">
                                Trabajo en equipo
                                </label>
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                checked={datosEdit.cualidades.includes("Creatividad")}
                                onChange={handleChangeCualidades}
                                value="Creatividad"
                                name="cualidades"
                                id="creatividad-check"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="creatividad-check">Creatividad</label>
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                checked={datosEdit.cualidades.includes("Paciencia")}
                                onChange={handleChangeCualidades}
                                value="Paciencia"
                                name="cualidades"
                                id="paciencia-check"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="paciencia-check">Paciencia</label>
                            </Grid>
                            </Grid>
                        </div>
                        <Typography variant="subtitle1" style={{fontWeight: "bold", marginLeft: "10px"}}>
                            Mis Aptitudes
                        </Typography>
                        <div className={classNames.checkboxes}>
                            <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <input
                                checked={datosEdit.aptitudes_tecnicas.includes("Excel")}
                                onChange={handleChangeAptitudes}
                                value="Excel"
                                name="aptitudes_tecnicas"
                                id="Excel-check"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="Excel-check">Excel</label>
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                checked={datosEdit.aptitudes_tecnicas.includes("Illustrator")}
                                onChange={handleChangeAptitudes}
                                value="Illustrator"
                                name="aptitudes_tecnicas"
                                id="Illustrator-check"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="Illustrator-check">Illustrator</label>
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                checked={datosEdit.aptitudes_tecnicas.includes("WordPress")}
                                onChange={handleChangeAptitudes}
                                value="WordPress"
                                name="aptitudes_tecnicas"
                                id="WordPress-check"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="WordPress-check">WordPress</label>
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                checked={datosEdit.aptitudes_tecnicas.includes("PowerPoint")}
                                onChange={handleChangeAptitudes}
                                value="PowerPoint"
                                name="aptitudes_tecnicas"
                                id="PowerPoint-check"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="PowerPoint-check">PowerPoint</label>
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                checked={datosEdit.aptitudes_tecnicas.includes("Canva")}
                                onChange={handleChangeAptitudes}
                                value="Canva"
                                name="aptitudes_tecnicas"
                                id="Canva-check"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="Canva-check">Canva</label>
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                checked={datosEdit.aptitudes_tecnicas.includes("Adobe Premiere")}
                                onChange={handleChangeAptitudes}
                                value="Adobe Premiere"
                                name="aptitudes_tecnicas"
                                id="Adobe Premiere-check"
                                type="checkbox"
                                />
                                {` `}
                                <label htmlFor="Adobe Premiere-check">Adobe Premiere</label>
                            </Grid>
                            </Grid>
                        </div>

                    </form>
                )}
            </Form>
            <Button
                onClick={sendForm}
                className={classNames.buttons}
                variant="contained"
                borderradius="20%"
                >
                Guardar Cambios
            </Button>
        </Card>
        </div>
    )
}

  export default EditarPerfil;
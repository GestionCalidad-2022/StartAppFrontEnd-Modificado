import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button, Modal } from "@material-ui/core";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import "./Profile.css";
import Grid from "@material-ui/core/Grid";
import ProfileCard from "./ProfileCard";
import ProfileImage from "./ProfileImage";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Chip from "@material-ui/core/Chip";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import { useMediaQuery, Typography } from "@material-ui/core";
import DialogConfirm from "./DialogConfirm"

const { getCountries } = require("country-list-spanish");

const url = process.env.REACT_APP_API;
const urlTablaExtensa = `${url}extended_form/`;


//const urlTablaExtensa = "http://localhost:5000/extended_form/";

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

const useStyles = makeStyles((theme) => ({
  containerbuttons: {
    display: "flex",
    justifyContent: "center",
    marginBottom:"30px"
  },
  buttons: {
    width: "90%",
    backgroundColor:"#545454",
    margin: "7px",
  },
  intputextaera: {
    width: "97%",
    height: "100px",
    background: "#FFFFFF",
    border: "1px solid #C4C4C4",
    boxSizing: "border-box",
    borderRadius: "6px",
    padding: "3px 5px",
    margin: "7px 0px 7px 0px",
    position: "relative",
    left: "3%",
    resize: "none",
  },
  intputs: {
    width: "97%",
    height: "51px",
    background: "#FFFFFF",
    border: "1px solid #C4C4C4",
    boxSizing: "border-box",
    borderRadius: "6px",
    padding: "3px 5px",
    margin: "7px 0px 7px 0px",
    position: "relative",
    left: "3%",
  },
  checkboxes: {
    width: "76%",
    padding: "3px 5px",
    margin: "7px 0px 7px 0px",
    position: "relative",
    left: "3%",
  },
  checkcualidades: {
    width: "76%",
    padding: "3px 5px",
    margin: "7px 0px 7px 0px",
    position: "relative",
    left: "3%",
  },
  titulos: {
    width: "97%",
    position: "relative",

    left: "3%",
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  chipRootSmall:{
    position: "absolute",
    right: "2%",
    top: "37.2%",
  },
  chipRoot:{
    float: "right",
    marginRight: "12%"
    }
}));

const Profile = ({sessionData}) => {

  
  const [userExist, setUserExsit] = useState({
    userEx: false,
  });

  const [datos, setDatos] = useState({
    id_usuario: "",
    fecha_de_nacimiento: "",
    pais_de_recidencia: "",
    ciudad_de_recidencia: "",
    carrera: "",
    nivel_de_estudios: "",
    ocupacion: "",
    genero: "",
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

  const handleInputChange = (event) => {
    setDatosEdit({
      ...datosEdit,
      [event.target.name]: event.target.value,
    });
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
      id_autenticacion: datosEdit.id_autenticacion,
      nombre_contacto_de_emergencia: datosEdit.nombre_contacto_de_emergencia,
      numero_contacto_de_emergencia: datosEdit.numero_contacto_de_emergencia,
      relacion_contacto_de_emergencia:
        datosEdit.relacion_contacto_de_emergencia,
    };
    
    if (userExist.userEx) {
      peticionPut(asignaciones);      
      setOpen(false);
      handleClickOpenSnakbar( TransitionDown,{ vertical: 'top', horizontal: 'center' })
      
    } else {
      peticionPost(asignaciones);
      setOpen(false);
    }
    
  }

  function removeNulls(model) {
    for (var value of Object.keys(model)) {
      model[value] = model[value] ? model[value] : "";
    }
    return model;
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const idsessionstorage = sessionStorage.getItem("id");
    const responseAutenticacion = {
      id_autenticacion: idsessionstorage, // descomentanto esta linea y eliminando la linea de abajo deberia recuperar los datos del logueado
      //  id_autenticacion: "1",
    };

    axios
      .get(urlTablaExtensa + responseAutenticacion.id_autenticacion)
      .then((response) => {
        if (response.data.data) {
          setUserExsit({ userEx: true });
          
          setDatos({ ...removeNulls(response.data.data) });
          setDatosEdit({ ...removeNulls(response.data.data) });
        } else {
          setUserExsit({ userEx: false });
        }
      });
  }, [datos.id]);

  const location = useLocation();
  const classNamees = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const smallScreen = !useMediaQuery("(min-width:811px)")
  const [transition, setTransition] = React.useState(undefined);
  const [state, setState] = React.useState({
    openSnakbar: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, openSnakbar } = state;
  function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
  }
  const handleClickOpenSnakbar = (Transition,newState) => {
      setTransition(() => Transition);
      setState({ openSnakbar: true, ...newState });
  };

  const handleCloseSnakbar = () => {
      setState({ ...state, openSnakbar: false });
      
      
  };


  const handleOpen = () => {//modal form
    setOpen(true);
  };


  const handleClose = () => {//modal form
    setDatosEdit(datos);
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className="paperr">
      <div>
        <span className={classNamees.titulos} style={{fontWeight:"bold", fontSize:"1.2em", color:"#545454"}}>
            Datos Personales:
        </span>
        <form className="fomrExt">
        <input
            className={classNamees.intputs}
            style={{width:"47%", marginRight:"10px", background:"transparent"}}
            value={datosEdit.nombre}
            disabled
            placeholder="Nombre"
            name="nombre"
            id="nombre"
            type="text"
          />
          <input
            className={classNamees.intputs}
            style={{width:"48%",background:"transparent"}}
            value={datosEdit.apellido}
            disabled
            placeholder="Apellido"
            name="apellido"
            id="apellido"
            type="text"
          />
          
          
          <input
            className={classNamees.intputs}
            type="date"
            name="fecha_de_nacimiento"
            value={datosEdit.fecha_de_nacimiento.split("T")[0]}
            onChange={handleInputChange}
          />

          
          <select
            name="ocupacion"
            value={datosEdit.ocupacion}
            onChange={handleInputChange}
            className={classNamees.intputs}
          >
            <option value="Colegio">Colegio</option>
            <option value="Universidad">Universidad</option>
            <option value="Trabajando">Trabajando</option>
          </select>

          
          <input
            className={classNamees.intputs}
            value={datosEdit.carrera}
            onChange={handleInputChange}
            placeholder="Profesión u Oficio"
            name="carrera"
            id="carrera"
            type="text"
          />
          <br></br>

          
          <input
            className={classNamees.intputs}
            value={datosEdit.ciudad_de_recidencia}
            onChange={handleInputChange}
            placeholder="Ciudad de residencia"
            name="ciudad_de_recidencia"
            id="ciudad_de_recidencia"
            type="text"
          />
          <br></br>

          
          <select
            name="pais_de_recidencia"
            value={datosEdit.pais_de_recidencia}
            onChange={handleInputChange}
            className={classNamees.intputs}
          >
            {getCountries().map(pais => (
              <option key={pais} value={pais}>{pais}</option>
            ))}
          </select>
          <select
            name="genero"
            value={datosEdit.genero}
            onChange={handleInputChange}
            className={classNamees.intputs}
          >
            <option value="">Género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
            <option value="Prefiero no decirlo">Prefiero no decirlo</option>
          </select>
          
          <input
            className={classNamees.intputs}
            value={datosEdit.telefono}
            disabled
            style={{background:"transparent"}}
            placeholder="Telefono"
            name="telefono"
            id="telefono"
            type="text"
          />
          <br></br>
          <span className={classNamees.titulos} style={{fontSize:"0.8em",color:"grey"}}>
          Para actualizar tu número de teléfono escribenos a perfil@startamericastogether.org
          </span>
          <br></br><br></br>
          <span className={classNamees.titulos} style={{fontWeight:"bold", fontSize:"1.2em",color:"#545454"}}>
            Contacto de emergencia:
          </span>
          
          <input
            className={classNamees.intputs}
            value={datosEdit.nombre_contacto_de_emergencia}
            onChange={handleInputChange}
            placeholder="Nombre de contacto de emergencia"
            name="nombre_contacto_de_emergencia"
            id="nombre_contacto_de_emergencia"
            type="text"
          />
          
          <input
            className={classNamees.intputs}
            value={datosEdit.relacion_contacto_de_emergencia}
            onChange={handleInputChange}
            placeholder="Relación de contacto de emergencia"
            name="relacion_contacto_de_emergencia"
            id="relacion_contacto_de_emergencia"
            type="text"
          />
          
          <input
            className={classNamees.intputs}
            value={datosEdit.numero_contacto_de_emergencia}
            onChange={handleInputChange}
            placeholder="Número de contacto de emergencia"
            name="numero_contacto_de_emergencia"
            id="numero_contacto_de_emergencia"
            type="text"
          />
          <br></br>
          <label className={classNamees.titulos} 
            style={{fontWeight:"bold", fontSize:"1.2em",color:"#545454"}}
            htmlFor="descripcion_personal">
            Mi descripción:
          </label>
          <textarea
            className={classNamees.intputextaera}
            value={datosEdit.descripcion_personal}
            onChange={handleInputChange}
            name="descripcion_personal"
            id="descripcion_personal"
          ></textarea>
          <br></br>
          



          <label className={classNamees.titulos}
          style={{fontWeight:"bold", fontSize:"1.2em",color:"#545454"}}>Mis intereses:</label>
          <br></br>
          <div className={classNamees.checkboxes}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
                  Desarrollo sostenible
                </label>
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
          <label className={classNamees.titulos}
          style={{fontWeight:"bold", fontSize:"1.2em",color:"#545454"}}>Mis Cualidades:</label>
          <br></br>
          <div className={classNamees.checkboxes}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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



          <label className={classNamees.titulos}
          style={{fontWeight:"bold", fontSize:"1.2em",color:"#545454"}}>Mis Aptitudes:</label>
          <br></br>
          <div className={classNamees.checkboxes}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
      </div>
      <div className={classNamees.containerbuttons}>
        <Button
          onClick={sendForm}
          color="primary"
          className={classNamees.buttons}
          variant="contained"
          borderradius="20%"
        >
          Guardar Cambios
        </Button>
        
        
      </div>
      <DialogConfirm/>
    </div>
  );

  return (
    
    <div>
      <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openSnakbar}
            autoHideDuration={1500}
            onClose={handleCloseSnakbar}
            TransitionComponent={transition}
            key={transition ? transition.name : ''}
        >
            <Alert onClose={handleCloseSnakbar} severity="success" variant="filled">
                Se Actualizo correctamente!
            </Alert>
        </Snackbar>
      {location.pathname === "/" && <Link to="/profile">Perfil</Link>}
      <div>
        {location.pathname !== "/" && (
          <div className={classNamees.name}>
            {smallScreen? <Typography variant="h2" style={{padding : "10px"}}>Cuenta</Typography>: "" }
            <ProfileImage getDataProfile={datosEdit} setDataProfile={setDatosEdit} sessionData={sessionData}/>
            <Chip
              className ={smallScreen? classNamees.chipRootSmall: classNamees.chipRoot}
              variant="outlined"
              icon={<EditTwoToneIcon />}
              label="Editar Perfil"
              clickable
              onClick={handleOpen}
            />
            <ProfileCard getDataProfile={datosEdit} handleOpenprop={handleOpen} sessionData={sessionData}/>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-descripcion_personal"
            >
              {body}
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

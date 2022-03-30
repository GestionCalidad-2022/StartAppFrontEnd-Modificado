import React, { Component, Fragment } from "react";
import axios from "axios";
import { Container, Card, Modal, Button, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./EventsList.css";
import Chip from "@material-ui/core/Chip";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import TextField from "@mui/material/TextField";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import EliminarEvento from "./EliminarEvento";
import Typography from "@material-ui/core/Typography";
import { Grid, Box, CardHeader } from "@material-ui/core/";
import { CardContent, CardMedia } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faInbox,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import GoogleCalendar from "./googleCalendar.jsx";

const url = process.env.REACT_APP_API;
const urlDeploy = `${url}eventos`;
const urlCrearEvento = `${url}eventos/crearevento`;
const urlLideres = `${url}lideres`;
const urlProyectos = `${url}get_proyectos`;
const apiLideres = axios.create({
  baseURL: urlLideres,
});

const apiProyectos = axios.create({
  baseURL: urlProyectos,
});

const current = new Date();

const currentDate = `${current.getFullYear()}-${("0" + parseInt(current.getMonth()+1)).slice(-2)}-${("0" + current.getDate()).slice(-2)}`;

const api = axios.create({
  baseURL: urlDeploy,
});
const urlParticipacion = `${urlDeploy}/participate_evento/`;

class EventsList extends Component {
  state = {
    events: [],
    participaciones: [],
    user: "",
    divcontainer: true,
    container: false,
    abierto: false,
    botonMostrar: false,
    botonArchivar: true,
    botonMostrarEventosNoArchivados: false,
    botonMostrarEventosArchivados: true,
    success: false,
    categoriaFiltrada: "Todas",
    categorias: [],

    modalInsertar: false,
    form: {
      nombre_evento: "",
      descripcion_evento: "",
      lider: "",
      modalidad_evento: "Presencial",
      lugar_evento: "",
      fecha_evento: "",
      categoria: "Todas",
      estado: "1",
      hora_inicio: "",
      hora_fin: "",
      proyecto: "Ninguno",
    },
    lideres: [],
    proyectos: [],
    snackbarAbierto: false,
    mensajeSnackbar: "",
    severidadSnackbar: "",
  };

  constructor() {
    super();
    this.getEvents();
    this.getParticipaciones();
    this.getCategorias();
    this.getUserRol();
    this.getLideres();
    this.getProyectos();
    this.active = false;
    this.selectedEvent = {};
  }

  abrirModal = () => {
    this.setState({ abierto: !this.state.abierto });
  };
  getCategorias = async () => {
    let data = await api.get("/categorias").then(({ res }) => data);
    let aux = data.map((item) => {
      return item.interes;
    });
    aux.unshift("Todas");
    this.setState({ categoriaFiltrada: aux[0] });
    this.setState({ categorias: aux });
  };

  getEvents = async () => {
    try {
      let data = await api.get("/").then(({ res }) => data);
      if (this.state.categoriaFiltrada !== "Todas") {
        data = data.filter(
          (event) =>
            (event.fecha_evento === currentDate ||
              event.fecha_evento > currentDate) &&
            event.categoria === this.state.categoriaFiltrada
        );
        this.setState({ container: true });
      } else {
        data = data.filter(
          (event) =>
            event.fecha_evento === currentDate ||
            event.fecha_evento > currentDate
        );
        this.setState({ container: true });
      }

      this.setState({ events: data });
    } catch (err) {
      console.log(err);
    }
  };
  getCategorias = async () => {
    let data = await api.get("/categorias").then(({ res }) => data);
    let aux = data.map((item) => {
      return item.interes;
    });
    aux.unshift("Todas");
    this.setState({ categoriaFiltrada: aux[0] });
    this.setState({ categorias: aux });
  };

  getEventsArchivados = async () => {
    try {
      this.state.botonMostrar = true;
      this.state.botonArchivar = false;
      this.state.botonMostrarEventosNoArchivados = true;
      this.state.botonMostrarEventosArchivados = false;
      let data = await api.get("/").then(({ res }) => data);
      if (this.state.categoriaFiltrada !== "Todas") {
        data = data.filter(
          (event) =>
            event.fecha_evento < currentDate &&
            event.categoria === this.state.categoriaFiltrada
        );
        this.setState({ container: true });
      } else {
        data = data.filter((event) => event.fecha_evento < currentDate);
        this.setState({ container: true });
      }
      if (data == null) {
        this.setState({ container: true });
      }
      this.setState({ events: data });
    } catch (err) {
      console.log(err);
    }
  };

  deleteEvento = async (event) => {
    await axios.delete(urlDeploy + "/" + event.id);
    this.getEvents();
    this.abrirModal();
  };

  //Peticiones pertenecientes a Archivar y Motrar
  peticionArchivar = async (event) => {
    await axios.put(urlDeploy + "/archivar_evento/" + event.id);
    this.getEventsArchivados();
    window.location.reload();
  };

  peticionMostrar = async (event) => {
    this.state.botonMostrar = false;
    this.state.botonArchivar = true;
    this.state.botonMostrarEventosNoArchivados = false;
    this.state.botonMostrarEventosArchivados = true;
    await axios.put(urlDeploy + "/mostrar_evento/" + event.id);
    this.getEvents();
  };
  sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  //Funciones pertenecientes a obtener Participacion
  postParticipacion = async (event) => {
    let newUrl =
      urlParticipacion + event.id + "/sesion/" + window.sessionStorage.id;
    return await axios
      .post(newUrl, {
        id: event.id,
        id_autenticacion: window.sessionStorage.id,
      })
      .then(async (response) => {
        this.mostrarMensajeSnackbar(event);
        await this.mensajeConfirmacionParticipacion(event);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  getParticipaciones = async () => {
    try {
      var data = await api
        .get(`/participante/${window.sessionStorage.id}`)
        .then(({ res }) => data);
      this.setState({ participaciones: data });
    } catch (err) {
      console.log(err);
    }
  };

  filterChangeHandler = (categoria) => {
    this.setState({ categoriaFiltrada: categoria.target.value });
    this.getEvents();
  };
  filterPastEventsChangeHandler = (categoria) => {
    this.setState({ categoriaFiltrada: categoria.target.value });
    this.getEventsArchivados();
  };
  mensajeConfirmacionParticipacion = async (event) => {
    this.handleClick(); //abre el snackbar
    await this.sleep(2000);
    window.location.reload();
  };

  //Funciones pertenecientes a Eliminacion Participacion
  eliminarParticipacion = async (event) => {
    await axios
      .delete(
        urlDeploy +
          "/eliminar_participacion/" +
          event.id +
          "/" +
          window.sessionStorage.id
      )
      .then((response) => {
        this.mostrarMensajeSnackbar(event);
        this.mensajeConfirmacionEliminacionParticipacion(event);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  mensajeConfirmacionEliminacionParticipacion = async (event) => {
    this.handleClick(); //abre el snackbar
    await this.sleep(2000);
    window.location.reload();
  };

  //Mostrar y Ocultar botones participacion
  validarBotones(event) {
    return !this.state.participaciones.some(function (evento) {
      return evento.id_evento === event.id;
    });
  }

  mostrarMensajeSnackbar = (event) => {
    if (this.validarBotones(event)) {
      this.setState({
        mensajeSnackbar: "Tu participación en el evento ha sido registrada",
        severidadSnackbar: "success",
      });
    } else {
      this.setState({
        mensajeSnackbar: "Tu participación en el evento ha sido eliminada",
        severidadSnackbar: "success",
      });
    }
  };

  getUserRol = async () => {
    try {
      let data = await axios.get(
        url + "extended_form/" + window.sessionStorage.id
      );
      let rol = await data.data.data.rol;
      this.setState({ user: rol });
    } catch (err) {
      console.log(err);
    }
  };

  //Funciones Crear Evento

  mostrarModalInsertar() {
    this.setState({
      modalInsertar: true,
    });
  }

  peticionPost = async () => {
    if (this.state.form.nombre_evento && this.state.form.fecha_evento) {
      if (this.state.form.nombre_evento.trim().length > 0) {
        await axios
          .post(urlCrearEvento, this.state.form)
          .then((response) => {
            this.insertar();
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        this.handleClick();
        this.setState({
          mensajeSnackbar: "Nombre del evento vacío",
          severidadSnackbar: "error",
        });
      }
    } else {
      this.handleClick();
      this.setState({
        mensajeSnackbar: "Nombre del Evento o Fecha del Evento vacía",
        severidadSnackbar: "error",
      });
    }
  };

  getLideres = async () => {
    try {
      let data = await apiLideres.get("/").then(({ res }) => data);
      let aux = data.map((item) => {
        return item.nombre + " " + item.apellido;
      });
      aux.unshift("Sin Lider");
      let result = aux.filter((item, index) => {
        return aux.indexOf(item) === index;
      });
      this.setState({ lideres: result });
    } catch (err) {
      console.log(err);
    }
  };

  getProyectos = async () => {
    try {
      let data = await apiProyectos.get("/").then(({ res }) => data);
      let aux = data.map((item) => {
        return item.titulo;
      });
      aux.unshift("No Seleccionado");
      let result = aux.filter((item, index) => {
        return aux.indexOf(item) === index;
      });
      this.setState({ proyectos: result });
    } catch (err) {
      console.log(err);
    }
  };

  cerrarModalInsertar() {
    this.setState({ modalInsertar: false });
  }

  insertar = async () => {
    this.handleClick();
    this.setState({
      mensajeSnackbar: "Evento Guardado",
      severidadSnackbar: "success",
    });
    await this.sleep(2000);
    this.cerrarModalInsertar();
    window.location.reload();
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleClose = () => this.setState({ snackbarAbierto: false });
  handleClick = () => this.setState({ snackbarAbierto: true });

  render() {
    const rolUser = this.state.user;
    const { snackbarAbierto } = this.state;

    return (
      <div>
        <Container className="container1">
          <div>
            <div className="Chip-Eventos">
              <Chip
                style={{
                  marginTop: "20px",
                  left: "10px",
                }}
                variant="outlined"
                icon={<NavigateBeforeIcon />}
                label="Volver"
                clickable
                onClick={() => window.history.back()}
              />
            </div>

            <div className="Titulo-Eventos">
              <h1
                style={{
                  paddingLeft: "50px",
                  paddingTop: "15px",
                  display:
                    this.state.botonMostrarEventosArchivados === true
                      ? "block"
                      : "none",
                }}
              >
                <Typography gutterBottom variant="h2" component="h3">
                  EVENTOS VIGENTES
                </Typography>
              </h1>

              <h1
                style={{
                  paddingLeft: "50px",
                  paddingTop: "15px",
                  display:
                    this.state.botonMostrarEventosArchivados === false
                      ? "block"
                      : "none",
                }}
              >
                <Typography gutterBottom variant="h2" component="h3">
                  EVENTOS PASADOS
                </Typography>
              </h1>
            </div>

            <div className="Menu-Bar-Evento">
              <div className="header-filtro-eventos">
                <span
                  style={{
                    display:
                      this.state.botonMostrarEventosArchivados === true
                        ? "block"
                        : "none",
                  }}
                  className="span-align"
                >
                  Categoria:
                </span>

                <select
                  style={{
                    display: this.state.botonMostrarEventosArchivados
                      ? "block"
                      : "none",
                  }}
                  value={this.state.categoriaFiltrada}
                  onChange={this.filterChangeHandler}
                >
                  {this.state.categorias.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>

                <span
                  style={{
                    display:
                      this.state.botonMostrarEventosArchivados === false
                        ? "block"
                        : "none",
                  }}
                  className="span-align"
                >
                  Categoria:
                </span>

                <select
                  style={{
                    display:
                      this.state.botonMostrarEventosArchivados === false
                        ? "block"
                        : "none",
                  }}
                  value={this.state.categoriaFiltrada}
                  onChange={this.filterPastEventsChangeHandler}
                >
                  {this.state.categorias.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div
                className="header-botones-eventos"
                style={{ display: "flex" }}
              >
                {rolUser !== "voluntario" ? (
                  <Fragment>
                    <Button
                      style={{
                        borderRadius: 4,
                        height: 51,
                        backgroundColor: "#269BD5",
                        fontSize: "16px",
                        margin: "5px",
                        padding: "2px",
                        borderColor: "#269BD5",
                      }}
                      onClick={() => this.mostrarModalInsertar()}
                    >
                      CREAR EVENTO
                    </Button>
                    <Button
                      style={{
                        display: this.state.botonMostrarEventosArchivados
                          ? "block"
                          : "none",
                        borderRadius: 4,
                        height: 51,
                        backgroundColor: "#3B3B3B",
                        fontSize: "16px",
                        margin: "5px",
                        padding: "4px",
                        borderColor: "#3B3B3B",
                      }}
                      onClick={() => this.getEventsArchivados()}
                    >
                      EVENTOS PASADOS
                    </Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Button
                      style={{
                        display: this.state.botonMostrarEventosArchivados
                          ? "block"
                          : "none",

                        borderRadius: 4,
                        height: 51,
                        backgroundColor: "#3B3B3B",
                        fontSize: "16px",
                        margin: "5px",
                        padding: "4px",
                        borderColor: "#3B3B3B",
                      }}
                      onClick={() => this.getEventsArchivados()}
                    >
                      Eventos Pasados
                    </Button>
                  </Fragment>
                )}
                <Button
                  href="/eventos"
                  style={{
                    display: this.state.botonMostrarEventosNoArchivados
                      ? "block"
                      : "none",
                    borderRadius: 4,
                    height: 51,
                    backgroundColor: "#3B3B3B",
                    fontSize: "16px",
                    margin: "5px",
                    padding: "4px",
                    paddingTop: "1vmax",
                    borderColor: "#3B3B3B",
                  }}
                >
                  EVENTOS VIGENTES
                </Button>
              </div>
            </div>
          </div>

          <div className="Container-Body">
            {this.state.events.map((event) => (
              <div className="Tarjeta-Principal-Evento" key={event.id}>
                <div className="card1">
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://www.startamericastogether.org/wp-content/uploads/2021/03/main-banner.jpg"
                    className="img-fluid"
                  />

                  <div className="CardScroll">
                    <CardHeader
                      title={event.nombre_evento}
                      subheader={event.descripcion_evento}
                      titleTypographyProps={{ gutterBottom: true }}
                    />
                    <CardContent>
                      <p className="card-info">
                        <b>La Modalidad del Evento es:</b>{" "}
                        {event.modalidad_evento}
                      </p>
                      <p className="card-info">
                        <b>Fecha:</b> {event.fecha_evento}{" "}
                      </p>
                      <p className="card-info">
                        <b>Lugar:</b> {event.lugar_evento}{" "}
                      </p>
                      <p className="card-info">
                        {" "}
                        <b>Categoría:</b> {event.categoria}{" "}
                      </p>
                    </CardContent>
                  </div>

                  <CardBody className="CardBody-Eventos">
                    <div class="btn-container-dus">
                      {this.validarBotones(event) ? (
                        <Button
                          variant="contained"
                          onClick={() => {
                            this.postParticipacion(event);
                          }}
                          style={{
                            borderRadius: 4,
                            height: 51,
                            backgroundColor: "#269BD5",
                            fontSize: "16px",
                            margin: "3px",
                            width: "110px",
                            display:
                              this.state.botonMostrarEventosArchivados === true
                                ? "block"
                                : "none",
                          }}
                        >
                          {" "}
                          Participar
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            this.eliminarParticipacion(event);
                          }}
                          style={{
                            color: "3B3B3B",
                            borderRadius: 4,
                            height: 51,
                            fontSize: "13.5px",
                            margin: "3px",
                            width: "110px",
                            display:
                              this.state.botonMostrarEventosArchivados === true
                                ? "block"
                                : "none",
                          }}
                        >
                          {" "}
                          Dejar de Participar
                        </Button>
                      )}
                      {rolUser !== "voluntario" ? (
                        <Fragment>
                          <Button
                            style={{
                              borderRadius: 4,
                              height: 51,
                              backgroundColor: "#B3DA3F",
                              fontSize: "16px",
                              width: "110px",
                              margin: "3px",
                            }}
                          >
                            {" "}
                            <Link to={"eventos/" + event.id}>
                              Detalles
                            </Link>{" "}
                          </Button>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <Button
                            style={{
                              borderRadius: 4,
                              height: 51,
                              backgroundColor: "#B3DA3F",
                              fontSize: "16px",
                              margin: "3px",
                              width: "110px",
                            }}
                          >
                            {" "}
                            <Link to={"eventos/" + event.id}>
                              Detalles
                            </Link>{" "}
                          </Button>
                        </Fragment>
                      )}
                      {rolUser !== "voluntario" ? (
                        <Fragment>
                          <EliminarEvento event={event} />
                        </Fragment>
                      ) : (
                        <></>
                      )}
                    </div>
                  </CardBody>
                </div>
              </div>
            ))}
          </div>
        </Container>

        <div>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={snackbarAbierto}
            onClose={this.handleClose}
            autoHideDuration={3000}
          >
            <MuiAlert
              onClose={this.handleClose}
              severity={this.state.severidadSnackbar}
              elevation={6}
              variant="filled"
            >
              {this.state.mensajeSnackbar}
            </MuiAlert>
          </Snackbar>
        </div>

        <Modal id="ModalFormCrearEvento" isOpen={this.state.modalInsertar}>
          <div className="Titulo">
            <strong>Crear Evento</strong>
          </div>

          <form className="FormularioCrearEvento">
            <TextField
              label="Nombre del evento"
              placeholder="Nombre del evento"
              name="nombre_evento"
              className="nombreEventoCrear textInput"
              type="text"
              onChange={this.handleChange}
            />

            <br></br>

            <TextField
              id="filled-multiline-flexible"
              multiline
              maxRows={4}
              label="Descripción"
              placeholder="Descripcion"
              className="descripcionEventoCrear textInput"
              name="descripcion_evento"
              type="text"
              onChange={this.handleChange}
            />

            <div>
              <div>
                <label className="LabelLiderCrearEvento">Lider</label>
              </div>
              <div>
                <select
                  label="Lider"
                  className="liderEventoCrear textInput"
                  name="lider"
                  onChange={this.handleChange}
                >
                  {this.state.lideres.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <div>
                <label className="LabelModalidadCrearEvento">Modalidad</label>
              </div>
              <select
                className="nombreEventoCrear textInput"
                name="modalidad_evento"
                onChange={this.handleChange}
                label="Modalidad"
              >
                <option value="Presencial" name="modalidad_evento">
                  Presencial
                </option>
                <option value="Virtual" name="modalidad_evento">
                  Virtual
                </option>
              </select>
            </div>

            <TextField
              label="Lugar"
              className="LugarEventoCrear textInput"
              placeholder="Lugar"
              name="lugar_evento"
              type="text"
              onChange={this.handleChange}
            />

            <TextField
              className="FechaEventoCrear textInput"
              name="fecha_evento"
              type="date"
              onChange={this.handleChange}
            />

            <div>
              <div>
                <label className="LabelCategoriaCrearEvento">Categoria</label>
              </div>
              <div>
                <select
                  label="Categoria"
                  className="CategoriaEventoCrear textInput"
                  name="categoria"
                  onChange={this.handleChange}
                >
                  {this.state.categorias.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <div>
                <label className="LabelProyectoCrearEvento">Proyecto</label>
              </div>
              <div>
                <select
                  className="ProyectoEventoCrear textInput"
                  name="proyecto"
                  onChange={this.handleChange}
                  label="Proyecto"
                >
                  {this.state.proyectos.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <TextField
              className="HoraInicioEventoCrear textInput"
              name="hora_inicio"
              type="time"
              onChange={this.handleChange}
            />

            <TextField
              className="HoraFinEventoCreae textInput"
              name="hora_fin"
              type="time"
              onChange={this.handleChange}
            />

            <div className="CamposBotones">
              <Button
                className="botonCrear"
                // disabled={this.state.form.nombre_evento && this.state.form.fecha_evento? false:true}
                onClick={() => this.peticionPost()}
              >
                Guardar Evento{" "}
              </Button>
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                open={this.snackbarAbierto}
                onClose={this.handleClose}
                autoHideDuration={4000}
              >
                <MuiAlert
                  onClose={this.handleClose}
                  severity={this.state.severidadSnackbar}
                  elevation={6}
                  variant="filled"
                >
                  {this.state.mensajeSnackbar}
                </MuiAlert>
              </Snackbar>

              <Button
                className="botonCancelar"
                onClick={() => this.cerrarModalInsertar()}
              >
                {" "}
                Cancelar{" "}
              </Button>
            </div>
          </form>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={this.snackbarAbierto}
            onClose={this.handleClose}
            autoHideDuration={3000}
          >
            <MuiAlert
              onClose={this.handleClose}
              severity={this.state.severidadSnackbar}
              elevation={6}
              variant="filled"
            >
              {this.state.mensajeSnackbar}
            </MuiAlert>
          </Snackbar>
        </Modal>
      </div>
    );
  }
}
export default EventsList;

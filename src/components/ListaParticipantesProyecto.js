import { Box, Button } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import ExportExcel from "react-export-excel";
import { withStyles } from "@material-ui/core";

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;
const url = process.env.REACT_APP_API;

class ListaParticipantesProyecto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      inicio: "",
      fin: "",
    };
  }

  componentDidMount() {
    let thisUrl = window.location.href;
    let id = this.getId(thisUrl);
    axios
      .get(`${url}eventos/participantes/${id}`)
      .then((response) => {
        this.setState({ posts: response.data });
        console.log(response.data);
        this.setState({
          inicio:
            "Hora inicio: " + response.data[0].hora_inicio.substring(0, 10),
        });
        let fin = response.data[0].hora_fin;
        console.log(fin);
        if (fin == null) {
          this.setState({ fin: "Hora fin: en progreso " });
        } else {
          this.setState({ fin: "Hora fin: " + fin });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getId(thisUrl) {
    return thisUrl.split("/").pop();
  }

  render() {
    const { posts } = this.state;
    return (
      <Box>
        <ExcelFile
          element={
            <ExportarButton variant="contained">Exportar Lista</ExportarButton>
          }
          filename="ListaParticipantes"
        >
          <ExcelSheet data={posts} name="Participantes">
            <ExcelColumn label="Evento" value="nombre_evento" />
            <ExcelColumn label="Hora Inicio" value="hora_inicio" />
            <ExcelColumn label="Hora Fin" value="hora_fin" />
            <ExcelColumn label="Nombre" value="nombre" />
            <ExcelColumn label="Apellido" value="apellido" />
            <ExcelColumn label="Rol" value="rol" />
            <ExcelColumn label="Telefono" value="telefono" />
          </ExcelSheet>
        </ExcelFile>
      </Box>
    );
  }
}
const ExportarButton = withStyles((theme) => ({
  root: {
    marginRight: 10,
    marginLeft: 10,
    width: "25%",
    background: "green",
    color: "white",
  },
}))(Button);
export default ListaParticipantesProyecto;

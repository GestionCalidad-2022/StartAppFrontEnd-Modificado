import React, { useEffect, useState } from "react";
import { DataGrid, esES } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import SearchField from "./SearchByField";
import { useMediaQuery } from "@material-ui/core";
import DownloadButton from "./DownloadExcelButton";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Popover } from "@material-ui/core";
import EditUser from "./EditUser";

const useStyles = makeStyles((theme) => ({
  section: {
    width: "75%",
    margin: "50px auto",
  },
  containerSearchField: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  smallContainerSearchField: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  containerTable: {
    width: "100%",
    paddingBottom: "50px",
  },
  popoverPosition: {
    position: "absolute",
    top: "250px",
    right: "0",
  },
  respPopoverPosition: {
    position: "absolute",
    bottom: "130px",
    right: "0",
  },
}));

const columns = [
  {
    field: "nombre_completo",
    headerName: "Nombre",
    width: 200,
  },
  {
    field: "fecha_de_nacimiento",
    headerName: "Edad",
    width: 150,
  },
  {
    field: "genero",
    headerName: "Género",
    width: 150,
  },
  {
    field: "ocupacion",
    headerName: "Ocupación",
    width: 180,
  },
  {
    field: "carrera",
    headerName: "Carrera",
    width: 200,
  },
  {
    field: "telefono",
    headerName: "Teléfono",
    type: "phone",
    width: 200,
  },
  {
    field: "ciudad_de_recidencia",
    headerName: "Ciudad de Residencia",
    width: 280,
  },
  {
    field: "pais_de_recidencia",
    headerName: "País de Residencia",
    width: 280,
  },
  {
    field: "persona_contacto_de_emergencia",
    headerName: "Persona de Contacto",
    width: 280,
  },
  {
    field: "numero_contacto_de_emergencia",
    headerName: "Número de Contacto",
    width: 280,
  },
  {
    field: "estado_de_disponibilidad",
    headerName: "Disponibilidad",
    width: 220,
  },
  {
    field: "rol",
    headerName: "Rol",
    width: 150,
  },
];

const theme = createTheme(esES);
const url = process.env.REACT_APP_API;
const baseURL = `${url}extended_form`;
const calculateAge = (birthday) => {
  // birthday is a date
  birthday = new Date(birthday);
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

function Users({sessionData}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rowToUpdate, setRowToUpdate] = React.useState(null);

  const handleClick = (params) => {
    setRowToUpdate(params);
    const position = document.getElementById("position-popover");
    setAnchorEl(position);
  };

  const handleClose = () => {
    setAnchorEl(null);
    let newUsers = data.map((u) => {
      return rowToUpdate.id_usuario === u.id_usuario
        ? {
            ...rowToUpdate,
            nombre_completo: `${rowToUpdate.nombre ? rowToUpdate.nombre : ""} ${
              rowToUpdate.apellido ? rowToUpdate.apellido : ""
            }`,
            persona_contacto_de_emergencia: `${
              rowToUpdate.nombre_contacto_de_emergencia
                ? rowToUpdate.nombre_contacto_de_emergencia
                : ""
            } (${
              rowToUpdate.relacion_contacto_de_emergencia
                ? `${rowToUpdate.relacion_contacto_de_emergencia}`
                : ""
            })`,
          }
        : u;
    });
    setData(newUsers);
    newUsers = originalData.map((u) => {
      return rowToUpdate.id_usuario === u.id_usuario
        ? {
            ...rowToUpdate,
            nombre_completo: `${rowToUpdate.nombre ? rowToUpdate.nombre : ""} ${
              rowToUpdate.apellido ? rowToUpdate.apellido : ""
            }`,
            persona_contacto_de_emergencia: `${
              rowToUpdate.nombre_contacto_de_emergencia
                ? rowToUpdate.nombre_contacto_de_emergencia
                : ""
            } (${
              rowToUpdate.relacion_contacto_de_emergencia
                ? `${rowToUpdate.relacion_contacto_de_emergencia}`
                : ""
            })`,
          }
        : u;
    });
    setOriginalData(newUsers);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const wideScreen = useMediaQuery("(min-width:700px)");
  const usersGet = async () =>
    await axios
      .get(baseURL)
      .then((response) => {
        var resp = response.data.data;
        resp = resp.map((person) => {
          return {
            ...person,
            id: person.id_usuario,
            nombre_completo: `${person.nombre ? person.nombre : ""} ${
              person.apellido ? person.apellido : ""
            }`,
            fecha_de_nacimiento: calculateAge(
              person.fecha_de_nacimiento
            ).toString(),
            persona_contacto_de_emergencia: `${
              person.nombre_contacto_de_emergencia
                ? person.nombre_contacto_de_emergencia
                : ""
            } (${
              person.relacion_contacto_de_emergencia
                ? `${person.relacion_contacto_de_emergencia}`
                : ""
            })`,
          };
        });
        setData(resp);
        setOriginalData(resp);
      })
      .catch((error) => {
        console.log(error);
      });

  useEffect(() => {
    usersGet();
  }, []);

  return (
    <section className={classes.section}>
      <div
        id="position-popover"
        className={
          wideScreen ? classes.popoverPosition : classes.respPopoverPosition
        }
      ></div>
      <div
        className={
          wideScreen
            ? classes.containerSearchField
            : classes.smallContainerSearchField
        }
      >
        <DownloadButton data={data} />
        <SearchField
          data={data}
          setData={setData}
          originalData={originalData}
        />
      </div>
      <div className={classes.containerTable}>
        <ThemeProvider theme={theme}>
          <DataGrid
            columns={columns}
            rows={data}
            pageSize={20}
            rowHeight={40}
            autoHeight
            onRowClick={(sessionData.role === "core team")?(params) => handleClick(params.row):{}}
          />
        </ThemeProvider>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div style={{ margin: "5px 30px" }}>
          <EditUser rowToUpdate={rowToUpdate} setRowToUpdate={setRowToUpdate} handleCloseButton={handleClose}/>
        </div>
      </Popover>
    </section>
  );
}

export default Users;

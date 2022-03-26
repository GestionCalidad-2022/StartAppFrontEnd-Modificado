import React from "react"
import {
  Modal,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  useMediaQuery,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import EditIcon from "@material-ui/icons/Edit"
import { fields } from "./SearchByField"
import { InputByCriteria } from "./InputsByFields"
import axios from "axios"
import SnackbarMessage from "../templates/SnackbarMessage"

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    paddingTop: "40px",
  },
  respPaper: {
    position: "absolute",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    paddingTop: "40px",
  },
  modalBody: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  respModalBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px 20px",
  },
  logoButton: {
    color: "white",
    backgroundColor: "#269BD5",
    padding: "5px 5px",
    borderStyle: "none",
    borderRadius: "5px",
    "&:hover": { backgroundColor: "#1F79A6" },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  modalButtons: {
    display: "flex",
    justifyContent: "flex-end",
  },
}))

function getModalStyle() {
  const top = 50
  const left = 50
  return {
    "@media (maxWidth: 375px)": {
      top: 0,
      left: 0,
    },
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const EditUser = ({ rowToUpdate, setRowToUpdate, handleCloseButton }) => {
  const fieldsToEdit = {...fields, "Insignias":""}
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [modalStyle] = React.useState(getModalStyle)
  const [criteria, setCriteria] = React.useState("Rol")
  const [newValue, setNewValue] = React.useState({})
  const wideScreen = useMediaQuery("(min-width:700px)")
  const [insignias, setInsignias] = React.useState([])
  const [todasInsignias, setTodasInsignias] = React.useState([])
  const [snackbar, setSnackbar] = React.useState({
    message: "",
    active: false,
    severity: "success",
    afterClose: () => {},
  })
  React.useEffect(() => {
    const URL = process.env.REACT_APP_API
    axios.get(`${URL}insignias/${rowToUpdate.id}`)
      .then((response)=>{
        if (response.status === 200){
          setInsignias(response.data.data.insignias)
          axios.get(`${URL}insignias`)
            .then((response)=>{
              setTodasInsignias(response.data.data)}
            )
        }
      })
      .catch((error)=>{
        console.log(error)
      })
  }, [rowToUpdate.id])
  const handleOpen = () => {
    setOpen(true)
    setNewValue(rowToUpdate)
  }

  const handleClose = () => {
    setOpen(false)
    handleCloseButton()
  }

  const handleChange = (event) => {
    setCriteria(event.target.value)
  }

  const activeSnackbar = (message, severity, afterClose) => {
    setSnackbar({ message, severity, afterClose, active: true })
  }
  
  const API_URL = process.env.REACT_APP_API
  const updateUserField = () => {
    if (newValue[fieldsToEdit[criteria]]) {
      setRowToUpdate(newValue)
      const user = { [fieldsToEdit[criteria]]: newValue[fieldsToEdit[criteria]] }
      axios
        .put(`${API_URL}extended_form/${rowToUpdate.id_usuario}`, user)
        .then((response) => {
          if (response.status === 202) {
            activeSnackbar(
              `Se han registrado los cambios.`,
              "success",
              () => {}
            )
          }
        })
        .catch((error) => {
          activeSnackbar("Ha ocurrido un error.", "error", () => {})
        })
    }
    else{
        activeSnackbar("Ingrese valores en el campo.", "warning", () => {})
    }
  }
  const updateInsigniasField= () => {
    const body = {"insignias": insignias.join(',')}
    axios.put(`${API_URL}insignias/${rowToUpdate.id_usuario}`, body)
      .then((response) => {
        if (response.status === 202) {
          activeSnackbar(
            `Se han registrado los cambios.`,
            "success",
            () => {}
          )
        }
      })
      .catch((error) => {
        activeSnackbar("Ha ocurrido un error.", "error", () => {})
      })
  }

  const body = (
    <div
      style={modalStyle}
      className={wideScreen ? classes.paper : classes.respPaper}
    >
      <div className={wideScreen ? classes.modalBody : classes.respModalBody}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Criterio</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={criteria}
            onChange={handleChange}
          >
            {Object.keys(fieldsToEdit).map((field) => {
              if (field !== "Edad") {
                return (
                  <MenuItem key={`${field}-edit`} value={field}>
                    {field}
                  </MenuItem>
                )
              } else {
                return <div key="none" style={{ display: "none" }} />
              }
            })}
          </Select>
        </FormControl>
        <InputByCriteria
          criteria={criteria}
          newValue={newValue}
          insignias = {insignias}
          setInsignias = {setInsignias}
          todasInsignias={todasInsignias}
          setNewValue={setNewValue}
        />
      </div>
      <div className={classes.modalButtons} style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if(criteria === "Insignias") {updateInsigniasField()}
            else {updateUserField()}
          }}
          style={{ marginRight: "20px" }}
        >
          Confirmar
        </Button>
        <Button
          variant="contained"
          onClick={() => handleClose()}
        >
          Cancelar
        </Button>
      </div>
    </div>
  )

  return (
    <div>
      <button
        onClick={handleOpen}
        color="primary"
        className={classes.logoButton}
      >
        <EditIcon />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <SnackbarMessage snackbar={snackbar} setActive={setSnackbar} />
          {body}
        </div>
      </Modal>
    </div>
  )
}

export default EditUser

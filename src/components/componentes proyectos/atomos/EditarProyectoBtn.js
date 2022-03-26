// Componentes:
import './EditarProyectoBtn.css'
// Librerias-Paquetes-Estilos:
import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from "@material-ui/core/styles";

function EditarProyectoBtn({onActivarForm, proyecto}) {
    const click = () => {
        onActivarForm(proyecto)
    }
    return (
         <EditButton onClick={click}>
            <FontAwesomeIcon className="edit-icon" icon={faEdit} />
        </EditButton>
    )
}

const EditButton = withStyles((theme) => ({
    root: {
      backgroundColor: "#E3E3E3",
      width: '20',
      borderRadius: '40px',
    },
}))(Button);

export default EditarProyectoBtn

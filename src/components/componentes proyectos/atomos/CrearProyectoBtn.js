// Componentes:
import './CrearProyectoBtn.css';
// Librerias-Paquetes-Estilos:
import { Button } from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles";

function CrearProyectoBtn({onActivarForm}) {
    return (
        <CrearButton variant="contained" onClick={onActivarForm}>
            Crear proyecto
        </CrearButton>
    )
}

const CrearButton = withStyles((theme) => ({
    root: {
      color: "#FFFFFF",
      backgroundColor: "#269BD5",
    },
}))(Button);

export default CrearProyectoBtn

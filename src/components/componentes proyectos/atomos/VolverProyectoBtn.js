
// Librerias-Paquetes-Estilos:
import { Button} from '@material-ui/core';
import {useHistory} from "react-router-dom"
import {withStyles} from "@material-ui/core/styles";


function VolverProyectoBtn() {
    let history = useHistory();
    const texto="< Volver"
    return (
        <AtrasButton variant="outlined" onClick={() => history.goBack()}> {texto}</AtrasButton>
    )
}
const AtrasButton = withStyles((theme) => ({
    root: {
      color: "black",
      whiteSpace: 'nowrap',
      minWidth: "100px",
      width: '10%',
      textAlign: 'center',
      borderRadius: 20,
      marginTop: "10px",
    },
  }))(Button);
export default VolverProyectoBtn
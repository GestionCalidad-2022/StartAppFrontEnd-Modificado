import {Box} from '@material-ui/core';
import Proyecto from './Proyecto.js';

function Proyectos({proyectos}) {
    console.log(proyectos.values)
    return (
        <>
            <Box  style={styles}>
                {
                    proyectos.map(proyecto => (
                        <Proyecto key={proyecto.id} proyecto={proyecto} />
                    ))
                }
            </Box>
        </>
    );
}

const styles = {
    marginTop:"5%",
    display: "flex"
}
export default Proyectos;
// Componentes:

// Librerias-Paquetes:
import { Chip } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";

// Styles
const useStyles = makeStyles({
    chip: {
        position: 'relative',
        bottom: '278px',
        right: '0',
        left: '220px',
        backgroundColor: 'rgba(196, 196, 196, 0.65)',
        color: 'white',
        fontSize: '10px',
        letterSpacing: '2px',
        width: '117px',
        height: '25px',
        paddingTop: '3px',
    },
});


function handleClick () { return null; }

function ContenidoProyecto() {
    const classes = useStyles();
    return (
        <Chip  label="PARTICIPANDO"
                onClick={handleClick} 
                className={classes.chip}/>
    );
}

export default ContenidoProyecto
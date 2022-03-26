// Componentes:
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CrearProyectoBtn from '../atomos/CrearProyectoBtn'
// Permisos/Roles:
import PuertaPermisos from '../organismos/PuertaPermisos';
import {SCOPES} from '../organismos/map-permisos';

// Librerias-Paquetes:
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    far_right: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '3%'
    },
});


function HeaderCategoriasProyectos({onActivarForm}) {
    const classes = useStyles()
    return (
        <Box>
            <Grid container justifyContent="center" alignItems={"center"} style= {{padding: "5px 0px 10px 0px"}}>
                    <Grid item xs={5} md={7}>
                        <Typography gutterBottom variant="h2" component="h3" >
                            PROYECTOS
                        </Typography>
                    </Grid>
                    <Grid item xs={7} md={5} className={classes.far_right}>
                        <PuertaPermisos scopes={[SCOPES.canCrudProyectos]}>
                                <CrearProyectoBtn onActivarForm={onActivarForm}/>
                        </PuertaPermisos>
                        
                    </Grid>
                </Grid>
        </Box>
    );
}
export default HeaderCategoriasProyectos;
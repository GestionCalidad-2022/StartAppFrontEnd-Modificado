// Componentes:
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import TarjetaCategoriaProyecto from '../moleculas/TarjetaCategoriaProyecto'
// Permisos/Roles:
// Librerias-Paquetes:

const useStyles = makeStyles(() => ({
    container: {
        padding: '0 10px',
    },
    item: {
        height: '200px',
    },
}));

function ContenidoCategoriasProyectos({categorias}) {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Grid container spacing={4}>
                {categorias.map(categoria => (
                    <Grid item key={categoria.id} xs={6} sm={6} md={4} lg={4} className={classes.item}> 
                        <TarjetaCategoriaProyecto imagen={categoria.imagenArchivo? categoria.imagenArchivo : categoria.imagen} 
                                                    categoria={categoria.tipo}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
export default ContenidoCategoriasProyectos;

/* 
<Grid container spacing={4} >
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.item}> 
                    <TarjetaCategoriaProyecto imagen={ambiental} categoria={"ambiental"}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.item}> 
                    <TarjetaCategoriaProyecto imagen={animalista} categoria={"animalista"}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} className={classes.item}> 
                    <TarjetaCategoriaProyecto imagen={social} categoria={"social"}/>
                </Grid>
            </Grid>
*/
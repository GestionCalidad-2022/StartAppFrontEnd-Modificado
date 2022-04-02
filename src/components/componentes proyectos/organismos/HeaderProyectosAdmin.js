// Componentes:

import VolverProyectoBtn from '../atomos/VolverProyectoBtn';
// Librerias-Paquetes-Estilos: 
import './HeaderProyectos.css';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import { makeStyles, createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles({
    far_right: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '3%'
    },
});

let theme = createTheme();
theme = responsiveFontSizes(theme);

function HeaderProyectosAdmin({tituloHeader}) {
    const classes = useStyles()
    const complementoTitulo = tituloHeader? tituloHeader : ''
    return (
        <Container >
                <Box>
                    <VolverProyectoBtn/>
                </Box>
                <Grid container justifyContent="space-between" alignItems={"center"}>
                    <Grid item xs={5} md={7}>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h3">{`Proyectos ${complementoTitulo}`}</Typography>
                        </ThemeProvider>
                    </Grid>
                    <Grid item xs={7} md={5} className={classes.far_right}>
                        {/*Aqui cualquier componente para la esquina derecha*/}
                    </Grid>
                </Grid>
        </Container>
        
    );
}

export default HeaderProyectosAdmin
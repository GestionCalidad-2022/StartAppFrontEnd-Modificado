// Componentes:
import './HeaderProyectos.css';
import VolverProyectoBtn from '../atomos/VolverProyectoBtn';
// Librerias-Paquetes:
import { Container, Grid, Box, Typography } from '@material-ui/core';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
//import { makeStyles } from '@material-ui/core/styles';

/*const useStyles = makeStyles({
    far_right: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '3%'
    },
});*/
let theme = createTheme();
theme = responsiveFontSizes(theme);


function HeaderProyectos({tituloHeader}) {
    const complementoTitulo = tituloHeader? tituloHeader : ''
    return (
        <Container >
                <Box>
                    <VolverProyectoBtn/>
                </Box>
                <Grid container justifyContent="center" alignItems={"center"}>
                    <Grid item xs={5} md={7}>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h3">{`Proyectos ${complementoTitulo}`}</Typography>
                        </ThemeProvider>
                    </Grid>
                    <Grid item xs={3} md={5}>
                    </Grid>
                </Grid>
        </Container>
    );
}

export default HeaderProyectos


// Componentes:

// Librerias-Paquetes:
import { Container, Grid } from '@material-ui/core';

function HeaderProyectosPasados() {
    return (
        <Container >
            <Grid item xs={5} md={7}>
                <h4>{`Proyectos Pasados`}</h4>
            </Grid>
        </Container>
    );
}

export default HeaderProyectosPasados
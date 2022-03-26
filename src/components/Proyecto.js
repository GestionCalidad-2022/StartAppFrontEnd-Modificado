import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';


export default function Proyecto({proyecto}) {
    const classes = styles;
    return (
        <Container>
            <Card style={styles2} className={classes.root} variant="outlined">
                <img style={imgStyles} alt = " "></img>
                <CardContent styles={cardStyles}>
                    <Typography className={classes.title} color="secondary" gutterBottom>
                        {proyecto.nombre_proyecto}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {proyecto.descripcion}
                    </Typography>
                </CardContent>
                
            </Card>
        </Container>
    );
}

const styles = {
    border:"4px solid blue",
    marginTop:"5%"
}

const styles2 = {
    display: "flex"
}

const cardStyles = {
    width: "50%"
}

const imgStyles = {
    backgroundColor: "grey",
    width: "50%"
}
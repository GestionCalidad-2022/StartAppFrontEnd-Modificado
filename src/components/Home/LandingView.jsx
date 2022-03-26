import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, useMediaQuery, Card, CardActions, CardContent, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        position:"absolute",
        width:"70%", 
        left: "15%",
        top: "55%",
    },
    resp_root: {
        position:"absolute",
        width:"100%", 
        left: "0",
        top: "318px",
        boxShadow:"none",
    },
    card_content: {
        padding: "6% 8.5%",
        textAlign: "justify"
    },
    card_actions: {
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent: "center",
        padding: "0 7%",
        paddingBottom: "30px",
        textAlign: "justify"
    },
}))

const LandingView = () => {
    const smallScreen = !useMediaQuery("(min-width:900px)")
    const classes = useStyles()
    return (
        <div>
            <Card className={(smallScreen)?classes.resp_root:classes.root}>
                <CardContent className={classes.card_content}>
                    <Typography style={(smallScreen)?{fontSize: "16px"}:{}}>
                        Una experiencia personalizada de volutariado para impulsar líderes de impacto positivo.
                        Explora causas y descubre la tuya, obtén un récord de tu participación activa, y acumula 
                        horas y experiencias de voluntariado.
                    </Typography>
                </CardContent>
                <CardActions className={classes.card_actions}>
                    <Button variant="contained" color="primary" onClick={()=>window.location.href="/register"}>Únete a Start</Button>
                    <Button style={{textTransform:"none", textDecorationLine:"underline"}} onClick={()=>window.location.href="/"}>Explora nuestros proyectos</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default LandingView

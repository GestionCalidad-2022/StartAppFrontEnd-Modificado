// Componentes:
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
/*
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
*/
// Permisos/Roles:

// Librerias-Paquetes:

const useStyles = makeStyles(() => ({
    container: {
      width: '100%',//'90%',
      height: '100%',//'75%',
      margin: 'auto',
    },
    card: {
        borderRadius: '1rem',
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    action: {
        width: '100%',
        height: '100%',
    },
    media: {
        opacity: '0.75'
    },
    content: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      color: 'black',
      fontSize: '2em',
      position: 'absolute',
      top: '0%',
      right: '0%',
    },
    typography: {
      textTransform: 'uppercase',
      '@media only screen and (max-width: 675px) ': {
        fontSize: '1.7rem',
      },
      '@media only screen and (max-width: 610px) ': {
        fontSize: '1.5rem',
      },
      '@media only screen and (max-width: 530px) ': {
        fontSize: '1.2rem',
      },
      '@media only screen and (max-width: 445px) ': {
        fontSize: '1rem',
      },
      '@media only screen and (max-width: 380px) ': {
        fontSize: '0.95rem',
      },
      '@media only screen and (max-width: 370px) ': {
        fontSize: '0.88rem',
        wordBreak: 'break-all',
      },
      
    }
  }));

function TarjetaCategoriaProyecto({imagen, categoria}) {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Card className={classes.card}>
              
              <Link to={`../projects?categoria=${categoria}`}>
                <CardActionArea className={classes.action}>
                  <CardMedia
                    component="img"
                    alt={categoria}
                    height="300"
                    image={imagen}
                    title={categoria}
                    className={classes.media}
                  />
                  <Box  className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h3" className={classes.typography}>
                      {categoria}
                    </Typography>
                  </Box>
                  
                </CardActionArea>
              </Link>
              
            </Card>
        </Box>
    );
}
export default TarjetaCategoriaProyecto;

/* style={{backgroundImage: image}}*/

/* CARD STYLES descartados:
//boxShadow: 'none',
        //minWidth: 200,
        //minHeight: 300,
      /*'&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: '100%',
        height: '64%',
        bottom: 0,
        zIndex: 1,
        background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
      },
*/
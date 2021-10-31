// Componentes:
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
/*
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
*/
// Permisos/Roles:

// Librerias-Paquetes:

const useStyles = makeStyles(() => ({
    card: {
        borderRadius: '1rem',
        //boxShadow: 'none',
        position: 'relative',
        //minWidth: 200,
        //minHeight: 300,
        width: '100%',
        height: '100%',
      /*'&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        width: '100%',
        height: '64%',
        bottom: 0,
        zIndex: 1,
        background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
      },*/
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
      zIndex: '10',
    },
    typography: {
      textTransform: 'uppercase',
    }
  }));

function TarjetaCategoriaProyecto({imagen, categoria}) {
    const classes = useStyles();
    return (
        <Box>
            <Card className={classes.card}>
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
                  <Typography gutterBottom variant="h4" component="h3" className={classes.typography}>
                    {categoria}
                  </Typography>
                </Box>
              </CardActionArea>
              
            </Card>
        </Box>
    );
}
export default TarjetaCategoriaProyecto;

/* style={{backgroundImage: image}}*/
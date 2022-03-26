// Componentes:

// Librerias-Paquetes:
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import './BannerProyecto.css';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 131,
    },
});

function BannerProyecto({proyecto}) {

    const classes = useStyles();
    const urlImage = proyecto.url_imagen? proyecto.url_imagen : " "
    return (
        <CardMedia
          className={classes.media}
          image={urlImage}
          title={proyecto.title}
        />
    );
}

export default BannerProyecto
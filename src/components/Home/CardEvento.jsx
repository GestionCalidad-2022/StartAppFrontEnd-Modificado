import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Chip,
} from "@material-ui/core";
import BannerImage from "../../assets/example.png";
import DateRangeIcon from "@material-ui/icons/DateRange";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  date_description: { fontSize: "18px" },
  date_icon: { fontSize: "22px" },
  title: { fontSize: "27px", fontWeight: "bold",},
  category: { fontSize: "16px", marginBottom:"10px"},
  details_button: {
    fontSize: "16px",
    textTransform: "none",
    textDecorationLine: "underline",
  },
  chip: {
    backgroundColor: "rgba(196, 196, 196, 0.65)",
    color: "white",
    position: "absolute",
    right: "0",
    margin: "10px",
  },
});

export default function CardEvento({ event, enlisted }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Chip
          label="Participando"
          className={classes.chip}
          style={enlisted ? {} : { display: "none" }}
        />
        <CardMedia
          component="img"
          alt="Ejemplo"
          height="140"
          image={BannerImage}
          title="Ejemplo"
        />
        <CardContent>
          <Typography gutterBottom className={classes.date_description}>
            <DateRangeIcon className={classes.date_icon} />
            {`  ${event.fecha_evento} | ${event.hora_inicio} - ${event.hora_fin}`}
          </Typography>
          <Typography className={classes.title}>
            {event.nombre_evento}
          </Typography>
          <Typography className={classes.category} color="textSecondary">
            {event.categoria}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            {event.descripcion_evento}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          className={classes.details_button}
          onClick={() => (window.location.href = `/eventos/${event.id}`)}
        >
          Ver Detalles
        </Button>
      </CardActions>
    </Card>
  );
}

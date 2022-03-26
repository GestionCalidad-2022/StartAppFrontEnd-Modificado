import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import CategoryIcon from '@material-ui/icons/Category';

const months = {
  1: "Ene",
  2: "Feb",
  3: "Mar",
  4: "Abr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Ago",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dic",
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    padding: "0 10px",
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      boxShadow:
        "0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.14), 0px 8px 10px -5px rgba(0, 0, 0, 0.2)",
    },
  },
  cardContent: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  date_description: { fontSize: "18px" },
  date_icon: { fontSize: "17px" },
  title: { fontSize: "22px", fontWeight: "bold", marginBottom: "15px" },
  details_button: {
    fontSize: "16px",
    textTransform: "none",
    textDecorationLine: "underline",
  },
}));

const ResumedCardProyect = ({ event, enlisted }) => {
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      variant="outlined"
      onClick={() => (window.location.href = `/projects/${event.id}`)}
    >
      <CardContent className={classes.cardContent}>
        <div style={{ width: "30%", marginTop: "10px" }}>
          <Typography
            gutterBottom
            className={classes.date_description}
            color="textSecondary"
          >
            {/* <DateRangeIcon className={classes.date_icon} /> */}
            <b style={{ color: "black" }}>
              {`  ${months[parseInt(event.fecha_inicio.split("-")[1])]} ${event.fecha_inicio.split("-")[1] }
              `}{" "}
            </b>
          </Typography>
        </div>
        <div style={{ width: "65%" }}>
          <Typography className={classes.title}>
            {event.titulo}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            <CategoryIcon className={classes.date_icon} />
            {event.categoria}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            <PersonIcon className={classes.date_icon} />
            {event.lider}
          </Typography>
        </div>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default ResumedCardProyect;
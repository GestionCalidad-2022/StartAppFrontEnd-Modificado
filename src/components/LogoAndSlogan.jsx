import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LogoStart from "../images/logoStart.png";
import { Typography, useMediaQuery } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "500px",
    height: "200px",
    marginTop: "5px",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "30px",
    marginTop: "-80px",
  },
  smallLogo: {
    width: "0",
  },
  backButton: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    margin: "10px 0",
  },
  backButtonMobile: {
    width: "300%",
    marginLeft: "15px",
  },
}));

const LogoAndSlogan = () => {
  const classes = useStyles();
  const smallScreen = !useMediaQuery("(min-width:700px)");
  return (
    <div className={classes.logoContainer}>
      <div
        className={smallScreen ? classes.backButtonMobile : classes.backButton}
      >
        <Chip
          variant="outlined"
          icon={<NavigateBeforeIcon />}
          label="Volver"
          clickable
          onClick={() => window.history.back()}
        />
      </div>
      <img
        src={LogoStart}
        alt="logo Start"
        className={smallScreen ? classes.smallLogo : classes.logo}
      />
      {smallScreen ? (
        <Typography variant="h2" style={{ textAlign: "center" }}></Typography>
      ) : (
        <Typography variant="h2" style={{ textAlign: "center" }}>
          Incubadora de proyectos sociales y ambientales
        </Typography>
      )}
    </div>
  );
};

export default LogoAndSlogan;

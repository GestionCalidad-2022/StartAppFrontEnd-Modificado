import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery, Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";


import TabsProfile from "./TabsProfile";
import { withRouter } from "react-router";


const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    direction: "row",
    backgroundColor: "#F2F2F2",
    margin: "3% 10% 5% 10%",
  },
  rootSmallScreen: {
    justifyContent: "center",
    alignItems: "center",
    direction: "row",
  },
  paper: {
    marginTop: 20,
  },
}));

const ProfileCard = ({ getDataProfile, handleOpenprop, sessionData }) => {
  const classes = useStyles();
  const smallScreen = !useMediaQuery("(min-width:811px)")
  if (smallScreen)
  {
    return (
      <Card className={smallScreen ? classes.rootSmallScreen: classes.root}>
          <TabsProfile 
            getDataProfile={getDataProfile}
            handleOpenprop={handleOpenprop}
            sessionData={sessionData}
          />
      </Card>
    );
  }else {
    return (
      <Card className={smallScreen ? classes.rootSmallScreen: classes.root}>
        <CardContent>
          <TabsProfile 
            getDataProfile={getDataProfile}
            handleOpenprop={handleOpenprop}
            sessionData={sessionData}
          />
        </CardContent>
      </Card>
    );
  }
};
export default withRouter(ProfileCard);


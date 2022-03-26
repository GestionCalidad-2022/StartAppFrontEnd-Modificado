import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./header.css";
import {
  useMediaQuery,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import routes from "../../routes/Routes";
import LoggoutButton from "./logoutButton";
import verifier from "../../routes/AuthRoutesVerifier";
import NavBar from "./NavBar";

const useStyles = makeStyles((theme) => ({
  header:{
    flexDirection: "column",
    width: "100%",
    position: "sticky",
    backgroundColor: "#074d81",
  },
  responsiveHeader: {
    width: "100%",
    position: "fixed",
    bottom: "0px",
  },
  headerHome:{
    flexDirection: "column",
    position: "sticky",
    backgroundImage: `url("https://www.startamericastogether.org/wp-content/uploads/2021/03/main-banner.jpg")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top",
  },
  containerLogo: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
  },
}));

const Header = ({ sessionData, children }) => {
  const smallScreen = !useMediaQuery("(min-width:900px)");
  const [logged, setLogged] = React.useState(false);
  let location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    if (
      !Boolean(sessionStorage.getItem("jwt")) &&
      verifier(location.pathname).needLoggin
    ) {
      history.push(routes[4].path);
    }
    setLogged(Boolean(sessionStorage.getItem("jwt")));
  }, [history, location.pathname]);
  const useWindowSize = () => {
    const [size, setSize] = React.useState([0])
    React.useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth])
      }
      window.addEventListener('resize', updateSize)
      updateSize()
      return () => window.removeEventListener('resize', updateSize)
    }, [])
    return size
  }
  const windowWidth = useWindowSize()
  return (
    <div>
      <header
        className={(location.pathname === routes[0].path)?classes.headerHome:classes.header}
        style={
          location.pathname === routes[4].path ||
          location.pathname === routes[5].path ||
          location.pathname.includes("validate") ||
          location.pathname.includes("reset_password") ||
          location.pathname.includes("recover")
            ? { display: "none" }
            : (smallScreen)?
              (location.pathname === routes[0].path)?
                {width:`${windowWidth}px`, height:`${Math.round(windowWidth*0.6)}px`}:
                {width:`${windowWidth}px`, height:`${Math.round(windowWidth*0.25)}px`}:
              (location.pathname === routes[0].path)?
                {width:`${windowWidth}px`, height:`${Math.round(windowWidth*0.40)}px`}:
                {width:`${windowWidth}px`}
        }
      >
        <div className="header-logo">
          <div style={{ width: "10%" }}></div>
          <div className={classes.containerLogo}>
            <img src={"https://i1.wp.com/www.startamericastogether.org/wp-content/uploads/2021/03/LOGO_2020_2.0_STARTER_Horizontal-01-01-1.png?fit=1307%2C435&ssl=1"} alt=" " className="header-image" />
          </div>
          <div style={(smallScreen)?{}:{ width: "10%" }}>
            <LoggoutButton logged={logged} sessionData={sessionData} />
          </div>
        </div>
        <div
          className="header-menu"
          style={smallScreen ? { display: "none"} : { }}
        >
          <NavBar
            currentPath={location.pathname}
            routes={routes}
            logged={logged}
            sessionData={sessionData}
            pagesize={"wide"}
          />
        </div>
      </header>
      <div className={classes.children} style={{marginBottom:"70px", minHeight:"250px"}}>{children}</div>
      <div
        className={classes.responsiveHeader}
        style={
          smallScreen &&
          !(
            location.pathname === routes[4].path ||
            location.pathname === routes[5].path ||
            `${location.pathname.substring(0, 10)}:id` === routes[15].path
          )
            ? {}
            : { display: "none" }
        }
      >
        <NavBar
          currentPath={location.pathname}
          routes={routes}
          logged={logged}
          sessionData={sessionData}
          pagesize={"small"}
        />
      </div>
    </div>
  );
};

export default Header;

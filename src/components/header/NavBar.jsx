import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import EventNoteIcon from "@material-ui/icons/EventNote";
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import PersonIcon from "@material-ui/icons/Person";
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "70px",
  },
  activeNavButton: {
    borderBottom: "solid 3px",
    marginTop: "5px",
  },
  navButton: {
    borderBottom: "none",
    margin: "0 -5px",
    marginTop: "5px",
  },
  containerLogo: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
  },
}));

const NavBar = ({ currentPath, routes, logged, sessionData, pagesize }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <BottomNavigation
      currentpath={currentPath}
      showLabels
      className={classes.root}
      style={
        pagesize === "small"
          ? { background: "#F2F2F2" }
          : { background: "none" }
      }
    >
      <BottomNavigationAction
        icon={(currentPath === routes[0].path)?<HomeIcon />: <HomeOutlinedIcon/>}
        disabled={currentPath === routes[0].path}
        label="Inicio"
        className={
          currentPath === routes[0].path
            ? classes.activeNavButton
            : classes.navButton
        }
        onClick={() => history.push(routes[0].path)}
        style={
          pagesize === "small"
              ? { color: "gray" }
              : { color: "white" }
        }
      />
      <BottomNavigationAction
        // icon={
        //   <svg
        //     style={{ width: "40px" }}
        //     aria-hidden="true"
        //     focusable="false"
        //     data-prefix="fas"
        //     data-icon="people-carry-box"
        //     className="svg-inline--fa fa-people-carry-box"
        //     role="img"
        //     xmlns="http://www.w3.org/2000/svg"
        //     viewBox="0 0 640 512"
        //   >
        //     <path
        //       fill="currentColor"
        //       d="M128 95.1c26.5 0 47.1-21.5 47.1-47.1S154.5 0 128 0S80.01 21.5 80.01 47.1S101.5 95.1 128 95.1zM511.1 95.1c26.5 0 47.1-21.5 47.1-47.1S538.5 0 511.1 0c-26.5 0-48 21.5-48 47.1S485.5 95.1 511.1 95.1zM603.5 258.3l-18.5-80.13c-4.625-20-18.62-36.88-37.5-44.88c-18.5-8-38.1-6.75-56.12 3.25c-22.62 13.38-39.62 34.5-48.12 59.38l-11.25 33.88l-15.1 10.25L415.1 144c0-8.75-7.25-16-16-16H240c-8.75 0-16 7.25-16 16L224 239.1l-16.12-10.25l-11.25-33.88c-8.375-25-25.38-46-48.12-59.38c-17.25-10-37.63-11.25-56.12-3.25c-18.88 8-32.88 24.88-37.5 44.88l-18.37 80.13c-4.625 20 .7506 41.25 14.37 56.75l67.25 75.88l10.12 92.63C130 499.8 143.8 512 160 512c1.25 0 2.25-.125 3.5-.25c17.62-1.875 30.25-17.62 28.25-35.25l-10-92.75c-1.5-13-7-25.12-15.62-35l-43.37-49l17.62-70.38l6.876 20.38c4 12.5 11.87 23.5 24.5 32.63l51 32.5c4.623 2.875 12.12 4.625 17.25 5h159.1c5.125-.375 12.62-2.125 17.25-5l51-32.5c12.62-9.125 20.5-20 24.5-32.63l6.875-20.38l17.63 70.38l-43.37 49c-8.625 9.875-14.12 22-15.62 35l-10 92.75c-2 17.62 10.75 33.38 28.25 35.25C477.7 511.9 478.7 512 479.1 512c16.12 0 29.1-12.12 31.75-28.5l10.12-92.63L589.1 315C602.7 299.5 608.1 278.3 603.5 258.3zM46.26 358.1l-44 110c-6.5 16.38 1.5 35 17.88 41.63c16.75 6.5 35.12-1.75 41.62-17.88l27.62-69.13l-2-18.25L46.26 358.1zM637.7 468.1l-43.1-110l-41.13 46.38l-2 18.25l27.62 69.13C583.2 504.4 595.2 512 607.1 512c3.998 0 7.998-.75 11.87-2.25C636.2 503.1 644.2 484.5 637.7 468.1z"
        //     ></path>
        //   </svg>
        // }
        icon={(currentPath.includes('projects'))?<BusinessCenterIcon />: <BusinessCenterOutlinedIcon/>}
        disabled={currentPath === routes[1].path}
        label="Proyectos"
        className={
          currentPath.includes('projects')
            ? classes.activeNavButton
            : classes.navButton
        }
        onClick={() => history.push(logged ? routes[1].path : routes[4].path)}
        style={
          pagesize === "small"
              ? { color: "gray" }
              : { color: "white" }
        }
      />
      <BottomNavigationAction
        icon={(currentPath.includes('eventos'))?<EventNoteIcon />:<EventNoteOutlinedIcon/>}
        disabled={currentPath === routes[2].path}
        label="Eventos"
        className={
          currentPath.includes('eventos')
            ? classes.activeNavButton
            : classes.navButton
        }
        onClick={() => history.push(logged ? routes[2].path : routes[4].path)}
        style={
          pagesize === "small"
          ? { color: "gray" }
          : { color: "white" }
        }
      />
      <BottomNavigationAction
        icon={(currentPath === routes[3].path)?<PersonIcon />:<PersonOutlineOutlinedIcon/>}
        disabled={currentPath === routes[3].path}
        label="Cuenta"
        className={
          currentPath === routes[3].path
            ? classes.activeNavButton
            : classes.navButton
        }
        onClick={() => history.push(logged ? routes[3].path : routes[4].path)}
        style={
          pagesize === "small"
              ? { color: "gray" }
              : { color: "white" }
        }
      />
      {sessionData.role !== "voluntario" ? (
        <BottomNavigationAction
          icon={(currentPath === routes[6].path)?<GroupIcon />:<PeopleOutlineIcon/>}
          disabled={currentPath === routes[6].path}
          label="Usuarios"
          className={
            currentPath === routes[6].path
              ? classes.activeNavButton
              : classes.navButton
          }
          onClick={() => history.push(logged ? routes[6].path : routes[4].path)}
          style={
            pagesize === "small"
              ? { color: "gray" }
              : { color: "white" }
          }
        />
      ) : (
        <BottomNavigationAction style={{ display: "none" }} label="" />
      )}
    </BottomNavigation>
  );
};

export default NavBar;

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useMediaQuery } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import ProyectosProximos from '../components/componentes proyectos/paginas/ProyectosProximos';
import EventosProximos from './Home/EventosProximos';
import ListaInsignias from './perfil/insignias/listaInsignias.jsx';

function TabPanel(props) {
  const { getDataProfile, handleOpenprop,children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpane-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
  mytab: {
    margin:"0 20px"
  },
}));

export default function TabsProfile({ getDataProfile, handleOpenprop, sessionData }) {
  const classes = useStyles();
  const smallScreen = !useMediaQuery("(min-width:811px)")
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Paper className={classes.root} >
          <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant={smallScreen? "scrollable": "fullWidth"}
          scrollButtons={smallScreen? "auto": "off"} >
            <Tab className={classes.mytab} label="Tus Eventos" {...a11yProps(0)} /> 
            <Tab className={classes.mytab} label="Tus Proyectos" {...a11yProps(1)} />
            <Tab className={classes.mytab} label="Tus Logros" {...a11yProps(2)} />
          </Tabs>
        </Paper>
      </AppBar>
      
      {/* <TabPanel  value={value} index={0} style={{background: "#F2F2F2"}}>
        <DatosPersonales 
        getDataProfile={getDataProfile}
        handleOpenprop={handleOpenprop}/>
      </TabPanel> */}
      <TabPanel value={value} index={0}>
        <EventosProximos id={sessionData.id} title={false}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProyectosProximos title={false}></ProyectosProximos>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ListaInsignias></ListaInsignias>
      </TabPanel>
    </div>
  );
}
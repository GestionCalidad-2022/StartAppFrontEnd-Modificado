import Routes from "./routes/Routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/header.jsx";
import { React, useState, useEffect } from "react";
import AxiosClient from "./components/AxiosClient";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const [sessionData, setSessionData] = useState({
    id: "",
    role: "voluntario",
    name: "",
    foto_url: "",
  });
  const [activeProgressBar, setActiveProgressBar] = useState(false);

  const URL_API = process.env.REACT_APP_API;
  useEffect(() => {
    if (sessionStorage.getItem("jwt")) {
      const id_auth = sessionStorage.getItem("id");
      setActiveProgressBar(true);
      AxiosClient.get(`${URL_API}extended_form/${id_auth}`)
        .then((response) => {
          setActiveProgressBar(false);
          setSessionData({
            id: id_auth,
            role: response.data.data.rol,
            name: `${response.data.data.nombre} ${response.data.data.apellido}`,
            foto_url: response.data.data.foto_url,
          });
        })
        .catch((response) => {
          console.log(response);
          setActiveProgressBar(false);
        });
    }
  }, [URL_API]);
  return (
    <Router>
      <CircularProgress
        style={{
          left: "45%",
          display: activeProgressBar ? "" : "none",
          zIndex: "99",
          top: "50%",
          position: "absolute",
        }}
        color="secondary"
      />
      <Header sessionData={sessionData} setSessionData={setSessionData}>
        <Switch>
          {Routes.map((route) => (
            <Route exact path={route.path} key={route.path}>
              <route.component
                sessionData={sessionData}
                setSessionData={setSessionData}
              />
            </Route>
          ))}
        </Switch>
      </Header>
    </Router>
  );
}

export default App;

import Routes from './routes/Routes'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/header/header.jsx'
import {React, useState, useEffect} from 'react'
import AxiosClient from './components/AxiosClient'

//export var myContext = React.createContext()

function App() {
  const [sessionData, setSessionData] = useState({
    id: '',
    role: 'voluntario',
    name: "",
    foto_url:""
  })
  const URL_API = process.env.REACT_APP_API
  useEffect(()=>{
    if(sessionStorage.getItem("jwt")){
      const id_auth = sessionStorage.getItem("id")
      AxiosClient.get(`${URL_API}extended_form/${id_auth}`)
      .then(response => {
        setSessionData({id: id_auth, role: response.data.data.rol, name: `${response.data.data.nombre} ${response.data.data.apellido}`, foto_url:response.data.data.foto_url})
      })
      .catch((response)=>{
        console.log(response)
      })
    }
  },[URL_API])
  // const location = useLocation()
  return (
    //<myContext.Provider value = {sessionData}>
      <Router>
          <Header sessionData = {sessionData} setSessionData = {setSessionData}>
            <Switch>
                {Routes.map(route => (
                  <Route exact path={route.path} key={route.path}>
                      <route.component sessionData = {sessionData} setSessionData ={setSessionData}/>
                  </Route>
                ))}
            </Switch>
          </Header>
      </Router>
    //</myContext.Provider>
  );
}

export default App;
import LoginForm from "../components/LoginForm";
import Register from "../screens/Register";
import EventsList from "../components/EventsList";
import Home from "../components/Home/Home";
import Profile from "../components/Profile";
import Event from "../components/Event";
import Formulario from "../components/Formulario-evento.component/Formulario";
import Attendance from "../components/Attendance";
import crearEvento from "../components/CrearEvento/crearEvento";
import VistaProyectos from "../components/componentes proyectos/paginas/VistaProyectos";
import FormularioProyecto from "../components/FormularioProyecto";
import EditarPerfil from "../components/EditarPerfil";
import Evento from "../components/Evento";
import Users from "../components/UsersTable/Users"
import VistaProyectoIndividual from "../components/componentes proyectos/paginas/VistaProyectoIndividual"
import VistaCategoriasProyectos from "../components/componentes proyectos/paginas/VistaCategoriasProyectos"
import ValidateView from "../screens/ValidateView";
import ResetPassword from "../screens/ResetPassword";
import {ResetNewPassword} from "../screens/ResetNewPassword";
const Routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    logginNeeded: false,
  },
  {
    path: '/projects/categories',
    name: 'ShowProjectsCategories',
    component: VistaCategoriasProyectos,
    logginNeeded: true,
  },
  {
    path: "/eventos",
    name: "EventsList",
    component: EventsList,
    logginNeeded: true,
  },
  {
    path: "/cuenta",
    name: "Cuenta",
    component: Profile,
    logginNeeded: true,
  },
  {
    path: "/login",
    name: "Inicio de sesion",
    component: LoginForm,
    logginNeeded: false,
  },
  {
    path: "/register",
    name: "Registro",
    component: Register,
    logginNeeded: false,
  },
  {
    path: "/users",
    name: "Usuarios",
    component: Users,
    logginNeeded: true,
  },
  {
    path: "/createproject",
    name: "CreateProject",
    component: FormularioProyecto,
    logginNeeded: true,
  },
  {
    path: "/eventos/event",
    name: "Evento",
    component: Event,
    logginNeeded: true,
  },
  {
    path: "/events/event/registroAEvento",
    name: "Formulario",
    component: Formulario,
    logginNeeded: true,
  },
  {
    path: "/events/event/attendance",
    name: "Attendace",
    component: Attendance,
    logginNeeded: true,
  },
  {
    path: "/eventos/crearevento",
    name: "crearEvento",
    logginNeeded: true,
    component: crearEvento,
  },
  {
    path: "/eventos/:id",
    name: "Evento",
    component: Evento,
    logginNeeded: true,
  },
  {
    path: '/projects',
    name: 'ShowProjects',
    component: VistaProyectos,
    logginNeeded: true,
  },
  {
    path: "/projects/:id",
    name: "ProyectoIndividual",
    component: VistaProyectoIndividual,
    logginNeeded: true,
  },
  {
    path: "/validate/:id",
    name: "ValidacionCorreo",
    component: ValidateView,
    logginNeeded: true,
  },
  {
    path: "/reset_password",
    name: "RecuperarContrasena",
    component: ResetPassword,
    logginNeeded: false,
  },
  {
    path: "/recover/:id",
    name: "RecuperarNuevaContrasena",
    component: ResetNewPassword,
    logginNeeded: false,
  },
  {
    path: "/EditarPerfil",
    name: "EditarPerfil",
    component: EditarPerfil,
    logginNeeded: true,
  },
];
export default Routes;

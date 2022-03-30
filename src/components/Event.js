import React from "react";
import { Link } from "react-router-dom";
import EventsList from "./EventsList";

class Event extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1> Bienvenido a Evento!</h1>
        </div>
        <div>
          <Link to="/events/event/attendance">
            Validar asitencia de voluntarios
          </Link>
        </div>
        <div>
          <Link to="/events/event/registroAEvento">
            Participar en el evento
          </Link>
          <EventsList> </EventsList>
        </div>
      </div>
    );
  }
}

export default Event;

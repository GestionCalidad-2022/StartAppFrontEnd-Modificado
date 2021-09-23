import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Button } from "reactstrap";

const api = axios.create({
  baseURL: `http://localhost:5000/eventos`,
  //baseURL: `https://5fc44b7b36bc7900163436cf.mockapi.io/api/Message/Eventos`
});

class EventsList extends Component {
  state = {
    events: [],
    showMe:true
  };

  constructor() {
    super();
    this.getEvents();
  }

  getEvents = async () => {
    try {
      let data = await api.get("/").then(({ data }) => data);
      this.setState({ events: data });
    } catch (err) {
      console.log(err);
    }
  };

  archivar(){
    this.setState({
      showMe:!this.state.showMe
    })
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <h1> Bienvenido a Lista de eventos!</h1>
          </div>
          <div style={{ display: "flex" }}>
            <Button style={{ marginLeft: "auto" }} href="/eventos/crearevento">
              Crear Evento
            </Button>
          </div>
        </div>
        <Container>
          <Card>
            {this.state.events.map((event) => (
              <div class="card w-70">
                {
                this.state.showMe?  
                <div class="row no-gutters">
                  <div class="col-auto">
                    <img
                      src="http://jorge-zientarski.com/imgs/Events2.jpg"
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                  <div class="col">
                    <div class="card-block px-1">
                      <h4 class="card-title">{event.nombre_evento}</h4>
                      <p class="card-text">
                        <b>Description:</b> {event.descripcion_evento}
                      </p>
                      <p class="card-text">
                        <b>Modalidad:</b> {event.modalidad_evento}
                      </p>
                      <p class="card-text">
                        <b>Fecha:</b> {event.fecha_evento}
                      </p>
                      <p class="card-text">
                        <b>Lugar:</b> {event.lugar_evento}
                      </p>
                    </div>
                  </div>
                </div>
                :null
                }
                aca vienen los botones
                <Button color="primary" onClick={()=>this.archivar()}>Archivar</Button>
                <div class="card-footer w-100 text-muted"></div>
              </div>
            ))}
          </Card>
        </Container>
      </div>
    );
  }
}
export default EventsList;

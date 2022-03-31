import React from 'react'

class Attendance extends React.Component {

    constructor(props){
        super(props)
        this.state = { nombre:'',
        asistencia:false
        }

        this.handleChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
      

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        alert(`
        ____El Voluntario Verificado es ____\n
          Nombre : ${this.state.nombre}
          Asistencia : ${this.state.asistencia}
         
        `);
        event.preventDefault();
    }

    render(){
        return(
          <form onSubmit={this.handleSubmit}>
           
            <div>
              <label htmlFor='nombre'>Nombre</label>
              <input
                name='nombre' 
                placeholder='nombre'
                value={this.state.nombre}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor='asistencia'>Asistencia</label>
              <input
                type="checkbox"
                name='asistencia' 
                placeholder='asistencia'
                value={this.state.asistencia}
                onChange={this.handleChange}
              />
            </div>
            
            <div>
              <button>Registrar Asistencia</button>
            </div>
          </form>
        )
      }
    }

export default Attendance
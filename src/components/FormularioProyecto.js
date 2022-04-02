import { React, Fragment } from 'react';


class FormularioProyecto extends React.Component{
    render(){
        return (
            
             <Fragment>
                <h2>Creación de proyecto</h2>
               <form className="row">
                  <div className="col-md-3"> 
                  <input type="text" placeholder="Nombre" className="form-control"></input>
                  </div>
                  <div className="col-md-3"> 
                  <input placeholder="Especificación" className="form-control"></input>
                  </div>
                  <div className="col-md-3"> 
                   <button type="submit" style={styles}>Crear</button>
                   <button >Cancelar</button>
                  </div>
                  
               </form>
            </Fragment>
        );
    }
}
const styles={
    margin: "3px"
}
export default FormularioProyecto;
import Proyectos from "./Proyectos"
import {Container} from '@material-ui/core';

function PaginaProyectos({proyectos}) {
    
    
    return (
        <div>
            <Container >
                <h1 style={h1styles}>PROYECTOS</h1> 
                <Proyectos proyectos={proyectos}/>
            </Container>
        </div>
    );
}

export default PaginaProyectos;


const h1styles={
    marginTop:"2%",
    textAlign:"center"

}
import { Box ,List, ListItem,ListItemIcon,ListItemText,Button} from '@material-ui/core';
import axios from 'axios'
import React,{Component} from 'react'
import ExportExcel from 'react-export-excel'
import { withStyles } from '@material-ui/core';
import PuertaPermisos from '../organismos/PuertaPermisos';
import {SCOPES} from '../organismos/map-permisos';

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

class ListaParticipantesProyecto extends Component{
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            inicio:'',
            fin: ''

        }
    }
    
    componentDidMount(){
        let thisUrl = window.location.href;
        let id = this.getId(thisUrl);
        axios.get(`${process.env.REACT_APP_API}get_participantes_proyecto_simple/${id}`)
        .then(response => {
            this.setState({posts:response.data})
            console.log(response.data)
            this.setState({inicio:"inicio: " + response.data[0].fecha_inicio.substring(0,10)})
            let fin = response.data[0].fecha_fin
            console.log(fin)
            if (fin==null) {

                this.setState({fin:"fin: en progreso "})
            }
            else{
                this.setState({fin:"fin: " + fin})
            }
            
        })
        .catch(error => {
            console.log(error)
        })

    }
    
    getId(thisUrl) {
     return thisUrl.split("/").pop();
    }

    render(){
        const {posts} = this.state
        const {inicio} = this.state
        const {fin} = this.state
        return(
            <Box>
                <p style={{color: '#424da6',textDecoration:'underline', fontWeight: 'bold'}}>Lista de Participantes:</p>
                <List>
                {
                    posts.map(post=>(
                        <ListItem key={post.id}>
                            <ListItemIcon>

                            </ListItemIcon>
                            <ListItemText  primary={post.nombre} />
                        </ListItem>

                    ))
                }
                </List>
                <PuertaPermisos scopes={[SCOPES.canCrudProyectos]}>
                    <ExcelFile element={<ExportarButton variant="contained" >Exportar Lista</ExportarButton>} filename="ListaParticipantes">
                        <ExcelSheet data={posts} name="Participantes">
                            <ExcelColumn name="inicio" label={inicio}/>
                            <ExcelColumn label={fin}/>
                            <ExcelColumn label="Nombre" value="nombre" />
                            <ExcelColumn label="Apellido" value="apellido"/>
                            <ExcelColumn label="Rol" value="rol"/>
                            <ExcelColumn label="Telefono" value="telefono"/>
                        </ExcelSheet>
                    </ExcelFile>
                </PuertaPermisos>
                
            </Box>

        )
    }
}
const ExportarButton = withStyles((theme) => ({
    root: {
      marginRight: 10,
      marginLeft: 10,
      width: '25%',
      background: 'green',
      color:'white'
    },
  }))(Button);
export default ListaParticipantesProyecto
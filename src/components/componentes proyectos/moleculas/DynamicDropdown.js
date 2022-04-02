import '../moleculas/FormularioCrearProyecto.css'
import { FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';

function DynamicDropdown({ elements, value, onChange, idField, labelField, titulo }) {
    // FUNCIONES:
    function getElementId(element){
        return element[idField] === "string"? parseInt(element[idField]) : element[idField];
    }
    // RENDER:
    return (
        <div>
            {/*NOTE: Dropwdown CATEGORIAS*/}
            <div  style={{marginTop: "20px", marginBottom: "20px", padding:"10px 0px 0px 10px"}}>
                <FormControl sx={{ m: 1, minWidth: 120 }} className='dropdown-proyectos'>
                    <InputLabel style={{fontSize: "17px", padding:"10px 0px 0px 10px"}}>{titulo}</InputLabel>
                    <Select className='dropdown-proyectos'
                    value={value}
                    onChange={onChange}
                    >
                        {
                            elements.map(element => (
                                <MenuItem key={ getElementId(element) } 
                                        value={ getElementId(element) }>
                                            {element[labelField]}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}

export default DynamicDropdown

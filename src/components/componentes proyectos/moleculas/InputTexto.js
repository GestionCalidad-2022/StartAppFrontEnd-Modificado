import { useFormContext, Controller } from "react-hook-form";
import { InputLabel } from '@material-ui/core';


function InputTexto({tituloLabel, type,  value, placeHolder, onChange, nameId, options/*, estilosValidar*/}) {
    // hook-form methods:
    const { register,
        control,
        formState: { errors }, } = useFormContext();
    
    // Constantes:
    const inputValue = value? value : "" // Para evitar un warning
    const validations = options? options : {}
    
    // Funciones:
    const showErrorMessage = (show, msg="") => {
        if(!show) return ""
        const errorLabel = (<p style={{color: 'red', fontSize: "0.8em"}}> 
                                {msg}
                            </p>)
        return errorLabel
    }

    return (
        <Controller
                name={nameId}
                control={control}
                defaultValue={value} //Importante para recuperar datos ya existentes
                render={ ({ field }) => (
                    <>
                        <InputLabel style={{fontSize: "17px", padding:"10px 0px 0px 10px"}}>{tituloLabel}</InputLabel>
                        <div className='form-control-proy'>
                            <input  
                                {...field}
                                {...register(`${nameId}`, validations)}
                                type={type}
                                placeholder={placeHolder}
                                value={inputValue}
                                onChange={onChange}
                                style={{color: "black", border: "1px solid grey"}}
                                autoComplete="off"
                            />
                            {errors[nameId] && showErrorMessage(true, `Error: Campo ${errors[nameId].type}`)}
                            {/*errors.titulo && estilosValidar()*/}
                            {/*errors[nameId] && console.log(`Error campo "${nameId}": ${errors[nameId].type}`)*/}
                        </div>
                    </>
                )}
        />
        
    )
}

export default InputTexto
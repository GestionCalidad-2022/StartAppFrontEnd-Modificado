import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography} from '@material-ui/core';
import { Field} from "react-final-form";
import { TextField } from "final-form-material-ui";

const useStyles = makeStyles(theme => ({
    textboxContainer : {
        marginTop:'15px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    textboxLabel: {
        width: '76%',
        height: '12px', 
    },
    textbox : {
        width: '86%',
        height: '42px',
        background: '#FFFFFF',
        padding: '3px 5px',
        marginBottom: '10px',
    },
    passwd : {
        WebkitTextSecurity: 'disc',
        textSecurity: 'disc',
    },
}))

const InputTextbox = ({title, placeholder, type, name}) => {
    const classes = useStyles()
    return (
        <div className = {classes.textboxContainer}>
            <label htmlFor={name} className = {classes.textboxLabel}>
                <Typography> {title} </Typography> 
            </label>
            <Field
            id = {name}
            name={name}
            type={type}
            placeholder={(placeholder)? placeholder: ""}
            component={TextField}
            className = {classes.textbox}
            size="small"
            variant = "outlined"
            />
        </div>
    )
}

export default InputTextbox

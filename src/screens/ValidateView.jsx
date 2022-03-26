import React, {useEffect} from 'react'
import axios from 'axios'
import { makeStyles, Typography, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        marginTop:"15%"
    },
}))

const ValidateView = () => {
    const classes = useStyles()
    const getIdFromURL = (thisUrl) =>{
        var id_ = thisUrl.substring(thisUrl.indexOf("/") + 1)
        id_ = thisUrl.split("/").pop()
        return id_
    }
    const id = getIdFromURL(window.location.href)
    const URL = `${process.env.REACT_APP_API_AUTH}api/validate/${id}`
    useEffect(()=>(
        axios.get(URL)
            .then((response)=>{
                    console.log(response)
                }
            ).catch((response)=>{
                    console.log(response)
                }
            )
    ),[URL])
    return (
        <div className = {classes.root}>
            <Typography style={{color:"Black", marginBottom:"50px", paddingLeft:"0" }} variant="h1">
                ¡Tu cuenta ha sido validada!
            </Typography>
            <Button 
                variant = "contained" 
                style={{color:"Black", marginBottom:"20px"}}
                onClick={()=>window.location.href="/login"}
                >
                Iniciar Sesión
                </Button>
            <Typography style={{fontSize:"18px"}} color="textSecondary">
                Ahora que tu cuenta ha sido validada puedes iniciar sesión
            </Typography>
        </div>
    )
}

export default ValidateView

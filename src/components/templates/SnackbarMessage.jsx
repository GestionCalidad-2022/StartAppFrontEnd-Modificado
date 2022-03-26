import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Slide from '@material-ui/core/Slide'

function TransitionDown(props) {
    return <Slide {...props} direction="down" />
}

const SnackbarMessage = ({snackbar,setActive}) => {
    const handleClose = () => {
        setActive({...snackbar, active:false})
        snackbar.afterClose()
    }
    return (
    <div >
        <Snackbar
            anchorOrigin={{ vertical:'top', horizontal:'center'}}
            open={snackbar.active}
            autoHideDuration={3000}
            onClose={handleClose}
            TransitionComponent={TransitionDown}
            key={`${snackbar.message}-${snackbar.severity}`}
        >
        <Alert 
            onClose={handleClose} 
            severity={snackbar.severity}
            variant="filled">
            {snackbar.message}
        </Alert>
        </Snackbar>
        
    </div>
    )
}

export default SnackbarMessage

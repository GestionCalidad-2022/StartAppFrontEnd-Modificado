import React from 'react'
import { Button } from '@material-ui/core'
import XLSX from 'xlsx'


const DownloadExcelButton = ({data}) => {
    const writeIntoFile = () => {
        var ws = XLSX.utils.json_to_sheet(data)

        /* add to workbook */
        var wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "People")

        /* generate an XLSX file */
        XLSX.writeFile(wb, "usuarios.xlsx")
    }
    return (
        <Button variant="contained" color="secondary" onClick={writeIntoFile} style={{margin:'15px 0'}}>
            Descargar
        </Button>
    )
}

export default DownloadExcelButton

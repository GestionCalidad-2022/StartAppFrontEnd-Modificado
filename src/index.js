import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { createTheme , ThemeProvider } from '@material-ui/core/styles'

const theme = createTheme ({
  palette: {
    type: 'light',
    primary: {
      main: '#269BD5',
    },
    secondary: {
      main: '#B3DA3F',
    },
    warning:{
      main:'#FF0000',
    },
    cancel: {
      main:'#989898'
    }
  },
  typography: {
    fontFamily: "DM Sans",
    fontSize: 18,
    fontWeight: 'normal',
  },
})

theme.typography.h1 = {
  fontFamily: "DM Sans",
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '30px',
  '@media (min-width:768px)': {
    fontFamily: "DM Sans",
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '42px',
    lineHeight: '55px',
  },
}
theme.typography.h2 = {
  fontFamily: "DM Sans",
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '26px',
  '@media (min-width:768px)': {
    fontFamily: "DM Sans",
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '36px',
    lineHeight: '55px',
  },
}
theme.typography.h3 = {
  fontFamily: "DM Sans",
  fontStyle: 'normal',
  fontWeight: '400px',
  fontSize: '18px',
  '@media (min-width:768px)': {
    fontFamily: "DM Sans",
    fontStyle: 'normal',
    fontWeight: '400px',
    fontSize: '27px',
    lineHeight: '55px',
  },
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

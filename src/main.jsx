import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { FormularioProvider } from './context/FormularioContex.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <FormularioProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FormularioProvider>
)
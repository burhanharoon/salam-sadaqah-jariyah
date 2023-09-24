import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import MaterialUICustomization from './components/MaterialUICustomization'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <MaterialUICustomization>
    <App />
  </MaterialUICustomization>
)

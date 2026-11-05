import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'design-system/dist/index.css'
import './shell/shell.css'
import './custom/riyal.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

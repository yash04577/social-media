import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import State from './context/State'
import "./index.css"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <State>
    <ToastContainer />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </State>

)

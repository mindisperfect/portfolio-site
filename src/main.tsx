import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from "react-toastify";

import App from './App.tsx'

import "antd/dist/reset.css";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>,
)

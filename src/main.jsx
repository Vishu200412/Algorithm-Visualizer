import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ParamsProvider} from './components/PathfindingVisualizer/context/PathfindingContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ParamsProvider>
      <App />
      </ParamsProvider>
  </React.StrictMode>

)
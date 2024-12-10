import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CarProvider } from './context/CarContext'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CarProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CarProvider>
  </AuthProvider>
)

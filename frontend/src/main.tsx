import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LenisProvider from './Providers/LenisProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LenisProvider>
    <App />
    </LenisProvider>
  </StrictMode>,
)

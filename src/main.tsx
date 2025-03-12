import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import MainProvider from './context/MainProvider.tsx'

createRoot(document.getElementById('root')!).render(
  // = app.tsx sollte mit MainProvider gewrappt werden
  <StrictMode>
    <MainProvider>
    <App />
    </MainProvider>
  </StrictMode>,
)

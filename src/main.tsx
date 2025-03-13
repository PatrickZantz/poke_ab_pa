import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import MainProvider from './context/MainProvider.tsx'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')!).render(
  // = app.tsx sollte mit MainProvider gewrappt werden
  <StrictMode>
    <ThemeProvider>
      <MainProvider>
        <App />
      </MainProvider>
    </ThemeProvider>
  </StrictMode>,
)

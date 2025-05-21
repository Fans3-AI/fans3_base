import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { IsPlayingProvider } from './Context/play.tsx'

createRoot(document.getElementById('root')!).render(
  <IsPlayingProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </IsPlayingProvider>
)

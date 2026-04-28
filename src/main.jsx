import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { LetterProvider } from './components/LetterContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LetterProvider>
        <App />
      </LetterProvider>
    </BrowserRouter>
  </StrictMode>,
)


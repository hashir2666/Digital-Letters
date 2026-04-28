import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import CustomCursor from './components/CustomCursor.jsx'
import FloatingBackground from './components/FloatingBackground.jsx'
import WelcomePage from './pages/WelcomePage.jsx'
import MoodSelectPage from './pages/MoodSelectPage.jsx'
import WriteLetterPage from './pages/WriteLetterPage.jsx'
import SendPage from './pages/SendPage.jsx'
import OpenLetterPage from './pages/OpenLetterPage.jsx'

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-cream via-peach/40 to-softrose/40 text-inkwell">
      <CustomCursor />
      <FloatingBackground />

      <div
        className={
          isHome
            ? 'relative min-h-screen'
            : 'relative flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8'
        }
      >
        <div
          className={
            isHome
              ? 'h-full w-full'
              : 'w-full max-w-5xl rounded-3xl bg-white/75 p-5 shadow-soft backdrop-blur-xl sm:p-8 lg:p-10'
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/mood-select" element={<MoodSelectPage />} />
              <Route path="/write" element={<WriteLetterPage />} />
              <Route path="/send" element={<SendPage />} />
              <Route path="/open/:id" element={<OpenLetterPage />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>

      <div 
        className="z-50 pointer-events-auto"
        style={{ position: 'fixed', bottom: '1.5rem', left: '2rem' }}
      >
        <span className="designer-signature">Design by Hashir</span>
      </div>
    </div>
  )
}

export default App

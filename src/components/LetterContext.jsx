import { createContext, useContext, useState } from 'react'

const LetterContext = createContext(null)

export function LetterProvider({ children }) {
  const [selectedEnvelope, setSelectedEnvelope] = useState({
    id: 'warm-cream',
    name: 'Warm Cream',
  })
  const [letterText, setLetterText] = useState('')
  const [mood, setMood] = useState(null)
  const [signature, setSignature] = useState('')

  const value = {
    selectedEnvelope,
    setSelectedEnvelope,
    letterText,
    setLetterText,
    mood,
    setMood,
    signature,
    setSignature,
  }

  return <LetterContext.Provider value={value}>{children}</LetterContext.Provider>
}

export function useLetter() {
  const ctx = useContext(LetterContext)
  if (!ctx) {
    throw new Error('useLetter must be used within a LetterProvider')
  }
  return ctx
}


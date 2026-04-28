import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { getLetter, recordOpen } from '../firebase/letters.js'
import LetterRecipientPage from './LetterRecipientPage.jsx'
import { useLetter } from '../components/LetterContext.jsx'

const envelopeBaseMap = {
  'warm-cream': 'from-cream to-peach/60',
  'soft-rose': 'from-softrose to-cream',
  'evening-ink': 'from-cream to-inkwell/15',
}

const envelopeFlapMap = {
  'warm-cream': 'bg-peach/70',
  'soft-rose': 'bg-softrose',
  'evening-ink': 'bg-inkwell/80',
}

function OpenLetterPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { letterText: localText, mood: localMood, signature: localSignature } = useLetter()
  const [status, setStatus] = useState('loading')
  const [letter, setLetter] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function load() {
      if (id === 'preview-mode') {
        if (localText) {
          setLetter({
            text: localText,
            mood: localMood,
            title: 'PREVIEW OF YOUR LETTER',
            signature: localSignature || 'Your Friend',
            opens: 0
          })
          setStatus('ready')
        } else {
          setStatus('not-found')
        }
        return
      }

      try {
        const data = await getLetter(id)
        if (!isMounted) return
        if (!data) {
          setStatus('not-found')
          return
        }
        
        // Record the open in background
        recordOpen(id).catch(err => console.error('Failed to record open:', err))
        
        setLetter(data)
        setStatus('ready')
      } catch (err) {
        console.error(err)
        if (isMounted) setStatus('error')
      }
    }

    load()

    return () => {
      isMounted = false
    }
  }, [id])

  if (status === 'loading') {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-peach/30 backdrop-blur-2xl p-6">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glow-script-heading w-full text-center m-0"
          style={{ 
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', 
            lineHeight: '1.2',
            textShadow: '0 0 15px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.5)'
          }}
        >
          Opening your letter…
        </motion.p>
      </div>
    )
  }

  if (status === 'not-found' || status === 'error') {
    return (
      <div className="space-y-4 text-center">
        <h2 className="font-display text-2xl font-semibold text-inkwell sm:text-3xl">We couldn&apos;t find this letter</h2>
        <p className="mx-auto max-w-md text-sm text-inkwell/70 sm:text-base">
          The link may be incorrect, expired, or the letter was removed.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="rounded-full bg-inkwell px-5 py-2 text-xs font-medium text-cream shadow-sm shadow-inkwell/30 transition hover:bg-inkwell/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deeprose focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:text-sm"
        >
          Start your own letter
        </button>
      </div>
    )
  }

  const base = envelopeBaseMap[letter.envelopeStyle] ?? 'from-cream to-peach/50'
  const flap = envelopeFlapMap[letter.envelopeStyle] ?? 'bg-peach/60'

  const moodTitleMap = {
    family: "A Letter Written With Love 💛",
    friends: "A Little Something Just For You 💙",
    special: "From My Heart To Yours 🌹",
    everyone: "Words From Someone Who Cares 💚"
  }

  const currentMood = letter.mood || 'special'
  const decorativeTitle = moodTitleMap[currentMood] || moodTitleMap.special

  return (
    <LetterRecipientPage 
      mood={currentMood} 
      letterText={letter.text} 
      title={decorativeTitle} 
      signature={letter.signature || 'With all my love, Always'}
      opens={letter.opens || 0}
    />
  )
}

export default OpenLetterPage


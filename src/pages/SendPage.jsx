import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLetter } from '../components/LetterContext.jsx'
import LetterReady from '../components/LetterReady.jsx'
import { createLetter } from '../firebase/letters.js'

function SendPage() {
  const navigate = useNavigate()
  const { letterText, selectedEnvelope, mood, signature } = useLetter()
  const [isSending, setIsSending] = useState(false)
  const [letterSent, setLetterSent] = useState(false)
  const [sentLetterId, setSentLetterId] = useState(null)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    if (!letterText.trim()) {
      navigate('/write')
    }
  }, [letterText, navigate])

  const handleSend = async () => {
    if (isSending) return
    setIsSending(true)

    try {
      const id = await createLetter({
        text: letterText,
        envelopeStyle: selectedEnvelope,
        mood: mood,
        title: 'A Letter for You', // Default title or can be added to context
        signature: signature
      })
      setSentLetterId(id)
      setLetterSent(true)
    } catch (error) {
      console.error('Error sending letter:', error)
      alert('Failed to send letter. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  const handleCopyLink = async () => {
    const link = `${window.location.origin}/open/${sentLetterId}`
    try {
      await navigator.clipboard.writeText(link)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleViewAsRecipient = () => {
    navigate(`/open/${sentLetterId}`)
  }

  const pageStyle = {
    minHeight: '100vh',
    width: '100vw',
    backgroundImage: 'url("/mood2.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    overflow: 'hidden'
  }

  const envelopeContainerStyle = {
    position: 'relative',
    width: 'min(300px, 85vw)',
    height: 'min(200px, 56vw)',
    margin: '0 auto',
    cursor: isSending ? 'default' : 'pointer',
    perspective: '1000px',
  }

  const envelopeStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff9f0',
    borderRadius: '12px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #f0e6d6',
    overflow: 'hidden'
  }

  const flapStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff9f0',
    clipPath: 'polygon(0 0, 50% 50%, 100% 0)',
    borderTop: '1px solid #ddd',
    zIndex: 2,
    transformOrigin: 'top',
  }

  const sealStyle = {
    position: 'absolute',
    top: '42%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '55px',
    height: '55px',
    backgroundColor: '#b5174b',
    borderRadius: '50%',
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '24px',
    boxShadow: '0 6px 15px rgba(181, 23, 75, 0.4)',
    border: '3px solid rgba(255,255,255,0.15)',
    cursor: 'pointer'
  }

  return (
    <div style={pageStyle}>
      <AnimatePresence>
        {!letterSent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.5, transition: { duration: 0.8 } }}
            style={{ textAlign: 'center' }}
          >
            <h2 style={{ 
              fontFamily: 'Dancing Script, cursive', 
              fontSize: '42px', 
              color: '#b5174b',
              marginBottom: '40px',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Ready to Send Your Letter?
            </h2>

            <div style={envelopeContainerStyle} onClick={handleSend}>
              <motion.div 
                style={envelopeStyle}
                animate={isSending ? { y: [0, -20, 0], scale: [1, 1.05, 1] } : {}}
                transition={{ repeat: isSending ? Infinity : 0, duration: 1 }}
              >
                <div style={flapStyle} />
                <div style={sealStyle}>❤</div>
                <div style={{ 
                  color: '#b5174b', 
                  fontWeight: '700', 
                  fontSize: '15px', 
                  marginTop: '80px',
                  letterSpacing: '0.5px'
                }}>
                  {isSending ? 'Sending...' : 'Click to Seal & Send'}
                </div>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/write')}
              style={{
                marginTop: '40px',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#b5174b',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              Go back to edit letter
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {letterSent && (
        <LetterReady 
          onCopyLink={handleCopyLink} 
          onViewRecipient={handleViewAsRecipient} 
          copySuccess={copySuccess}
        />
      )}
    </div>
  )
}

export default SendPage

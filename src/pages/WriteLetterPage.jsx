import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLetter } from '../components/LetterContext.jsx'
import './WriteLetterPage.css'

function WriteLetterPage() {
  const navigate = useNavigate()
  const { letterText, setLetterText, signature, setSignature } = useLetter()
  const [isTyping, setIsTyping] = useState(false)

  const handleFocus = () => {
    setIsTyping(true)
  }

  const handleBlur = () => {
    if (!letterText.trim()) {
      setIsTyping(false)
    }
  }

  const handleChange = (e) => {
    setLetterText(e.target.value)
    setIsTyping(true)
  }

  return (
    <div className="write-letter-container">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="heading-section"
      >
        <h1 className="express-heading">Express Yourself</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
        className="template-section"
      >
        <div className="template-wrapper">
          {/* Template background image */}
          <div className={`template-image ${isTyping ? 'lines-hidden' : ''}`} />

          {/* Guiding text overlay - disappears on focus */}
          {!isTyping && (
            <div className="guiding-text">
              <p className="guide-top">To My Beloved,</p>
              <p className="guide-middle">Every petal carries a piece of my heart...</p>
              <p className="guide-bottom">Forever Yours,</p>
            </div>
          )}

          {/* Textarea overlay */}
          <textarea
            value={letterText}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="letter-textarea"
          />
          {/* Signature input inside template */}
          <div className="signature-input-container">
            <label>Your Name / Signature</label>
            <input
              type="text"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Your Signature"
            />
          </div>
        </div>

        <div className="button-container">
          <button
            type="button"
            onClick={() => navigate('/send')}
            disabled={!letterText.trim()}
            className="send-button"
          >
            Let's Move
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default WriteLetterPage


import { motion } from 'framer-motion'
import { useState } from 'react'

function ShinyText({
  text,
  speed = 2,
  delay = 0,
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  direction = 'left',
  yoyo = false,
  pauseOnHover = false,
  disabled = false,
  className = '',
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.span
      className={className}
      style={{
        fontSize: '1.3em',
        fontWeight: 500,
        color: shineColor,
        textShadow: `0 0 10px ${shineColor}, 0 0 20px ${shineColor}, 0 0 30px ${color}`,
        letterSpacing: '0.02em',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {text}
    </motion.span>
  )
}

export default ShinyText


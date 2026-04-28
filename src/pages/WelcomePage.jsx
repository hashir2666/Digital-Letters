import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ShinyText from '../components/ShinyText.jsx'

function WelcomePage() {
  const navigate = useNavigate()

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      {/* Background iframe */}
      <iframe
        className="absolute inset-0 h-full w-full object-cover border-none pointer-events-none"
        src="/welcome_wallpaper_bg.html"
        title="Background Animation"
      />

      {/* Soft overlay to keep text readable on any photo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/55 sm:from-black/40 sm:via-black/30 sm:to-black/55" />

      {/* Centered heading + button */}
      <div
        className="relative z-10"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '6rem 1.5rem',
          gap: '1.75rem',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="glow-script-heading text-3xl text-white sm:text-4xl lg:text-5xl"
        >
          <ShinyText
            text="let your loved ones know they are not alone"
            speed={2}
            delay={0}
            color="#e5e7eb"
            shineColor="#ffffff"
            spread={140}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
        </motion.h1>

        <motion.button
          type="button"
          onClick={() => navigate('/mood-select')}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="primary-cta"
        >
          <span className="primary-cta-label">Let&apos;s write</span>
        </motion.button>
      </div>

    </div>
  )
}

export default WelcomePage


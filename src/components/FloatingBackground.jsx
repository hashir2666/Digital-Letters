import { motion } from 'framer-motion'

const blobs = [
  { className: 'top-[-6rem] left-[-4rem] w-64 h-64', color: 'from-softrose/50 to-peach/40', delay: 0 },
  { className: 'bottom-[-6rem] right-[-3rem] w-72 h-72', color: 'from-peach/60 to-cream/40', delay: 0.6 },
  { className: 'top-1/2 left-[-5rem] w-52 h-52', color: 'from-softrose/40 to-cream/30', delay: 1.2 },
]

function FloatingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className={`absolute ${blob.className} rounded-full bg-gradient-to-br ${blob.color} blur-3xl`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: blob.delay, ease: 'easeOut' }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),transparent_60%),radial-gradient(circle_at_bottom,_rgba(255,247,236,0.9),transparent_65%)]" />
    </div>
  )
}

export default FloatingBackground


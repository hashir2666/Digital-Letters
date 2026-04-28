import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MoodCard = ({ mood, onHover, isHovered, isSelected, isOtherSelected, onSelect }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [wasSelected, setWasSelected] = useState(false);

  // Trigger pulse animation when selection state changes from false to true
  useEffect(() => {
    if (isSelected && !wasSelected) {
      setWasSelected(true);
    } else if (!isSelected && wasSelected) {
      setWasSelected(false);
    }
  }, [isSelected, wasSelected]);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate parallax tilt (max 5 degrees)
    const rotateX = (mouseY / rect.height) * 5;
    const rotateY = (mouseX / rect.width) * -5;

    setTilt({ x: rotateX, y: rotateY });
    setMousePosition({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setMousePosition({ x: 0, y: 0 });
    onHover(null);
  };

  // Hand-Drawn aesthetic with color-specific glows
  const moodColors = {
    family: {
      glassBox: 'rgba(255, 250, 240, 0.4)',
      glassBoxHover: 'rgba(255, 250, 240, 0.6)',
      glow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 223, 100, 0.5)',
      glowHover: '0 15px 40px rgba(0, 0, 0, 0.15), 0 0 25px rgba(255, 223, 100, 0.7)',
      accentGlow: 'rgba(255, 223, 100, 0.2)',
    },
    friends: {
      glassBox: 'rgba(255, 250, 240, 0.4)',
      glassBoxHover: 'rgba(255, 250, 240, 0.6)',
      glow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 0 20px rgba(100, 200, 255, 0.5)',
      glowHover: '0 15px 40px rgba(0, 0, 0, 0.15), 0 0 25px rgba(100, 200, 255, 0.7)',
      accentGlow: 'rgba(100, 200, 255, 0.2)',
    },
    special: {
      glassBox: 'rgba(255, 250, 240, 0.4)',
      glassBoxHover: 'rgba(255, 250, 240, 0.6)',
      glow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 100, 100, 0.5)',
      glowHover: '0 15px 40px rgba(0, 0, 0, 0.15), 0 0 25px rgba(255, 100, 100, 0.7)',
      accentGlow: 'rgba(255, 100, 100, 0.2)',
    },
    everyone: {
      glassBox: 'rgba(255, 250, 240, 0.4)',
      glassBoxHover: 'rgba(255, 250, 240, 0.6)',
      glow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 0 20px rgba(150, 255, 150, 0.5)',
      glowHover: '0 15px 40px rgba(0, 0, 0, 0.15), 0 0 25px rgba(150, 255, 150, 0.7)',
      accentGlow: 'rgba(150, 255, 150, 0.2)',
    },
  };

  const moodGlowSelected = {
    family: '0 10px 30px rgba(0, 0, 0, 0.1), 0 0 40px rgba(255, 223, 100, 1)',
    friends: '0 10px 30px rgba(0, 0, 0, 0.1), 0 0 40px rgba(100, 200, 255, 1)',
    special: '0 10px 30px rgba(0, 0, 0, 0.1), 0 0 40px rgba(255, 100, 100, 1)',
    everyone: '0 10px 30px rgba(0, 0, 0, 0.1), 0 0 40px rgba(150, 255, 150, 1)',
  };

  const moodColorKey = mood.id;
  const currentMoodColor = moodColors[moodColorKey];

  const handleCardClick = (e) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <motion.div
      className="aspect-square w-full"
      style={{ maxWidth: '240px', margin: '0 auto' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => onHover(mood.id)}
        className="mood-card relative w-full h-full"
        role="button"
        tabIndex={0}
        style={{
          perspective: '1000px',
          opacity: isOtherSelected ? 0.4 : 1,
          transition: 'opacity 0.4s ease-in-out',
        }}
      >
        {/* Glassmorphism glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl blur-2xl opacity-0"
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.4 }}
          style={{
            background: currentMoodColor.accentGlow,
            boxShadow: 'none',
          }}
        />

        {/* Card Container */}
        <motion.div
          className="relative w-full h-full p-4 md:p-5 cursor-pointer overflow-hidden border flex flex-col items-center justify-center gap-3 md:gap-4"
          onClick={handleCardClick}
          initial={{ scale: 1, rotate: 0, background: currentMoodColor.glassBox, y: 0 }}
          animate={{
            scale: isSelected && wasSelected ? [1, 1.05, 1.02] : isSelected ? 1.02 : isHovered ? 1.02 : 1,
            rotate: isSelected ? 0 : isHovered ? 1 : 0,
            boxShadow: isSelected ? moodGlowSelected[moodColorKey] : isHovered ? currentMoodColor.glowHover : currentMoodColor.glow,
            background: isSelected ? currentMoodColor.glassBoxHover : isHovered ? currentMoodColor.glassBoxHover : currentMoodColor.glassBox,
            y: isSelected ? -5 : isHovered ? -5 : 0,
          }}
          transition={{
            duration: isSelected && wasSelected ? 0.6 : 0.4,
            ease: 'easeInOut',
            type: isSelected && wasSelected ? 'spring' : 'easeInOut',
            stiffness: 300,
            damping: 20,
          }}
          style={{
            transformStyle: 'preserve-3d',
            backdropFilter: 'blur(8px)',
            borderColor: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
            borderWidth: isSelected ? '3px' : '2px',
            borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
          }}
        >
          {/* Glass Reflection Shimmer */}
          <div className={`shimmer-element ${isSelected ? 'active' : ''}`} />

          {/* Title */}
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-center"
            style={{ 
              fontFamily: 'Caveat, cursive',
              color: '#1a1a1a',
              textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 8px rgba(0, 0, 0, 0.2)',
              letterSpacing: '0.05em',
              fontWeight: '900',
            }}
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {mood.title}
          </motion.h3>

          {/* Description with fade-in animation */}
          <motion.p
            className="text-lg md:text-xl text-center leading-relaxed"
            style={{ 
              fontFamily: 'Times New Roman, serif', 
              color: '#2a2a2a',
              textShadow: '0 0 8px rgba(255, 255, 255, 0.7)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
            }}
          >
            {mood.description}
          </motion.p>

          {/* Gradient accent bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r rounded-full"
            style={{
              backgroundImage: `linear-gradient(to right, ${mood.accentStart}, ${mood.accentEnd})`,
              boxShadow: isHovered
                ? `0 4px 12px ${currentMoodColor.lineGradient}`
                : '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}
            animate={{
              scaleX: isHovered ? 1 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            initial={{ scaleX: 0, opacity: 0 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MoodCard;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FlowerButton = ({ flower, isSelected, isOtherSelected, onSelect, onHover }) => {
  const [wasSelected, setWasSelected] = useState(false);

  // Trigger animation when selection state changes
  useEffect(() => {
    if (isSelected && !wasSelected) {
      setWasSelected(true);
    } else if (!isSelected && wasSelected) {
      setWasSelected(false);
    }
  }, [isSelected, wasSelected]);

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect();
  };

  // Flower-specific glow colors
  const flowerGlows = {
    family: 'drop-shadow(0 0 15px rgba(255, 200, 0, 0.6)) drop-shadow(0 0 30px rgba(255, 200, 0, 0.3))',
    friends: 'drop-shadow(0 0 15px rgba(100, 220, 255, 0.6)) drop-shadow(0 0 30px rgba(100, 220, 255, 0.3))',
    special: 'drop-shadow(0 0 15px rgba(255, 80, 100, 0.6)) drop-shadow(0 0 30px rgba(255, 80, 100, 0.3))',
    everyone: 'drop-shadow(0 0 15px rgba(255, 150, 200, 0.6)) drop-shadow(0 0 30px rgba(255, 150, 200, 0.3))',
  };

  const flowerGlowsIntense = {
    family: 'drop-shadow(0 0 25px rgba(255, 200, 0, 1)) drop-shadow(0 0 40px rgba(255, 200, 0, 0.6))',
    friends: 'drop-shadow(0 0 25px rgba(100, 220, 255, 1)) drop-shadow(0 0 40px rgba(100, 220, 255, 0.6))',
    special: 'drop-shadow(0 0 25px rgba(255, 80, 100, 1)) drop-shadow(0 0 40px rgba(255, 80, 100, 0.6))',
    everyone: 'drop-shadow(0 0 25px rgba(255, 150, 200, 1)) drop-shadow(0 0 40px rgba(255, 150, 200, 0.6))',
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-3 cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Flower Image Container */}
      <motion.div
        className="relative h-48 md:h-56 aspect-square flower-button"
        role="button"
        tabIndex={0}
        onClick={handleClick}
        animate={{
          opacity: isOtherSelected ? 0.3 : 1,
          scale: isSelected && wasSelected ? [1, 1.05, 1.02] : 1,
        }}
        transition={{
          duration: isSelected && wasSelected ? 0.6 : 0.4,
          type: isSelected && wasSelected ? 'spring' : 'easeInOut',
          stiffness: 300,
          damping: 20,
        }}
        whileHover={!isOtherSelected ? { scale: 1.1 } : {}}
        style={{
          filter: isSelected ? flowerGlowsIntense[flower.id] : flowerGlows[flower.id],
          transition: 'filter 0.4s ease-in-out, opacity 0.4s ease-in-out',
        }}
      >
        <img
          src={flower.image}
          alt={flower.title}
          className="w-full h-full object-contain drop-shadow-lg"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
          }}
        />
      </motion.div>

      {/* Flower Label */}
      <motion.p
        className="text-xl md:text-2xl font-bold text-center"
        style={{
          fontFamily: 'Caveat, cursive',
          letterSpacing: '0.05em',
          textShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.4)',
          color: '#ffffff',
          margin: 0,
        }}
        animate={{
          opacity: isOtherSelected ? 0.3 : 1,
        }}
        transition={{ duration: 0.4 }}
      >
        {flower.title}
      </motion.p>
    </motion.div>
  );
};

export default FlowerButton;

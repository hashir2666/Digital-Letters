 import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FlowerButton from '../components/FlowerButton';
import { useLetter } from '../components/LetterContext';

const MoodSelectPage = () => {
  const [hoveredMood, setHoveredMood] = useState(null);
  const { mood: selectedMood, setMood: setSelectedMood } = useLetter();
  const navigate = useNavigate();

  const handleMoodClick = (moodId) => {
    // Toggle selection: if clicking the same mood, deselect it
    setSelectedMood(selectedMood === moodId ? null : moodId);
  };

  const moods = [
    {
      id: 'family',
      title: 'Family',
      image: '/flower2_sunflower.png',
      description: 'A warm message for the people who raised you.',
    },
    {
      id: 'friends',
      title: 'Friends',
      image: '/flower1_anemone.png',
      description: 'For the ones who make life more fun.',
    },
    {
      id: 'special',
      title: 'Someone Special',
      image: '/flower3_rose.png',
      description: 'A heartfelt message for someone close to your heart.',
    },
    {
      id: 'everyone',
      title: 'Everyone',
      image: '/flower4_carnation.png',
      description: 'A message anyone can open and enjoy.',
    },
  ];

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: 'url(/mood2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundColor: '#f5f1ed',
      }}
    >

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-2 py-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 
            className="text-3xl md:text-4xl font-bold text-white mb-1 h-auto flex items-center justify-center flex-wrap"
            style={{ 
              fontFamily: 'Caveat, cursive',
              fontSize: '3rem',
              letterSpacing: '0.05em',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
            }}
          >
            Select who you&apos;d like to write a letter to
            <span 
              id="counter"
              style={{ 
                marginLeft: '8px',
                fontSize: '2.5rem',
                textShadow: 'inherit',
              }}
            >
              <motion.span
                key={selectedMood ? 'selected' : 'unselected'}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                ({selectedMood ? 1 : 0}/1)
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Moods Grid - 2x2 */}
        <motion.div
          className="w-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-2 w-full px-4 md:px-6" style={{ maxWidth: '1000px', gap: '20px md:40px' }}>
            {moods.map((mood) => (
              <FlowerButton
                key={mood.id}
                flower={mood}
                isSelected={selectedMood === mood.id}
                isOtherSelected={selectedMood !== null && selectedMood !== mood.id}
                onSelect={() => handleMoodClick(mood.id)}
                onHover={setHoveredMood}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Right Navigation Button */}
      <motion.button
        onClick={() => selectedMood && navigate('/write')}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={selectedMood ? { scale: 1.08, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)' } : {}}
        disabled={!selectedMood}
        className="fixed z-20 px-6 md:px-9 py-3 md:py-4 font-semibold transition-all"
        style={{ 
          fontFamily: 'Times New Roman, serif', 
          fontSize: '0.9rem md:1rem', 
          backgroundColor: '#B87A8B',
          color: '#1a1a1a',
          border: 'none',
          borderRadius: '5px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.18)',
          bottom: '20px',
          right: '20px',
          opacity: selectedMood ? 1 : 0.5,
          cursor: selectedMood ? 'pointer' : 'not-allowed',
        }}
      >
        Let&apos;s Move
      </motion.button>
    </div>
  );
};

export default MoodSelectPage;

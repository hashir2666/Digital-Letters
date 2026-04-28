import React from 'react';
import { motion } from 'framer-motion';

const LetterReady = ({ onCopyLink, onViewRecipient, copySuccess }) => {
  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    padding: '40px',
    maxWidth: '550px',
    width: '90%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
    position: 'relative',
    overflow: 'hidden',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  };

  const headingStyle = {
    fontFamily: '"Dancing Script", cursive',
    fontSize: '48px',
    color: '#b5174b',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    fontWeight: '700',
  };

  const buttonRowStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
  };

  const baseButtonStyle = {
    borderRadius: '50px',
    padding: '18px 40px',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    outline: 'none',
    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
  };

  const solidButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#b5174b',
    color: '#ffffff',
  };

  const outlineButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#ffffff',
    color: '#b5174b',
    border: '2px solid #b5174b',
  };

  const footerTextStyle = {
    color: '#999999',
    fontSize: '15px',
    margin: 0,
    fontWeight: '400',
    letterSpacing: '0.5px',
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={overlayStyle}
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1
        }}
        style={cardStyle}
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={headingStyle}
        >
          Your Letter is Ready <span style={{ fontSize: '1.2em' }}>💌</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={buttonRowStyle}
        >
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(181, 23, 75, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            style={solidButtonStyle} 
            onClick={onCopyLink}
          >
            {copySuccess ? 'Copied! ✓' : 'Copy Link 🔗'}
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#fff5f7', boxShadow: '0 15px 30px rgba(181, 23, 75, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            style={outlineButtonStyle} 
            onClick={onViewRecipient}
          >
            View as Recipient →
          </motion.button>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          style={footerTextStyle}
        >
          Saving your letter...
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LetterReady;

import React, { useEffect, useRef } from 'react';

const LetterRecipientPage = ({ 
  mood = 'special', 
  letterText = "", 
  title = "FOR YOU", 
  signature = "",
  opens = 0
}) => {
  const canvasRef = useRef(null);
  const symbolsRef = useRef([]);
  const requestRef = useRef();

  const moodConfig = {
    family: {
      gradient: ['#fffbeb', '#fef3c7', '#fcd34d'],
      symbolColor: '#fcd34d',
      bloomColor: 'rgba(252, 211, 77, 0.4)',
      emoji: '🏡',
      font: 'Georgia, serif',
      tint: 'rgba(252, 211, 77, 0.15)',
      border: 'rgba(252, 211, 77, 0.3)'
    },
    friends: {
      gradient: ['#eff6ff', '#dbeafe', '#93c5fd'],
      symbolColor: '#60a5fa',
      bloomColor: 'rgba(96, 165, 250, 0.4)',
      emoji: '🎈',
      font: '"Trebuchet MS", sans-serif',
      tint: 'rgba(147, 197, 253, 0.15)',
      border: 'rgba(147, 197, 253, 0.3)'
    },
    special: {
      gradient: ['#fff1f2', '#ffe4e6', '#fda4af'],
      symbolColor: '#fb7185',
      bloomColor: 'rgba(251, 113, 133, 0.4)',
      emoji: '🌹',
      font: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
      tint: 'rgba(253, 164, 175, 0.15)',
      border: 'rgba(253, 164, 175, 0.3)'
    },
    everyone: {
      gradient: ['#ecfdf5', '#d1fae5', '#6ee7b7'],
      symbolColor: '#34d399',
      bloomColor: 'rgba(52, 211, 153, 0.4)',
      emoji: '🌿',
      font: 'Verdana, Geneva, sans-serif',
      tint: 'rgba(110, 231, 183, 0.15)',
      border: 'rgba(110, 231, 183, 0.3)'
    }
  };

  class Symbol {
    constructor(canvas, moodType) {
      this.canvas = canvas;
      this.moodType = moodType;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = 15 + Math.random() * 20;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = 0.01 + Math.random() * 0.02;
      this.opacity = 0;
      this.targetOpacity = 0.4 + Math.random() * 0.4;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.02 + Math.random() * 0.03;
    }

    update() {
      this.x += this.speedX + Math.sin(this.wobble) * 0.2;
      this.y += this.speedY + Math.cos(this.wobble) * 0.2;
      this.wobble += this.wobbleSpeed;
      this.pulse += this.pulseSpeed;

      if (this.opacity < this.targetOpacity) this.opacity += 0.005;

      if (this.x < -50) this.x = this.canvas.width + 50;
      if (this.x > this.canvas.width + 50) this.x = -50;
      if (this.y < -50) this.y = this.canvas.height + 50;
      if (this.y > this.canvas.height + 50) this.y = -50;
    }

    draw(ctx) {
      const currentOpacity = this.opacity * (0.7 + Math.sin(this.pulse) * 0.3);
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.globalAlpha = currentOpacity;

      const config = moodConfig[this.moodType];
      
      const bloomGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 2);
      bloomGrad.addColorStop(0, config.bloomColor);
      bloomGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = bloomGrad;
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 2, 0, Math.PI * 2);
      ctx.fill();

      if (this.moodType === 'family') {
        this.drawStar(ctx);
      } else if (this.moodType === 'friends') {
        this.drawHeart(ctx);
      } else {
        this.drawRose(ctx, config.symbolColor);
      }

      ctx.restore();
    }

    drawStar(ctx) {
      const outerRadius = this.size;
      const innerRadius = this.size / 2.5;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * outerRadius, -Math.sin((18 + i * 72) / 180 * Math.PI) * outerRadius);
        ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * innerRadius, -Math.sin((54 + i * 72) / 180 * Math.PI) * innerRadius);
      }
      ctx.closePath();
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, outerRadius);
      grad.addColorStop(0, 'white');
      grad.addColorStop(1, '#fcd34d');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-outerRadius * 1.5, 0); ctx.lineTo(outerRadius * 1.5, 0);
      ctx.moveTo(0, -outerRadius * 1.5); ctx.lineTo(0, outerRadius * 1.5);
      ctx.stroke();
    }

    drawHeart(ctx) {
      ctx.beginPath();
      const w = this.size * 2;
      const h = this.size * 2;
      ctx.moveTo(0, h / 4);
      ctx.bezierCurveTo(0, 0, -w / 2, 0, -w / 2, h / 4);
      ctx.bezierCurveTo(-w / 2, h / 2, 0, h * 0.75, 0, h);
      ctx.bezierCurveTo(0, h * 0.75, w / 2, h / 2, w / 2, h / 4);
      ctx.bezierCurveTo(w / 2, 0, 0, 0, 0, h / 4);
      const grad = ctx.createRadialGradient(-this.size/2, -this.size/4, 0, 0, 0, this.size * 1.5);
      grad.addColorStop(0, 'white');
      grad.addColorStop(1, '#60a5fa');
      ctx.fillStyle = grad;
      ctx.fill();
    }

    drawRose(ctx, color) {
      const drawPetals = (count, radiusX, radiusY, rotation) => {
        for (let i = 0; i < count; i++) {
          ctx.save();
          ctx.rotate((i * 360 / count + rotation) * Math.PI / 180);
          ctx.beginPath();
          ctx.ellipse(radiusX, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(radiusX, 0, 0, radiusX, 0, radiusX);
          grad.addColorStop(0, 'white');
          grad.addColorStop(1, color);
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.restore();
        }
      };
      drawPetals(5, this.size * 0.6, this.size * 0.4, 0);
      drawPetals(5, this.size * 0.35, this.size * 0.25, 36);
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'white';
      ctx.fill();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      symbolsRef.current = Array.from({ length: 38 }, () => new Symbol(canvas, mood));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const colors = moodConfig[mood].gradient;
      grad.addColorStop(0, colors[0]);
      grad.addColorStop(0.5, colors[1]);
      grad.addColorStop(1, colors[2]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      symbolsRef.current.forEach(s => {
        s.update();
        s.draw(ctx);
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, [mood]);

  const currentMood = moodConfig[mood];

  const pageContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    borderRadius: '30px',
    padding: 'min(50px, 8vw)',
    width: '550px',
    maxWidth: '92vw',
    boxShadow: `0 25px 60px -12px ${currentMood.bloomColor}`,
    border: `1px solid ${currentMood.border}`,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 'min(25px, 5vw)',
    zIndex: 5,
    animation: 'fadeInScale 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards'
  };

  return (
    <div style={pageContainerStyle}>
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.88); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />
      <div style={cardStyle}>
        <p style={{ fontSize: '40px', margin: 0 }}>{currentMood.emoji}</p>
        <h2 style={{ 
          fontFamily: 'Dancing Script, cursive', 
          fontSize: 'min(22px, 5.5vw)', 
          color: currentMood.symbolColor, 
          margin: 0, 
          fontWeight: '400',
          fontStyle: 'italic'
        }}>{title}</h2>
        <div style={{ width: '60px', height: '2px', backgroundColor: currentMood.symbolColor, margin: '0 auto', opacity: 0.4 }} />
        <p style={{ fontFamily: currentMood.font, fontSize: 'min(20px, 4.8vw)', lineHeight: '1.8', color: '#333', margin: 0, textAlign: 'left' }}>{letterText}</p>
        <p style={{ fontFamily: currentMood.font, fontSize: 'min(18px, 4.2vw)', fontStyle: 'italic', color: '#555', margin: '10px 0 0 0', textAlign: 'right' }}>{signature}</p>
        
        {/* Open Count Display */}
        <div style={{ 
          marginTop: '20px', 
          fontSize: '11px', 
          color: currentMood.symbolColor, 
          opacity: 0.6, 
          textTransform: 'uppercase', 
          letterSpacing: '1px',
          fontWeight: '700'
        }}>
          Opened {opens} times
        </div>
      </div>
    </div>
  );
};

export default LetterRecipientPage;

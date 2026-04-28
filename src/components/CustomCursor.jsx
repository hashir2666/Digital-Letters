import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);
  const smoothPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Smooth tracking with slight lag
      smoothPos.current = {
        x: smoothPos.current.x + (e.clientX - smoothPos.current.x) * 0.3,
        y: smoothPos.current.y + (e.clientY - smoothPos.current.y) * 0.3,
      };

      if (cursorRef.current) {
        cursorRef.current.style.left = smoothPos.current.x + 'px';
        cursorRef.current.style.top = smoothPos.current.y + 'px';
      }
    };

    const handleMouseOver = (e) => {
      // Check if hovering over clickable elements
      const target = e.target;
      const isClickable =
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.mood-card') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A';

      if (isClickable) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      const isClickable =
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.mood-card') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A';

      if (isClickable) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      style={{
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
    />
  );
}

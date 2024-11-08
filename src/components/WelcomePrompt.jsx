import React, { useState, useEffect, useRef } from 'react';
import './WelcomePrompt.css';
import typingSound from '../assets/typing.wav';

const WelcomePrompt = ({ onComplete }) => {
  const [showPrompt, setShowPrompt] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  
  // Create ref for audio element
  const typingSoundRef = useRef(new Audio(typingSound));

  useEffect(() => {
    // Configure audio settings
    typingSoundRef.current.volume = 0.3;
    typingSoundRef.current.play();

    // Start fade out after 3 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    // Complete animation and remove prompt after 4 seconds
    const completeTimer = setTimeout(() => {
      setShowPrompt(false);
      onComplete();
    }, 4000);

    // Cleanup function
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      typingSoundRef.current.pause();
      typingSoundRef.current.currentTime = 0;
    };
  }, [onComplete]);

  // Optional: Add a mute button
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    typingSoundRef.current.muted = !isMuted;
  };

  if (!showPrompt) return null;

  return (
    <div className={`welcome-prompt ${fadeOut ? 'fade-out' : ''}`}>
      <div className="welcome-content">
        <h1 className="glitch-text">LUNAR EXPLORER</h1>
        <p className="typing-text">Initializing Moon Mapping Systems...</p>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
        
        <button 
          className="mute-button" 
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
    </div>
  );
};

export default WelcomePrompt;
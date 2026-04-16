import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import './MotivationPopup.css';

const quotes = [
  "The only bad workout is the one that didn't happen.",
  "Pain is weakness leaving the body.",
  "Wake up. Work out. Look kick-ass.",
  "Your body can stand almost anything. It's your mind that you have to convince.",
  "Rome wasn't built in a day, but they worked on it every single day."
];

const MotivationPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="motivation-popup glass-panel"
          initial={{ opacity: 0, y: 50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <button className="close-btn" onClick={() => setIsVisible(false)}>
            <X size={16} />
          </button>
          
          <div className="popup-content">
            <Zap className="text-neon-green motivation-icon" size={24} />
            <div className="quote-container">
              <span className="quote-label text-neon-green">DAILY MOTIVATION</span>
              <p className="quote-text">"{quote}"</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MotivationPopup;

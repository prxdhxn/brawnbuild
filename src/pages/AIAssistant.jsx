import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Cpu } from 'lucide-react';
import './AIAssistant.css';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello Titan! I am your AI Fitness Coach. Do you need a new workout plan, recovery advice, or muscle-related questions answered?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    
    // Mock AI response
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: "I'm currently running in offline mock mode. But if I were connected to my neural network, I'd suggest adjusting your macronutrients and prioritizing compound lifts based on what you asked!" 
      }]);
    }, 1000);
  };

  return (
    <motion.div 
      className="ai-page page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <header className="page-header">
        <h1 className="title-glow">Workout AI</h1>
        <p className="subtitle">Your personal intelligent fitness coach</p>
      </header>

      <div className="chat-container glass-panel">
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx} 
              className={`message-wrapper ${msg.role}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="message-avatar">
                {msg.role === 'assistant' ? <Cpu size={20} className="text-neon-blue" /> : 'U'}
              </div>
              <div className="message-content">
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="chat-input-area">
          <form onSubmit={handleSend} className="input-form">
            <input 
              type="text" 
              className="neon-input chat-input" 
              placeholder="Ask about your workout, diet, or recovery..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn-primary send-btn">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAssistant;

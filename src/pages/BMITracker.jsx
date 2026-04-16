import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './BMITracker.css';

const data = [
  { name: 'Week 1', weight: 80 },
  { name: 'Week 2', weight: 79.5 },
  { name: 'Week 3', weight: 78.8 },
  { name: 'Week 4', weight: 78 },
  { name: 'Week 5', weight: 77.2 },
];

const BMITracker = () => {
  const [bmi, setBmi] = useState(24.5);
  const [category, setCategory] = useState("Normal");

  const getBmiPosition = () => {
    // scale from 15 to 40
    let perc = ((bmi - 15) / (40 - 15)) * 100;
    if (perc < 0) perc = 0;
    if (perc > 100) perc = 100;
    return perc;
  };

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <header className="page-header">
        <h1 className="title-glow">BMI & Progress</h1>
        <p className="subtitle">Track your weight journey and body metrics.</p>
      </header>

      <div className="bmi-layout">
        <div className="glass-panel calc-panel">
          <h3>Calculator</h3>
          <form className="bmi-form">
            <div className="form-group">
              <label>Height (cm)</label>
              <input type="number" className="neon-input" defaultValue={180} />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input type="number" className="neon-input" defaultValue={78} />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input type="number" className="neon-input" defaultValue={25} />
            </div>
            <button className="btn-primary mt-20" type="button">Update Stats</button>
          </form>

          <div className="bmi-result mt-20">
            <div className="bmi-score">
              <span className="score-value text-neon-blue">{bmi}</span>
              <span className="score-label">BMI</span>
            </div>
            <div className="bmi-category">
              Status: <strong className="text-neon-green">{category}</strong>
            </div>

            <div className="bmi-scale-container">
               <div className="bmi-scale">
                 <div className="scale-segment under"></div>
                 <div className="scale-segment normal"></div>
                 <div className="scale-segment over"></div>
                 <div className="scale-segment obese"></div>
               </div>
               <motion.div 
                 className="indicator" 
                 initial={{ left: 0 }}
                 animate={{ left: `${getBmiPosition()}%` }}
               ></motion.div>
            </div>
          </div>
        </div>

        <div className="glass-panel chart-panel">
          <h3>Weight History</h3>
          <div className="chart-container mt-20">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#888" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #00F0FF', borderRadius: '8px' }} 
                />
                <Line type="monotone" dataKey="weight" stroke="#00F0FF" strokeWidth={3} dot={{ r: 6, fill: '#00F0FF' }} activeDot={{ r: 8, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BMITracker;

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Flame, Award } from 'lucide-react';
import './Dashboard.css';

const StatCard = ({ title, value, unit, icon: Icon, colorClass }) => (
  <div className="stat-card glass-panel">
    <div className="stat-icon-wrapper">
      <Icon className={colorClass} size={28} />
    </div>
    <div className="stat-info">
      <h3>{title}</h3>
      <div className="stat-value">
        {value} <span className="stat-unit">{unit}</span>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="dashboard-page page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="page-header">
        <h1 className="title-glow">Dashboard</h1>
        <p className="subtitle">Welcome back, Titan. Ready to crush your goals?</p>
      </header>

      <div className="stats-grid">
        <StatCard title="Current BMI" value="23.5" unit="Normal" icon={Activity} colorClass="text-neon-blue" />
        <StatCard title="Workout Streak" value="5" unit="Days" icon={Flame} colorClass="text-neon-green" />
        <StatCard title="Calories Target" value="2,800" unit="kcal" icon={Zap} colorClass="text-neon-blue" />
        <StatCard title="Next Milestone" value="Bench 225" unit="lbs" icon={Award} colorClass="text-neon-green" />
      </div>

      <div className="dashboard-content">
        <div className="main-panel glass-panel">
          <div className="panel-header">
            <h2>Today's Plan: <span className="text-neon-blue">Heavy Push Day</span></h2>
          </div>
          <div className="panel-body">
            <ul className="workout-list">
              <li>
                <div className="workout-item-title">Barbell Bench Press</div>
                <div className="workout-item-sets">4 sets x 8-10 reps</div>
              </li>
              <li>
                <div className="workout-item-title">Incline Dumbbell Press</div>
                <div className="workout-item-sets">3 sets x 10-12 reps</div>
              </li>
              <li>
                <div className="workout-item-title">Overhead Press</div>
                <div className="workout-item-sets">3 sets x 8-10 reps</div>
              </li>
              <li>
                <div className="workout-item-title">Tricep Pushdowns</div>
                <div className="workout-item-sets">3 sets x 12-15 reps</div>
              </li>
            </ul>
            <button className="btn-primary mt-20">Start Workout</button>
          </div>
        </div>

        <div className="side-panel glass-panel">
          <div className="panel-header">
            <h2>AI Insights</h2>
          </div>
          <div className="panel-body ai-insights">
            <p>Based on your last workout, you've increased your bench volume by 5%. Great job! Make sure to prioritize protein synthesis today with at least 150g of protein.</p>
            <p>Also, due to the reported slight shoulder discomfort 3 days ago, focus on a thorough rotator cuff warm-up before benching.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

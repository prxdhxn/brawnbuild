import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, CheckSquare } from 'lucide-react';
import './MealPlanner.css';

const MealPlanner = () => {
  const [goal, setGoal] = useState('Muscle Gain');
  const [diet, setDiet] = useState('Non-Veg');

  const generatePlan = (e) => {
    e.preventDefault();
    // In a real app this would call an API, here we just show the static UI updates.
    alert("New plan generated based on " + goal + " and " + diet);
  };

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <header className="page-header">
        <h1 className="title-glow">AI Meal Planner</h1>
        <p className="subtitle">Curated nutrition to fuel your titan physique.</p>
      </header>

      <div className="meal-layout">
        <div className="glass-panel settings-panel">
          <div className="panel-header">
            <h2><Utensils size={20} className="text-neon-blue" inline="true" /> Plan Settings</h2>
          </div>
          <form className="panel-body meal-form" onSubmit={generatePlan}>
             <div className="form-group">
                <label>Goal</label>
                <select className="neon-input" value={goal} onChange={(e)=>setGoal(e.target.value)}>
                  <option>Muscle Gain (Bulk)</option>
                  <option>Fat Loss (Cut)</option>
                  <option>Maintenance</option>
                </select>
             </div>
             <div className="form-group">
                <label>Dietary Preference</label>
                <select className="neon-input" value={diet} onChange={(e)=>setDiet(e.target.value)}>
                  <option>Non-Veg</option>
                  <option>Vegetarian</option>
                  <option>Vegan</option>
                </select>
             </div>
             
             <div className="macros-overview mt-20">
               <h3>Daily Targets</h3>
               <div className="macro-item">
                 <span>Calories</span>
                 <span className="text-neon-blue font-bold">2,850 kcal</span>
               </div>
               <div className="macro-item">
                 <span>Protein</span>
                 <span className="text-neon-green font-bold">180g</span>
               </div>
               <div className="macro-item">
                 <span>Carbs</span>
                 <span className="text-neon-blue font-bold">320g</span>
               </div>
               <div className="macro-item">
                 <span>Fats</span>
                 <span className="text-neon-green font-bold">85g</span>
               </div>
             </div>

             <button className="btn-primary" style={{width: '100%', marginTop: '20px'}}>Generate New Plan</button>
          </form>
        </div>

        <div className="meals-list">
          <div className="glass-panel meal-card">
             <div className="meal-header">
                <h3>Breakfast</h3>
                <span className="meal-cals">750 kcal</span>
             </div>
             <div className="meal-body">
                <ul>
                  <li><CheckSquare size={16} className="text-neon-green mr-2" inline="true" /> 4 Whole Eggs (Scrambled)</li>
                  <li><CheckSquare size={16} className="text-neon-green mr-2" inline="true" /> 2 Slices Whole Wheat Toast</li>
                  <li><CheckSquare size={16} className="text-neon-green mr-2" inline="true" /> 1 Cup Oatmeal with Berries</li>
                </ul>
             </div>
          </div>

          <div className="glass-panel meal-card">
             <div className="meal-header">
                <h3>Lunch</h3>
                <span className="meal-cals">900 kcal</span>
             </div>
             <div className="meal-body">
                <ul>
                  <li><CheckSquare size={16} className="text-neon-green mr-2" inline="true" /> 200g Grilled Chicken Breast</li>
                  <li><CheckSquare size={16} className="text-neon-green mr-2" inline="true" /> 1.5 Cups Jasmine Rice</li>
                  <li><CheckSquare size={16} className="text-neon-green mr-2" inline="true" /> Steamed Broccoli & Carrots</li>
                </ul>
             </div>
          </div>

          <div className="glass-panel meal-card">
             <div className="meal-header">
                <h3>Dinner</h3>
                <span className="meal-cals">800 kcal</span>
             </div>
             <div className="meal-body">
                <ul>
                  <li><CheckSquare size={16} className="text-neon-green mr-2" inline="true" /> 200g Salmon/Steak</li>
                  <li><CheckSquare size={16} className="text-neon-green mr-2" inline="true" /> Sweet Potato/Quinoa</li>
                  <li><CheckSquare size={16} className="text-neon-green mr-2" inline="true" /> Mixed Greens Salad</li>
                </ul>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MealPlanner;

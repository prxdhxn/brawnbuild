import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Target, Activity, Zap, ShieldAlert, ArrowRight } from 'lucide-react';
import './InjuryHelp.css';

const injuryDictionary = {
  "Shoulder": {
    "Sharp": {
      name: "Rotator Cuff Impingement or Tear",
      severity: "High",
      phases: [
        { title: "Phase 1: Acute", actions: ["Cease all overhead pressing.", "Apply ice 15min/day.", "Take NSAIDs if swollen."] },
        { title: "Phase 2: Mobility", actions: ["Pendulum swings (pain-free).", "Wall slides.", "Isometric external rotations."] },
        { title: "Phase 3: Loading", actions: ["Light resistance band face-pulls.", "Scapular pushups.", "Slowly reintroduce DB pressing."] }
      ]
    },
    "Dull Ache": {
      name: "Shoulder Tendinitis / Muscle Fatigue",
      severity: "Low",
      phases: [
        { title: "Phase 1: Acute", actions: ["Reduce pressing volume by 50%.", "Focus on pulling movements.", "Heat therapy before workout."] },
        { title: "Phase 2: Mobility", actions: ["Dead hangs (30s).", "Thoracic spine extensions.", "Pec release with massage ball."] },
        { title: "Phase 3: Loading", actions: ["Strict tempo lifting.", "Y-raises for lower trap strength.", "Progressive overload resuming at 70% 1RM."] }
      ]
    }
  },
  "Lower Back": {
    "Sharp": {
      name: "Lumbar Sprain or Disc Irritation",
      severity: "High",
      phases: [
        { title: "Phase 1: Acute", actions: ["Stop all deadlifts and squats immediately.", "Find a pain-free resting posture (lie flat with knees up).", "Do not forcefully stretch the lower back."] },
        { title: "Phase 2: Mobility", actions: ["McGill Big 3 (Bird-Dog, Side Plank, Curl-up).", "Cat-cow stretches slowly.", "Brisk walking."] },
        { title: "Phase 3: Loading", actions: ["Bodyweight squats.", "Goblet squats (light).", "Hip thrusts instead of deadlifts."] }
      ]
    },
    "Dull Ache": {
      name: "Posterior Chain Overuse (Tight Erectors)",
      severity: "Medium",
      phases: [
        { title: "Phase 1: Acute", actions: ["Foam roll glutes and hamstrings (not the lower back directly).", "Heat packs.", "Reduce axial loading."] },
        { title: "Phase 2: Mobility", actions: ["Couch stretch for tight hip flexors.", "Hamstring stretching.", "Glute bridges (bodyweight)."] },
        { title: "Phase 3: Loading", actions: ["Focus on bracing core during compounds.", "Romanian deadlifts (light) for eccentric length.", "Farmer's walks."] }
      ]
    }
  },
  "Knee": {
    "Sharp": {
      name: "Meniscus Tear or Ligament Sprain",
      severity: "High",
      phases: [
        { title: "Phase 1: Acute", actions: ["R.C.I.E (Rest, Compression, Ice, Elevation).", "Avoid deep flexion.", "Use crutches if bearing weight hurts."] },
        { title: "Phase 2: Mobility", actions: ["Heel slides.", "Straight leg raises.", "Stationary biking (no resistance)."] },
        { title: "Phase 3: Loading", actions: ["Awaiting medical clearance.", "Terminal knee extensions.", "Shallow leg presses."] }
      ]
    },
    "Dull Ache": {
      name: "Patellofemoral Pain Syndrome (Runner's Knee)",
      severity: "Medium",
      phases: [
        { title: "Phase 1: Acute", actions: ["Avoid running or intense jumping.", "Ice after activity.", "Wear a knee sleeve for warmth."] },
        { title: "Phase 2: Mobility", actions: ["Stretch quads and calves.", "Foam roll IT band.", "Clamshells for glute medius activation."] },
        { title: "Phase 3: Loading", actions: ["Isometrics (Spanish Squats).", "Step-ups focusing on knee tracking.", "Slow eccentric leg extensions."] }
      ]
    }
  },
  "Elbow": {
    "Sharp": {
      name: "Lateral/Medial Epicondylitis (Golf/Tennis Elbow)",
      severity: "Medium",
      phases: [
        { title: "Phase 1: Acute", actions: ["Stop heavy gripping/pulling.", "Use compression cuff below elbow.", "Ice the tendon connection point."] },
        { title: "Phase 2: Mobility", actions: ["Wrist flexor/extensor stretches.", "Soft tissue massage on forearm.", "Pronation/supination with a light hammer."] },
        { title: "Phase 3: Loading", actions: ["Therabar twists.", "Reverse grips for curls.", "Farmer carries using lifting straps to reduce grip load."] }
      ]
    }
  }
};

const InjuryHelp = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  
  const [part, setPart] = useState("Shoulder");
  const [painType, setPainType] = useState("Sharp");

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnalyzing(true);
    setResult(null);
    
    setTimeout(() => {
      setAnalyzing(false);
      
      // Dynamic Lookup Logic
      const partDict = injuryDictionary[part] || injuryDictionary["Shoulder"];
      const outcome = partDict[painType] || partDict["Sharp"] || partDict["Dull Ache"];
      
      setResult(outcome);
      
    }, 1200);
  };

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <header className="page-header">
        <h1 className="title-glow">Triage Engine</h1>
        <p className="subtitle">Data-driven rehabilitation protocols designed around your specific biomechanical feedback.</p>
      </header>

      <div className="glass-panel warning-banner">
        <ShieldAlert size={24} className="text-neon-blue" />
        <p><strong>Clinical Disclaimer:</strong> This engine references common sports-science therapies, but it is an AI tool. High-severity pains or physical trauma require immediate consultation with a licensed physiotherapist.</p>
      </div>

      <div className="injury-layout mt-20">
        <div className="glass-panel form-panel">
          <form onSubmit={handleSubmit} className="injury-form">
            
            <div className="triage-grid">
              <div className="form-group">
                <label><Target size={16} style={{display: 'inline', marginBottom: '-3px', marginRight: '5px'}}/> Target Area</label>
                <select className="neon-select" value={part} onChange={(e) => setPart(e.target.value)}>
                  {Object.keys(injuryDictionary).map(k => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label><Activity size={16} style={{display: 'inline', marginBottom: '-3px', marginRight: '5px'}}/> Pain Profile</label>
                <select className="neon-select" value={painType} onChange={(e) => setPainType(e.target.value)}>
                  <option value="Sharp">Sharp / Piercing</option>
                  <option value="Dull Ache">Dull Ache / Stiffness</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{marginTop: '10px'}}>
              <label>Symptom Modifiers (Optional)</label>
              <div className="pain-chips">
                {['Popping Sound', 'Swelling', 'Numbness', 'Weakness'].map(p => (
                  <label key={p} className="pain-chip">
                    <input type="checkbox" name="painMod" />
                    <span>{p}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="action-row">
              <button type="submit" className="btn-primary" disabled={analyzing} style={{ width: '100%' }}>
                {analyzing ? (
                  <><Zap size={18} className="spin" style={{display: 'inline'}} /> Generating Protocol...</>
                ) : (
                  'Generate Recovery Protocol'
                )}
              </button>
            </div>
          </form>
        </div>

        {result && (
          <motion.div 
            className="result-panel"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
          >
            <div className="diagnosis-header">
              <div>
                <h2 className="text-neon-blue">{result.name}</h2>
                <p style={{color: '#aaa', fontSize: '0.9rem'}}>Estimated Clinical Profile generated from symptom matrix.</p>
              </div>
              <div className={`severity-badge severity-${result.severity.toLowerCase()}`}>
                <Activity size={16} /> 
                {result.severity} Risk Profile
              </div>
            </div>
            
            <h3 style={{marginBottom: '15px'}}><ArrowRight size={20} className="text-neon-blue" style={{display: 'inline', verticalAlign: 'middle'}}/> 3-Phase Rehabilitation Workflow</h3>
            
            <div className="phase-grid">
              {result.phases.map((phase, i) => (
                <div key={i} className="phase-card">
                  <h4>{phase.title}</h4>
                  <ul>
                    {phase.actions.map((act, j) => (
                      <li key={j}>{act}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default InjuryHelp;

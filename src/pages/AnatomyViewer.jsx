import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import './AnatomyViewer.css';

// Procedural Micro-Muscle Segment
const Muscle = ({ position, rotation = [0,0,0], scale = [1,1,1], color, name, onClick, hoveredName, setHovered, shape = "box" }) => {
  const meshRef = useRef();
  const isHovered = hoveredName === name;
  const colorToUse = isHovered ? '#00F0FF' : color;
  
  return (
    <mesh
      position={position}
      rotation={rotation}
      scale={scale}
      ref={meshRef}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(name); }}
      onPointerOut={() => setHovered(null)}
      onClick={(e) => { e.stopPropagation(); onClick(name); }}
    >
      {shape === "box" && <boxGeometry args={[1, 1, 1]} />}
      {shape === "sphere" && <sphereGeometry args={[0.5, 32, 32]} />}
      {shape === "capsule" && <capsuleGeometry args={[0.3, 1, 4, 16]} />}
      {shape === "cylinder" && <cylinderGeometry args={[0.5, 0.4, 1, 16]} />}
      
      <meshStandardMaterial 
        color={colorToUse} 
        emissive={isHovered ? '#00F0FF' : colorToUse}
        emissiveIntensity={isHovered ? 0.6 : 0.1}
        metalness={0.9}
        roughness={0.1}
        wireframe={isHovered}
      />
    </mesh>
  );
};

// Bilateral Generator for perfectly mirrored muscles
const BilateralMuscle = (props) => {
  const { position, rotation, name, ...rest } = props;
  const [x, y, z] = position;
  const [rx, ry, rz] = rotation || [0, 0, 0];
  
  // For center muscles (x === 0), only render one
  if (x === 0) {
    return <Muscle position={[0,y,z]} rotation={[rx,ry,rz]} name={name} {...rest} />;
  }

  // Generate Left and Right sides symmetrically
  return (
    <>
      <Muscle position={[-x, y, z]} rotation={[rx, -ry, -rz]} name={`Left ${name}`} {...rest} />
      <Muscle position={[x, y, z]} rotation={[rx, ry, rz]} name={`Right ${name}`} {...rest} />
    </>
  );
};

const MuscularMannequin = ({ onSelectMuscle, hoveredName, setHovered }) => {
  const c1 = "#1a1a2e"; // Core dark
  const c2 = "#22223b"; // Offset dark

  const sharedProps = { onClick: onSelectMuscle, hoveredName, setHovered };

  return (
    <group position={[0, 1, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        
        {/* HEAD & NECK */}
        <BilateralMuscle position={[0, 3.8, 0]} scale={[0.8, 0.9, 0.8]} shape="sphere" color={c1} name="Head" {...sharedProps} />
        <BilateralMuscle position={[0.2, 3.2, -0.1]} rotation={[0, 0, -0.3]} scale={[0.3, 0.6, 0.3]} shape="capsule" color={c2} name="Upper Trapezius" {...sharedProps} />
        <BilateralMuscle position={[0.15, 3.3, 0.15]} rotation={[0, 0, -0.5]} scale={[0.2, 0.5, 0.2]} shape="capsule" color={c1} name="Sternocleidomastoid" {...sharedProps} />

        {/* CHEST */}
        <BilateralMuscle position={[0.3, 2.7, 0.4]} rotation={[-0.2, 0, -0.2]} scale={[0.6, 0.3, 0.2]} shape="sphere" color={c1} name="Upper Pectoralis" {...sharedProps} />
        <BilateralMuscle position={[0.4, 2.4, 0.45]} rotation={[0, 0, -0.1]} scale={[0.7, 0.4, 0.2]} shape="box" color={c2} name="Mid Pectoralis" {...sharedProps} />
        <BilateralMuscle position={[0.45, 2.1, 0.4]} rotation={[0.2, 0, -0.1]} scale={[0.6, 0.3, 0.2]} shape="sphere" color={c1} name="Lower Pectoralis" {...sharedProps} />

        {/* SHOULDERS (Deltoids) */}
        <BilateralMuscle position={[1.0, 2.7, 0.3]} rotation={[0, 0.2, -0.4]} scale={[0.4, 0.6, 0.4]} shape="sphere" color={c1} name="Anterior Deltoid" {...sharedProps} />
        <BilateralMuscle position={[1.2, 2.7, 0]} rotation={[0, 0, -0.3]} scale={[0.5, 0.7, 0.5]} shape="sphere" color={c2} name="Lateral Deltoid" {...sharedProps} />
        <BilateralMuscle position={[1.0, 2.7, -0.3]} rotation={[0, -0.2, -0.3]} scale={[0.4, 0.6, 0.4]} shape="sphere" color={c1} name="Posterior Deltoid" {...sharedProps} />

        {/* ARMS */}
        {/* Biceps */}
        <BilateralMuscle position={[1.2, 1.8, 0.2]} rotation={[0, 0, -0.15]} scale={[0.4, 0.8, 0.4]} shape="capsule" color={c2} name="Bicep (Long Head)" {...sharedProps} />
        <BilateralMuscle position={[1.0, 1.75, 0.25]} rotation={[0, 0, -0.1]} scale={[0.3, 0.7, 0.3]} shape="capsule" color={c1} name="Bicep (Short Head)" {...sharedProps} />
        {/* Triceps */}
        <BilateralMuscle position={[1.35, 1.9, -0.1]} rotation={[0, 0, -0.2]} scale={[0.4, 0.8, 0.4]} shape="capsule" color={c1} name="Tricep (Lateral Head)" {...sharedProps} />
        <BilateralMuscle position={[1.1, 1.9, -0.2]} rotation={[0.1, 0, -0.1]} scale={[0.5, 0.9, 0.5]} shape="capsule" color={c2} name="Tricep (Long Head)" {...sharedProps} />
        {/* Forearms */}
        <BilateralMuscle position={[1.5, 0.8, 0.1]} rotation={[0, 0, -0.1]} scale={[0.4, 0.7, 0.4]} shape="cylinder" color={c2} name="Brachioradialis" {...sharedProps} />
        <BilateralMuscle position={[1.35, 0.6, 0.1]} rotation={[0, 0, -0.1]} scale={[0.3, 0.6, 0.3]} shape="cylinder" color={c1} name="Forearm Flexors" {...sharedProps} />
        <BilateralMuscle position={[1.55, 0.6, -0.1]} rotation={[0, 0, -0.1]} scale={[0.3, 0.6, 0.3]} shape="cylinder" color={c1} name="Forearm Extensors" {...sharedProps} />

        {/* CORE */}
        <BilateralMuscle position={[0.15, 1.8, 0.45]} scale={[0.25, 0.25, 0.1]} shape="box" color={c1} name="Upper Rectus Abdominis" {...sharedProps} />
        <BilateralMuscle position={[0.15, 1.5, 0.45]} scale={[0.25, 0.25, 0.1]} shape="box" color={c2} name="Mid-Upper Rectus Abdominis" {...sharedProps} />
        <BilateralMuscle position={[0.15, 1.2, 0.42]} scale={[0.25, 0.25, 0.1]} shape="box" color={c1} name="Mid-Lower Rectus Abdominis" {...sharedProps} />
        <BilateralMuscle position={[0.15, 0.9, 0.40]} scale={[0.25, 0.25, 0.1]} shape="box" color={c2} name="Lower Rectus Abdominis" {...sharedProps} />
        {/* Serratus & Obliques */}
        <BilateralMuscle position={[0.6, 1.6, 0.3]} rotation={[0, 0, 0.4]} scale={[0.2, 0.4, 0.2]} shape="capsule" color={c2} name="Serratus Anterior" {...sharedProps} />
        <BilateralMuscle position={[0.6, 1.1, 0.3]} rotation={[0, 0, 0.2]} scale={[0.3, 0.6, 0.2]} shape="box" color={c1} name="External Obliques" {...sharedProps} />

        {/* BACK */}
        <BilateralMuscle position={[0.7, 1.8, -0.3]} rotation={[0, 0, -0.3]} scale={[0.5, 1.0, 0.3]} shape="box" color={c1} name="Latissimus Dorsi (Upper)" {...sharedProps} />
        <BilateralMuscle position={[0.6, 1.4, -0.3]} rotation={[0, 0, -0.2]} scale={[0.5, 0.8, 0.2]} shape="box" color={c2} name="Latissimus Dorsi (Mid)" {...sharedProps} />
        <BilateralMuscle position={[0.4, 1.0, -0.3]} rotation={[0, 0, -0.1]} scale={[0.4, 0.6, 0.2]} shape="box" color={c1} name="Latissimus Dorsi (Lower)" {...sharedProps} />
        
        <BilateralMuscle position={[0, 2.3, -0.4]} scale={[0.6, 0.8, 0.1]} shape="box" color={c2} name="Lower Trapezius" {...sharedProps} />
        <BilateralMuscle position={[0.3, 2.2, -0.3]} rotation={[0, 0, -0.4]} scale={[0.4, 0.5, 0.2]} shape="box" color={c1} name="Rhomboids" {...sharedProps} />
        <BilateralMuscle position={[0.15, 1.4, -0.35]} scale={[0.2, 0.8, 0.2]} shape="box" color={c2} name="Erector Spinae" {...sharedProps} />

        {/* LEGS */}
        {/* Glutes */}
        <BilateralMuscle position={[0.35, 0.2, -0.4]} rotation={[0.2, 0, 0]} scale={[0.6, 0.6, 0.5]} shape="sphere" color={c1} name="Gluteus Maximus" {...sharedProps} />
        <BilateralMuscle position={[0.6, 0.2, -0.1]} rotation={[0, 0, -0.2]} scale={[0.4, 0.5, 0.4]} shape="sphere" color={c2} name="Gluteus Medius" {...sharedProps} />
        
        {/* Quads */}
        <BilateralMuscle position={[0.4, -0.5, 0.3]} rotation={[0.1, 0, -0.05]} scale={[0.6, 1.4, 0.6]} shape="capsule" color={c1} name="Rectus Femoris" {...sharedProps} />
        <BilateralMuscle position={[0.65, -0.6, 0.2]} rotation={[0.05, 0, -0.1]} scale={[0.5, 1.2, 0.5]} shape="capsule" color={c2} name="Vastus Lateralis" {...sharedProps} />
        <BilateralMuscle position={[0.25, -0.8, 0.2]} rotation={[0.1, 0, 0.1]} scale={[0.4, 0.8, 0.4]} shape="capsule" color={c1} name="Vastus Medialis" {...sharedProps} />
        
        {/* Hamstrings */}
        <BilateralMuscle position={[0.55, -0.6, -0.2]} rotation={[-0.1, 0, 0]} scale={[0.5, 1.2, 0.5]} shape="capsule" color={c2} name="Biceps Femoris" {...sharedProps} />
        <BilateralMuscle position={[0.35, -0.6, -0.2]} rotation={[-0.1, 0, 0]} scale={[0.5, 1.1, 0.4]} shape="capsule" color={c1} name="Semitendinosus" {...sharedProps} />

        {/* Calves */}
        <BilateralMuscle position={[0.55, -1.8, -0.2]} rotation={[-0.05, 0, 0]} scale={[0.4, 0.6, 0.4]} shape="capsule" color={c1} name="Gastrocnemius (Lateral)" {...sharedProps} />
        <BilateralMuscle position={[0.35, -1.8, -0.2]} rotation={[-0.05, 0, 0]} scale={[0.4, 0.6, 0.4]} shape="capsule" color={c2} name="Gastrocnemius (Medial)" {...sharedProps} />
        <BilateralMuscle position={[0.45, -2.2, -0.15]} scale={[0.4, 0.8, 0.4]} shape="cylinder" color={c1} name="Soleus" {...sharedProps} />
        <BilateralMuscle position={[0.45, -2.0, 0.15]} scale={[0.3, 0.9, 0.3]} shape="cylinder" color={c2} name="Tibialis Anterior" {...sharedProps} />

      </Float>
    </group>
  );
};

const AnatomyViewer = () => {
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [hoveredName, setHovered] = useState(null);

  // Dynamic Data Node resolver for exact mapping
  const getDataForMuscle = (name) => {
    if (!name) return null;
    
    const db = {
      "Trapezius": { exercises: ["Barbell Shrugs", "Face Pulls"], tips: "Don't roll shoulders. Elevate linearly for upper traps, retract scapula for lower traps." },
      "Sternocleidomastoid": { exercises: ["Neck Curls", "Isometric Neck Holds"], tips: "Train gently to prevent neck strain and support heavy lifts." },
      "Upper Pectoralis": { exercises: ["Incline Bench Press", "Low-to-High Cable Flyes"], tips: "30-degree incline maximizes clavicular head activation without overwhelming anterior delts." },
      "Mid Pectoralis": { exercises: ["Flat Bench Press", "Dumbbell Flyes"], tips: "Retract scapula, arch back slightly, and squeeze at peak contraction." },
      "Lower Pectoralis": { exercises: ["Decline Bench Press", "High-to-Low Cable Crossovers"], tips: "Drive down and together to trace the lower sternal fibers." },
      "Anterior Deltoid": { exercises: ["Overhead Press", "Front Raises"], tips: "Often overdeveloped from benching. Keep volume moderate to prevent impingement." },
      "Lateral Deltoid": { exercises: ["Dumbbell Lateral Raises", "Cable Lateral Raises"], tips: "Pour the pitcher at the top; internally rotate slightly to isolate the side delts." },
      "Posterior Deltoid": { exercises: ["Reverse Pec Deck", "Face Pulls"], tips: "Crucial for shoulder health and 3D look. Keep weight light and focus on strictly pulling with the rear delt." },
      "Bicep (Long Head)": { exercises: ["Incline Dumbbell Curls", "Drag Curls"], tips: "Curling with elbows behind the body pre-stretches the long head (outer bicep peak)." },
      "Bicep (Short Head)": { exercises: ["Preacher Curls", "Spider Curls"], tips: "Curling with elbows in front of the body isolates the short head (inner bicep thickness)." },
      "Tricep (Lateral Head)": { exercises: ["Rope Pushdowns", "V-Bar Pushdowns"], tips: "Keep elbows glued to ribs. Lock out strictly to hit the lateral (outer) head." },
      "Tricep (Long Head)": { exercises: ["Overhead Tricep Extensions", "Skullcrushers"], tips: "The long head requires your arm to be overhead to fully stretch it for massive growth." },
      "Brachioradialis": { exercises: ["Hammer Curls", "Reverse Curls"], tips: "Neutral or pronated grips force the brachioradialis to take over elbow flexion." },
      "Forearm Flexors": { exercises: ["Wrist Curls (Supinated)"], tips: "Roll the bar down to your fingertips and curl it all the way up into the wrist." },
      "Forearm Extensors": { exercises: ["Reverse Wrist Curls (Pronated)"], tips: "Keep arms perfectly parallel and strictly use the top of your forearms to lift." },
      "Upper Rectus Abdominis": { exercises: ["Crunches", "Cable Crunches"], tips: "Focus on spinal flexion (rolling) rather than just hinging at the hips." },
      "Mid-Upper Rectus Abdominis": { exercises: ["Crunches", "Ab Wheel Rollouts"], tips: "Keep core maximally compressed; do not let your lower back sag on rollouts." },
      "Mid-Lower Rectus Abdominis": { exercises: ["Hanging Leg Raises", "Reverse Crunches"], tips: "Tilt your pelvis backward at the top to fully contract the lower abs." },
      "Lower Rectus Abdominis": { exercises: ["Hanging Leg Raises", "V-Ups"], tips: "Controlled eccentrics are key. Don't swing." },
      "Serratus Anterior": { exercises: ["Scapular Push-ups", "Dumbbell Pullovers"], tips: "Protract your shoulders fully at the top of the movement to activate the 'boxer muscle'." },
      "External Obliques": { exercises: ["Woodchoppers", "Russian Twists"], tips: "Rotate from the core, not just the shoulders. Anti-rotation holds (Pallof) also build strong obliques." },
      "Latissimus Dorsi": { exercises: ["Pull-ups", "Lat Pulldowns", "Single-Arm Dumbbell Rows"], tips: "Imagine your hands are just hooks. Drive your elbows directly back and down to your hips." },
      "Lower Trapezius": { exercises: ["Y-Raises", "Prone Trap Raises"], tips: "Essential for posture and stabilizing the scapula during bench and overhead pressing." },
      "Rhomboids": { exercises: ["Barbell Rows", "T-Bar Rows"], tips: "Focus on squeezing your shoulder blades together like you're crushing a walnut." },
      "Erector Spinae": { exercises: ["Deadlifts", "Back Extensions (Hyperextensions)"], tips: "Keep a rigid, neutral spine under heavy load. Do not over-extend (lean back) excessively." },
      "Gluteus Maximus": { exercises: ["Barbell Hip Thrusts", "Glute Bridges"], tips: "Squeeze the glutes intensely at peak contraction. Keep your chin tucked." },
      "Gluteus Medius": { exercises: ["Hip Abductions", "Cable Kickbacks (Angled)"], tips: "Crucial for hip stability. Kick out at a slight 30-degree angle." },
      "Rectus Femoris": { exercises: ["Leg Extensions", "Sissy Squats"], tips: "Only quad muscle that crosses the hip joint. Keep hips stable for maximum isolation." },
      "Vastus Lateralis": { exercises: ["Narrow Stance Leg Press", "Hack Squats"], tips: "A closer stance places more tension on the outer sweep of the quad." },
      "Vastus Medialis": { exercises: ["Heel-Elevated Goblet Squats", "Cyclist Squats"], tips: "The 'teardrop'. Pushing the knees far over the toes increases VMO load." },
      "Biceps Femoris": { exercises: ["Seated Leg Curls", "Romanian Deadlifts"], tips: "For RDLs, hinge backward until you feel a deep stretch. Keep the bar against your shins." },
      "Semitendinosus": { exercises: ["Lying Leg Curls", "Nordic Hamstring Curls"], tips: "Control the negative. Hamstrings respond incredibly well to slow eccentrics." },
      "Gastrocnemius": { exercises: ["Standing Calf Raises", "Donkey Calf Raises"], tips: "Straight legs hit the gastrocnemius. Deep stretch at the bottom, pause, then explode." },
      "Soleus": { exercises: ["Seated Calf Raises"], tips: "Bent knees deactivate the gastrocnemius, isolating the deeper soleus block." },
      "Tibialis Anterior": { exercises: ["Tibialis Raises", "Dumbbell Dorsiflexion"], tips: "Train this heavily to bulletproof knees against tendinitis and stop shin splints." },
      "Head": { exercises: ["Rest"], tips: "Get 8+ hours of sleep. Muscles grow during recovery, not in the gym." }
    };

    // Find closest match since Left/Right prefixes exist
    for (const key in db) {
      if (name.includes(key)) return db[key];
    }
    return { exercises: ["Analysis Required"], tips: "No advanced biomechanical data found for this specific vector." };
  };

  const currentData = getDataForMuscle(selectedMuscle);

  return (
    <motion.div 
      className="anatomy-page page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <header className="page-header">
        <h1 className="title-glow">Precision Anatomy</h1>
        <p className="subtitle">High-Resolution Mapping: Target specific micro-segments to isolate biomechanics.</p>
      </header>

      <div className="anatomy-layout">
        <div className="canvas-container glass-panel">
          <Canvas camera={{ position: [0, 1, 9], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} color="#00F0FF" />
            <pointLight position={[-10, 0, -10]} intensity={2} color="#E020FF" />
            <MuscularMannequin onSelectMuscle={setSelectedMuscle} hoveredName={hoveredName} setHovered={setHovered} />
            <Environment preset="night" />
            <ContactShadows position={[0, -3.5, 0]} opacity={0.7} scale={15} blur={2.5} color="#00F0FF" />
            <OrbitControls enableZoom={true} maxDistance={15} minDistance={3} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
          <div className="canvas-overlay">
            <span className="scanner-badge">Target Lock: {hoveredName || "Scanning..."}</span>
          </div>
        </div>

        <div className="info-panel glass-panel">
          <AnimatePresence mode="wait">
            {selectedMuscle ? (
              <motion.div 
                key={selectedMuscle}
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="muscle-detail-card"
              >
                <div className="card-header">
                  <h2 className="text-neon-blue">{selectedMuscle}</h2>
                  <div className="pulse-indicator"></div>
                </div>
                
                <div className="info-section">
                  <h3><span className="icon">⚡</span> Recommended Routine</h3>
                  <ul className="exercise-list">
                    {currentData?.exercises.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </div>
                <div className="info-section pro-tip-box">
                  <h3><span className="icon">💡</span> Biomechanics Pro Tip</h3>
                  <p>{currentData?.tips}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="empty-state"
              >
                <div className="scan-icon"></div>
                <p>Initialize micro-segment selection via the interactive 3D viewer.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default AnatomyViewer;

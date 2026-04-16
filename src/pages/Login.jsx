import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

// Sci-Fi Dumbbell 3D Model
const SciFiDumbbell = () => {
  const groupRef = useRef();

  // Slow automatic rotation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} scale={[0.6, 0.6, 0.6]} rotation={[0.5, 0, 0.5]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Handle */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 3, 32]} />
          <meshStandardMaterial color="#333" metalness={0.9} roughness={0.2} />
        </mesh>
        
        {/* Glow rings on handle */}
        <mesh position={[-1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.1, 32]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2} />
        </mesh>
        <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.1, 32]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2} />
        </mesh>

        {/* Inner Plates */}
        <mesh position={[-1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
          <meshStandardMaterial color="#1a1a2e" metalness={1} roughness={0.1} />
        </mesh>
        <mesh position={[1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
          <meshStandardMaterial color="#1a1a2e" metalness={1} roughness={0.1} />
        </mesh>

        {/* Outer Plates (Hexagonal for sci-fi look) */}
        <mesh position={[-1.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.2, 1.2, 0.5, 6]} />
          <meshStandardMaterial color="#22223b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[1.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.2, 1.2, 0.5, 6]} />
          <meshStandardMaterial color="#22223b" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* End Caps */}
        <mesh position={[-2.0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
          <meshStandardMaterial color="#E020FF" emissive="#E020FF" emissiveIntensity={1} />
        </mesh>
        <mesh position={[2.0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
          <meshStandardMaterial color="#E020FF" emissive="#E020FF" emissiveIntensity={1} />
        </mesh>

      </Float>
    </group>
  );
};

const Login = () => {
  const [email, setEmail] = useState('demo@gmail.com');
  const [password, setPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    
    if (result.success) {
      navigate('/');
    } else {
      setErrorMsg(result.error);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setLoading(true);
    const result = await loginWithGoogle();
    
    if (result.success) {
      navigate('/');
    } else {
      setErrorMsg(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      
      {/* LEFT SIDE: Login Form (Swapped) */}
      <div className="login-container" style={{ flexDirection: 'column' }}>
        
        {/* Aligned Site Header with Logo */}
        <div className="site-header">
          <img src="/logo.png" alt="Brawn Build Logo" className="site-logo" />
          <span>Brawn Build</span>
        </div>

        <motion.div 
          className="login-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 style={{ color: '#fff', marginBottom: errorMsg ? '10px' : '20px', fontSize: '1.5rem', fontWeight: 600 }}>Welcome Back</h2>
          
          {errorMsg && (
            <div style={{ color: '#ff4444', background: 'rgba(255, 68, 68, 0.1)', padding: '10px', borderRadius: '4px', marginBottom: '20px', fontSize: '0.9rem', border: '1px solid rgba(255, 68, 68, 0.2)' }}>
              {errorMsg}
            </div>
          )}

          <form className="login-form" onSubmit={handleEmailLogin}>
            <div className="input-group">
              <Mail className="input-icon" size={20} />
              <input 
                type="email" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="divider">or</div>

          <button className="google-btn" onClick={handleGoogleLogin} disabled={loading}>
            <svg className="google-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
        </motion.div>
      </div>

      {/* RIGHT SIDE: 3D Aesthetic (Swapped) */}
      <div className="login-3d-section">
        <Canvas camera={{ position: [0, 0, 9.5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1.5} color="#00F0FF" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#E020FF" />
          <SciFiDumbbell />
          <Environment preset="night" />
          <ContactShadows position={[0, -3.5, 0]} opacity={0.6} scale={15} blur={2.5} color="#00F0FF" />
          <OrbitControls enableZoom={false} autoRotate={false} />
        </Canvas>
      </div>
    </div>
  );
};

export default Login;

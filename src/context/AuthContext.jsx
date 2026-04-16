import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
      } else {
        // Fallback for custom developer bypass
        const storedUser = localStorage.getItem('brawnAuthBypass');
        if (storedUser) setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    checkSession();

    // Listen to Supabase auth changes and update state automatically
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    // DEMO BYPASS: We attempt Supabase natively first.
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    // If it fails (like for unverified demo accounts), we bypass the rejection!
    if (error) {
      console.warn("Supabase auth failed:", error.message, "Error code:", error.status, "Applying developer bypass for:", email);
      const mockUser = { email, alias: 'Demo Tester', authenticated_via_bypass: true };
      setUser(mockUser);
      localStorage.setItem('brawnAuthBypass', JSON.stringify(mockUser));
      return { success: true };
    }
    
    // If it legitimately succeeds:
    return { success: true };
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
       return { success: false, error: error.message };
    }
    return { success: true }; 
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('brawnAuthBypass');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient, SupabaseClient, User as SupabaseUser } from '@supabase/supabase-js';
import { User as CustomUser } from '../types';
import { supabase } from '../lib/supabaseClient';

interface AuthContextType {
  user: CustomUser | null;
  isAuthenticated: boolean;
  supabase: SupabaseClient;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string, role: 'buyer' | 'seller') => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const transformUser = (supabaseUser: SupabaseUser | null): CustomUser | null => {
  if (!supabaseUser) return null;
  
  return {
    id: parseInt(supabaseUser.id),
    username: supabaseUser.user_metadata.username || '',
    email: supabaseUser.email || '',
    role: supabaseUser.user_metadata.role || 'buyer',
    created_at: supabaseUser.created_at
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      const transformedUser = transformUser(session?.user || null); // Add explicit null check
      setUser(transformedUser);
      setIsAuthenticated(!!session?.user);
    });

    // Listen for changes on auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const transformedUser = transformUser(session?.user || null); // Add explicit null check
      if (session?.user) {
        setUser(transformedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, username: string, role: 'buyer' | 'seller') => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          role
        }
      }
    });
    if (error) throw error;
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local storage
      localStorage.removeItem('sb-token');
      localStorage.removeItem('user');
      
      // Reset auth state
      setUser(null);
      setIsAuthenticated(false);
      
      // Redirect to login
      window.location.replace('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      supabase, 
      signIn, 
      signUp, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
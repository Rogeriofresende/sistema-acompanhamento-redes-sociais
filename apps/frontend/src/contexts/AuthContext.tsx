import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  googleId: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = "lanceiessa_user";
const TOKEN_KEY = "lanceiessa_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Carrega do localStorage ao iniciar
    try {
    const storedUser = localStorage.getItem(USER_KEY);
    const storedToken = localStorage.getItem(TOKEN_KEY);
      
      if (storedUser && storedUser !== 'undefined' && storedToken && storedToken !== 'undefined') {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      setToken(storedToken);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error);
      // Limpa dados corrompidos
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
  }, []);

  function login(user: User, token: string) {
    console.log('AuthContext login - user:', user, 'token:', token);
    
    if (!user || !token) {
      console.error('Login chamado com dados inválidos:', { user, token });
      return;
    }
    
    setUser(user);
    setToken(token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
} 
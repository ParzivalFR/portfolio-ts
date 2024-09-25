"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TokenContextType {
  token: string | null;
  userId: string | null;
  login: (newToken: string, newUserId: string) => void;
  logout: () => void;
}

// Créez un Contexte pour le token et l'userId
const TokenContext = createContext<TokenContextType | undefined>(undefined);

// Utilisez un Hook pour accéder au Contexte facilement
export function useToken(): TokenContextType {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
}

interface TokenProviderProps {
  children: ReactNode;
}

// Créez un Provider pour le Contexte qui gère le token et l'userId
export function TokenProvider({ children }: TokenProviderProps): JSX.Element {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Charger le token et l'userId du localStorage lors du montage du composant
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
    }
  }, []);

  // Fonction pour se connecter et définir le token et l'userId
  const login = (newToken: string, newUserId: string): void => {
    setToken(newToken);
    setUserId(newUserId);
    localStorage.setItem("token", newToken); // Stockez le token dans localStorage
    localStorage.setItem("userId", newUserId); // Stockez l'userId dans localStorage
  };

  // Fonction pour se déconnecter et supprimer le token et l'userId
  const logout = (): void => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token"); // Supprimez le token de localStorage
    localStorage.removeItem("userId"); // Supprimez l'userId de localStorage
  };

  return (
    <TokenContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </TokenContext.Provider>
  );
}

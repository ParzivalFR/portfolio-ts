"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Créer le contexte
const WindowSizeContext = createContext<number | undefined>(undefined);

interface WindowSizeProviderProps {
  children: ReactNode;
}

// Fournir le contexte
export const WindowSizeProvider: React.FC<WindowSizeProviderProps> = ({
  children,
}) => {
  const [windowSize, setWindowSize] = useState<number | undefined>(
    typeof window !== "undefined" ? window.innerWidth : undefined
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      handleResize(); // Appeler handleResize immédiatement pour obtenir la taille initiale de la fenêtre

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <WindowSizeContext.Provider value={windowSize}>
      {children}
    </WindowSizeContext.Provider>
  );
};

// Utiliser le contexte
export const useWindowSize = (): number | undefined => {
  const context = useContext(WindowSizeContext);

  if (typeof window !== "undefined" && context === undefined) {
    // Si nous sommes côté client et que le contexte n'est pas défini,
    // retournons la largeur actuelle de la fenêtre
    return window.innerWidth;
  }

  return context;
};

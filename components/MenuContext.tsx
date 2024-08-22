'use client';

// MenuContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface MenuContextType {
  isOpen: boolean;
  toggleOpen: () => void;
}

// Create the context with an initial undefined value
const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
  children: ReactNode;
}

// Create a provider component
export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <MenuContext.Provider value={{ isOpen, toggleOpen }}>
      {children}
    </MenuContext.Provider>
  );
};

// Custom hook to use the context
export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

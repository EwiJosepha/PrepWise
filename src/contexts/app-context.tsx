'use client'
import React, { createContext, useState } from 'react';

// Define the shape of the context state
interface AppState {
  isSidebarOpen: boolean;
}

// Define the shape of the context value
interface AppContextProps {
  state: AppState;
  setAppState: (newState: Partial<AppState>) => void;
}

// Create the context with a default value
export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps extends React.HTMLAttributes<HTMLDivElement> {}
// Create a provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({ isSidebarOpen: false });

  const setAppState = (newState: Partial<AppState>) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <AppContext.Provider value={{ state, setAppState }}>
      {children}
    </AppContext.Provider>
  );
};

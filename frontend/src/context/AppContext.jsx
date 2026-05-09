import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedExpert, setSelectedExpert] = useState(null);

  const resetSelection = useCallback(() => {
    setSelectedSlot(null);
  }, []);

  const value = {
    selectedSlot,
    setSelectedSlot,
    selectedExpert,
    setSelectedExpert,
    resetSelection,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

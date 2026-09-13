import React, { createContext, useContext, useState } from 'react';

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const [history, setHistory] = useState([{ page: 'home', evId: null }]);
  const current = history[history.length - 1];

  const navigateTo = (page, evId = null) => {
    setHistory(prev => [...prev, { page, evId }]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setHistory(prev => {
      if (prev.length > 1) {
        return prev.slice(0, prev.length - 1);
      }
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageContext.Provider value={{ 
      currentPage: current.page, 
      activeEventId: current.evId, 
      navigateTo, 
      goBack,
      canGoBack: history.length > 1
    }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error('usePage must be used within PageProvider');
  return ctx;
}

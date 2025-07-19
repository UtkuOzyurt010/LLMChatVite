import React, { createContext, useContext, useState, useEffect } from "react";

const CurrentContextIdContext = createContext<{
  currentContextId: string;
  setCurrentContextId: (id: string) => void;
}>({
  currentContextId: "",
  setCurrentContextId: () => {},
});

export const useCurrentContextId = () => useContext(CurrentContextIdContext);

export const CurrentContextIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentContextId, setCurrentContextId] = useState<string>(() => {
    return localStorage.getItem("currentContextId") || "";
  });

  useEffect(() => {
    localStorage.setItem("currentContextId", currentContextId);
  }, [currentContextId]);

  return (
    <CurrentContextIdContext.Provider value={{ currentContextId, setCurrentContextId }}>
      {children}
    </CurrentContextIdContext.Provider>
  );
};
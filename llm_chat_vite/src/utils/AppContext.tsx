import React, { createContext, useContext } from "react";
import type { Context } from "../models/Context";
import type { Session } from "../models/Session";

type AppContextType = {
  contexts: Context[];
  setContexts: React.Dispatch<React.SetStateAction<Context[]>>;
  sessions: Session[];
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
  currentSessionId: string;
  setCurrentSessionId: React.Dispatch<React.SetStateAction<string>>;
  currentContextId: string;
  setCurrentContextId: React.Dispatch<React.SetStateAction<string>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppProvider");
  return context;
};

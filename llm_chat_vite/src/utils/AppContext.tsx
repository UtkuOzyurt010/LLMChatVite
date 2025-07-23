import
{ type Dispatch, 
  type SetStateAction, 
  createContext, 
  useContext } from "react";
import type { Context } from "../models/Context";
import type { Session } from "../models/Session";

type AppContextType = {
  contexts: Context[];
  setContexts: Dispatch<SetStateAction<Context[]>>;
  sessions: Session[];
  setSessions: Dispatch<SetStateAction<Session[]>>;
  currentSessionId: string;
  setCurrentSessionId: Dispatch<SetStateAction<string>>;
  currentContextId: string;
  setCurrentContextId: Dispatch<SetStateAction<string>>;
  leftSideDrawerCollapsed: boolean;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppProvider");
  return context;
};

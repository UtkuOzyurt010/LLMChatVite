import React from "react";
import { AppContext } from "./AppContext";
import { useLocalStorage } from "./useLocalStorage";
import { createContext, type Context } from "../models/Context";
import { createSession, type Session } from "../models/Session";

function initContexts(): Context[] {
  return [
    createContext("#FFC0CB"), // pink
    createContext("#0000FF"), // blue
    createContext("#FF0000"), // red
    createContext("#008000"), // green
    createContext("#000000"), // black
    createContext("#A52A2A"), // brown
  ];
}

function initContexts2(): Context[] {
  return [
    createContext("#FFA500"), // orange
    createContext("#FFFF00"), // yellow
    createContext("#800080"), // purple
    createContext("#FFFFFF"), // white
  ];
}

function initSessions(contextIds1: string[], contextIds2: string[]): Session[] {
  const session1 = createSession(contextIds1);
  const session2 = createSession(contextIds2);
  session1.summary = "My first session!";
  session2.summary = "My second session!";
  return [session1, session2];
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialContexts = initContexts();
  const initialContextIds = initialContexts.map((context) => context.guid);
  const initialContexts2 = initContexts2();
  const initialContextIds2 = initialContexts2.map((context) => context.guid);
  const initialSessions = initSessions(initialContextIds, initialContextIds2);
  const initialSessionIds = initialSessions.map((session) => session.guid);

  const [contexts, setContexts] = useLocalStorage<Context[]>("contexts", [...initialContexts, ...initialContexts2]);
  const [sessions, setSessions] = useLocalStorage<Session[]>("sessions", initialSessions);
  const [currentSessionId, setCurrentSessionId] = useLocalStorage<string>("currentSessionId", initialSessionIds[0]);
  const [currentContextId, setCurrentContextId] = useLocalStorage<string>("currentContextId", initialContextIds[0]);

  return (
    <AppContext.Provider
      value={{
        contexts,
        setContexts,
        sessions,
        setSessions,
        currentSessionId,
        setCurrentSessionId,
        currentContextId,
        setCurrentContextId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

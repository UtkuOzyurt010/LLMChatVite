import React from "react";
import { AppContext } from "./AppContext";
import { createContext, type Context } from "../models/Context";
import { createSession, type Session } from "../models/Session";

import { useLocalStorage } from "./useLocalStorage";

function initContexts(): Context[] {
  return [
    createContext("#C458B1"), 
    createContext("#C4606C"), 
    createContext("#C4C045"),
    createContext("#83C451"),
    createContext("#64C47C"),
    createContext("#7AC4B8"),
  ];
}

function initContexts2(): Context[] {
  return [
    createContext("#97C1C4"),
    createContext("#A2A1C4"),
    createContext("#C4AA89")
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
  const leftSideDrawerCollapsed = false;

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
        leftSideDrawerCollapsed
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

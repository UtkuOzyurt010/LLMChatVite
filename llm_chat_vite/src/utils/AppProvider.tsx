import React from "react";
import { AppContext } from "./AppContext";
import { useLocalStorage } from "./useLocalStorage";
import { createContext, type Context } from "../models/Context";
import { createSession, type Session } from "../models/Session";

function initContexts(): Context[] {
  return [
    createContext("pink"),
    createContext("blue"),
    createContext("red"),
    createContext("green"),
    createContext("black"),
    createContext("brown"),
  ];
}

function initSessions(contextIds: string[]): Session[] {
  const session1 = createSession(contextIds);
  const session2 = createSession(contextIds);
  session1.summary = "My first session!";
  session2.summary = "My second session!";
  return [session1, session2];
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialContexts = initContexts();
  const initialContextIds = initialContexts.map((context) => context.guid);
  const initialSessions = initSessions(initialContextIds);
  const initialSessionIds = initialSessions.map((session) => session.guid);

  const [contexts, setContexts] = useLocalStorage<Context[]>("contexts", initialContexts);
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

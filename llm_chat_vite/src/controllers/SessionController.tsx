//import { createContext } from "../models/Context"
import React from 'react';
import type { ChatEntry } from "../models/ChatEntry";
import { createContext, type Context } from "../models/Context";
import { type Session, createSession } from "../models/Session";
import { useAppContext } from "../utils/AppContext";
import { useContextController } from "./ContextController";
import { useColorController } from './ColorController';

export function useSessionController() {
  const {
    contexts,
    sessions,
    currentSessionId,
    setCurrentContextId,
    setCurrentSessionId,
    setContexts,
    setSessions
  } = useAppContext();
  const contextController = useContextController()
  const colorController = useColorController()

  const getCurrentSession = () : Session => {
    return sessions.find((s) => s.guid === currentSessionId)!;
  }

  const getCurrentSessionId = () : string => {
    return currentSessionId
  }

  const getSession = (sessionId: string) : Session => {
    return sessions.find((s) => s.guid === sessionId)!;
  }

  const getAllSessions = () : Session[]=> {
    return sessions
  }

  const addNewSession = () => {
    //const newContext = createContext(contextController.getRandomHexColor())
    const newContext = createContext(colorController.getDistinctColor())

    //contexts.push(newContext) //not saved to localStorage
    setContexts([...contexts, newContext])
    setCurrentContextId(newContext.guid)
    const newSession = createSession([newContext.guid])
    newSession.summary = `a new session with guid: ${newSession.guid}`
    //sessions.push(newSession) //not saved to localStorage
    setSessions([...sessions, newSession]);
    setCurrentSessionId(newSession.guid)
  }
 
  const selectSession = (session : Session) => {
    setCurrentSessionId(session.guid)
    setCurrentContextId(session.currentContextId)
  }

  const removeContextFromSession = (contextId: string) => {
      const newSession : Session = getCurrentSession()
      newSession.contextIds = newSession.contextIds.filter((guid) => guid != contextId)
      
      const updatedSessions = sessions.map((session) =>
        session.guid === currentSessionId
          ? newSession
          : session
      )
      setSessions(updatedSessions)
      setCurrentContextId(newSession.contextIds[0])
  
    }

    const getSessionContextIdsLength = () : number => {
      return getCurrentSession().contextIds.length
    }

    const getSortedEntriesCurrentSessionContexts = (): ChatEntry[] => {
      const session = getCurrentSession()
      const entries: ChatEntry[] = [];
      for (const contextId of session.contextIds) {
        const context = contextController.getContext(contextId)
        entries.push(...Object.values(context.prompts));
        entries.push(...Object.values(context.responses));
      }
    
      // Sort by datetime ascending
      entries.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
    
      return entries;
    }

    const createResponse = () : string => {
      //for now just return everything that should be considered for the response
      // return getSortedEntriesCurrentSessionContexts().map(
      //   (chatEntry) => {if(chatEntry.type == "prompt") return `${contextController.getContextColor(chatEntry.contextGuId)}:  ${chatEntry.text}`}
      //   //${chatEntry.type}, ${chatEntry.guid}, 
      // ).join('\n') 
      return contextController.getEntriesCurrentContext().map(
        (chatEntry) => {if(chatEntry.type == "prompt") return `${contextController.getContextColor(chatEntry.contextGuId)}:  ${chatEntry.text}`}
      ).join('\n') 
    }

  return{
    getCurrentSession,
    getCurrentSessionId,
    getSession,
    getAllSessions,
    addNewSession,
    selectSession,
    removeContextFromSession,
    getSessionContextIdsLength,
    getSortedEntriesCurrentSessionContexts,
    createResponse

  }
}






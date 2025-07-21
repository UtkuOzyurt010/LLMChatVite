//import { createContext } from "../models/Context"
import { createContext, type Context } from "../models/Context";
import { type Session, createSession } from "../models/Session";
import { useAppContext } from "../utils/AppContext";
import { useContextController } from "./ContextController";

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
    const newContext = createContext(contextController.getRandomHexColor())
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

  return{
    getCurrentSession,
    getCurrentSessionId,
    getSession,
    getAllSessions,
    addNewSession,
    selectSession,
    removeContextFromSession,
    getSessionContextIdsLength

  }
}






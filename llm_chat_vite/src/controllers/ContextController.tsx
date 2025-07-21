import { createContext } from "../models/Context"
import { useAppContext } from "../utils/AppContext";

export function useContextController() {
  const {
    contexts,
    sessions,
    currentSessionId,
    setCurrentContextId
  } = useAppContext();

  const getRandomHexColor = () =>
  {
    const randomNum = Math.floor(Math.random() * 0xffffff);
    const hexString = randomNum.toString(16).padStart(6, '0');
    return `#${hexString}`;
  }

  const getContextColor = (contextId : string) : string => {
    return contexts.find((context) => context.guid == contextId)!.color
  }

  const selectContext = (contextId : string) => 
  {
    const currentSession = sessions.find((s) => s.guid === currentSessionId)!; 
      if(!currentSession.contextIds.includes(contextId)){
        currentSession.contextIds.push(contextId)
      }
      setCurrentContextId(contextId)
      currentSession.currentContextId = contextId
  }

  const addNewContext = (color: string) : string =>
  {
    const context = createContext(color)
    contexts.push(context) //add created context to all contexts
    setCurrentContextId(context.guid)
    const session = sessions.find((session) => session.guid === currentSessionId)!
    session.contextIds.push(context.guid) // add contextId to currentSession contexts
    return getRandomHexColor()
  }

  const addExistingContext = (contextId: string) => {
    const session = sessions.find((session) => session.guid === currentSessionId)!
    session.contextIds.push(contextId) // add contextId to currentSession contexts
    setCurrentContextId(contextId)
  }

  const isContextIdInCurrentSession = (contextId: string) : boolean => 
  {
    const session = sessions.find((session) => session.guid === currentSessionId)!
    return session.contextIds.includes(contextId)
  }

  return{
    getRandomHexColor,
    getContextColor,
    selectContext,
    addNewContext,
    addExistingContext,
    isContextIdInCurrentSession
  }
}






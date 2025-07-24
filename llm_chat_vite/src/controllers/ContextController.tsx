import { createChatEntry, type ChatEntry } from "../models/ChatEntry";
import { createContext, type Context } from "../models/Context"
import { useAppContext } from "../utils/AppContext";
import { useSessionController } from "./SessionController";

export function useContextController() {
  const {
    contexts,
    sessions,
    currentContextId,
    currentSessionId,
    setCurrentContextId,
    setContexts,
    setSessions,
  } = useAppContext();

  const getContext = (contextId: string) : Context => {
    return contexts.find((s) => s.guid === contextId)!
  }
  const getContexts = () : Context[] => {
      return contexts
  }
  const getCurrentContext = () : Context =>
  {
    return contexts.find((s) => s.guid === currentContextId)!
  }

  const getCurrentContextId = () : string =>
  {
    return currentContextId
  }
  
  const getRandomHexColor = () =>
  {
    const randomNum = Math.floor(Math.random() * 0xffffff)
    const hexString = randomNum.toString(16).padStart(6, '0')
    return `#${hexString}`
  }

  const getContextColor = (contextId : string) : string => {
    return contexts.find((context) => context.guid == contextId)?.color ?? "gray"
  }

  const selectContext = (contextId : string) => 
  {
    const currentSession = sessions.find((s) => s.guid === currentSessionId)!
      if(!currentSession.contextIds.includes(contextId)){
        currentSession.contextIds.push(contextId)
      }
      setCurrentContextId(contextId)
      currentSession.currentContextId = contextId
  }

  const addNewContext = (color: string) : string =>
  {
    const newContext = createContext(color)
    //contexts.push(context) 
    setContexts([...contexts, newContext])
    setCurrentContextId(newContext.guid)

    const updatedSessions = sessions.map((session) =>
    session.guid === currentSessionId
      ? { ...session, contextIds: [...session.contextIds, newContext.guid] }
      : session
    );
    setSessions(updatedSessions);

    return getRandomHexColor()
  }

  const addExistingContext = (contextId: string) => {

    const updatedSessions = sessions.map((session) =>
      session.guid === currentSessionId
        ? { ...session, contextIds: [...session.contextIds, contextId] }
        : session
    );
    setSessions(updatedSessions);
      
    setCurrentContextId(contextId)
  }

  const isContextIdInCurrentSession = (contextId: string) : boolean => 
  {
    const session = sessions.find((session) => session.guid === currentSessionId)!
    return session.contextIds.includes(contextId)
  }

  const addChatEntry = (chatEntry: ChatEntry) => {
    const newContext = getContext(currentContextId);
    if(chatEntry.type == "prompt") 
    {
      newContext.prompts[++newContext.current_prompt_index] = chatEntry
    }
    else
    {
      newContext.responses[++newContext.current_response_index] = chatEntry
    }

    const updatedContexts = contexts.map((context) =>
      context.guid === newContext.guid
        ? newContext 
        : context
    );
    setContexts(updatedContexts);

    //sessions only use Ids so we shouldn't need to update those

  }

  return{
    getContext,
    getContexts,
    getCurrentContext,
    getCurrentContextId,
    getRandomHexColor,
    getContextColor,
    selectContext,
    addNewContext,
    addExistingContext,
    isContextIdInCurrentSession,
    addChatEntry
  }
}






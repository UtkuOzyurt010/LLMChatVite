import { useAppContext } from "../utils/AppContext";
import { useContextController } from "./ContextController";

export function useChatEntryController() {
  const {
    contexts,
    sessions,
    currentContextId,
    currentSessionId,
    setCurrentContextId,
    setContexts,
    setSessions,
  } = useAppContext();

  const contextController = useContextController()

  const addChatEntry = () => {
    const context = contextController.getContext(currentContextId);
    context.
  }

  return{
    addChatEntry
 
  }
}
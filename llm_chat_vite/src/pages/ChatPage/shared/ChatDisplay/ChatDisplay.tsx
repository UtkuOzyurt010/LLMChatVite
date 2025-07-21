import { Box } from "@mui/material";
import  { getSortedEntriesAllContexts } from "../../../../models/Session";
import EmptyChatDisplay from "./EmptyChatHistory/EmptyChatDisplay";
import ChatHistory from "./ChatHistory/ChatHistory";
import { useState } from "react";
import { useSessionController } from "../../../../controllers/SessionController";

export default function ChatDisplay() 
{
  const sessionController = useSessionController()
  const sessions =sessionController.getAllSessions()
  const currentSessionId = sessionController.getCurrentSessionId()
  //ChatDisplay should never be rendered if entries would be empty
  const entries = getSortedEntriesAllContexts(sessions.find((session) => session.guid == currentSessionId)!); 
  const [focusedField, setFocusedField] = useState("");
  

  return (
    <Box
      sx={{
        height: "100%",
        boxSizing: "border-box",
       // border: "3px solid black"
      }}
    >
      {
        entries.length === 0 
          ? <EmptyChatDisplay />
          : <ChatHistory entries={entries} focusedField={focusedField} setFocusedField={setFocusedField} />
      }
    </Box>
  );
}


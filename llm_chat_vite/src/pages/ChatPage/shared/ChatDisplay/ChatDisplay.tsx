import { Box } from "@mui/material";
import  { getSortedEntriesAllContexts } from "../../../../models/Session";
import EmptyChatDisplay from "./EmptyChatHistory/EmptyChatDisplay";
import ChatHistory from "./ChatHistory/ChatHistory";
import { useState } from "react";
import { useAppContext } from "../../../../utils/AppContext";

export default function ChatDisplay() 
{
   const {currentSessionId, sessions} = useAppContext(); 
  const entries = currentSessionId ? getSortedEntriesAllContexts(sessions.find((session) => session.guid == currentSessionId)!) : []; //since this is only used by ChatHistory...
        //...it might be better to check a different way whether its empty, like accessing the first element, and then 
        //getting all entries within ChatHistory rather than passing it as a prop
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


import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import  { type Session, getSortedEntriesAllContexts } from "../../../../models/Session";
//import type { ChronologicalEntry } from "../../../models/ChronologicalEntry";
import EmptyChatDisplay from "./EmptyChatHistory/EmptyChatDisplay";
import ChatHistory from "./ChatHistory/ChatHistory";
import { useState } from "react";
import useLocalStorage from "../../../../utils/useLocalStorage";

export default function ChatDisplay({open, collapsed, drawerwidth, collapsedwidth}: 
  { 
  open?: boolean
  collapsed?: boolean
  drawerwidth: number
  collapsedwidth: number
}) {
  const [currentSession, setCurrentSession] = useLocalStorage<Session | null>("currentSession", null)
  const entries = currentSession ? getSortedEntriesAllContexts(currentSession) : []; //since this is only used by ChatHistory...
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


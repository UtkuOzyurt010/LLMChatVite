import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import type { Session } from "../../../../models/Session";
//import type { ChronologicalEntry } from "../../../models/ChronologicalEntry";
import EmptyChatHistory from "./EmptyChatHistory/EmptyChatDisplay";
import ChatHistory from "./ChatHistory/ChatHistory";
import { useState } from "react";

export default function ChatDisplay({ open, collapsed, drawerwidth, collapsedwidth, currentSession }: 
  { 
  open?: boolean
  collapsed?: boolean
  drawerwidth: number
  collapsedwidth: number
  currentSession: Session
}) {
  const entries = currentSession.getSortedEntriesAllContexts();
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
          ? <EmptyChatHistory />
          : <ChatHistory entries={entries} focusedField={focusedField} setFocusedField={setFocusedField} />
      }
    </Box>
  );
}


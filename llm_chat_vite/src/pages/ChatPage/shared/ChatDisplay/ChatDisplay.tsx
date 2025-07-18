import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import type { Session } from "../../../../models/Session";
//import type { ChronologicalEntry } from "../../../models/ChronologicalEntry";
import EmptyChatHistory from "./EmptyChatHistory/EmptyChatDisplay";
import ChatHistory from "./ChatHistory/ChatHistory";

// You can base it on Box instead of 'main' if needed
const StyledChatDisplay = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'collapsed',
})<{
  open?: boolean;
  collapsed?: boolean;
  drawerwidth: number;
  collapsedwidth: number;
  currentSession: Session;
}>(({ theme, open, collapsed, drawerwidth, collapsedwidth, currentSession }) => {
  const shift = open ? (collapsed ? collapsedwidth : drawerwidth) : 0;

  return {
    position: 'relative',
    width: '100%',
    transform: `translateX(${shift}px)`,
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  };
});

export default function ChatDisplay({ open, collapsed, drawerwidth, collapsedwidth, currentSession }: 
  { 
  open?: boolean
  collapsed?: boolean
  drawerwidth: number
  collapsedwidth: number
  currentSession: Session
}) {

  const entries = currentSession.getSortedEntriesAllContexts();


  return (
    <StyledChatDisplay open={open} collapsed={collapsed} drawerwidth={drawerwidth} collapsedwidth={collapsedwidth} currentSession={currentSession}>
      {
        entries.length == 0 
        ?
        <EmptyChatHistory></EmptyChatHistory> 
        :
        <ChatHistory entries={entries}></ChatHistory>
        }
        {/* )
      }

      <Box
      sx={{
        backgroundColor: "pink",
        paddingX: "20%",
      }}
      
      
      >ChatHistory</Box> */}
    </StyledChatDisplay>
  );
}

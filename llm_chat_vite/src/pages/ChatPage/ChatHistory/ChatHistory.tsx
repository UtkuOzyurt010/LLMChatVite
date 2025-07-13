import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import type { Session } from "../../../models/Session";
import type { ChronologicalEntry } from "../../../models/ChronologicalEntry";
import FirstPrompt from "./FirstPrompt/FirstPrompt";

// You can base it on Box instead of 'main' if needed
const StyledChatHistory = styled(Box, {
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

export default function ChatHistory({ open, collapsed, drawerwidth, collapsedwidth, currentSession }: 
  { 
  open?: boolean
  collapsed?: boolean
  drawerwidth: number
  collapsedwidth: number
  currentSession: Session
}) {
  return (
    <StyledChatHistory open={open} collapsed={collapsed} drawerwidth={drawerwidth} collapsedwidth={collapsedwidth} currentSession={currentSession}>
      
      {
        
        currentSession.getChronologicalEntries().map((value: ChronologicalEntry, index: number) => {
          const entries = currentSession.getChronologicalEntries();
          
          return(
            entries.length == 0 ?
            <FirstPrompt></FirstPrompt> 
            :
            <Box
            position={"relative"}
              key={`chronologicalentry: ${index}`}
            >
              {value.type == "prompt" ?
              <Box
                sx={{
                  position: "absolute",
                  right: "0"
                }}
              >
                {value.promptResponse.text}
              </Box> 
              :
              <Box
                sx={{
                  position: "absolute",
                  left: "0"
                }}
              >
                {value.promptResponse.text}
              </Box>
              }
            </Box>
          )
        })
      }

      <Box
      sx={{
        backgroundColor: "pink",
        paddingX: "20%",
      }}
      
      
      >ChatHistory</Box>
    </StyledChatHistory>
  );
}

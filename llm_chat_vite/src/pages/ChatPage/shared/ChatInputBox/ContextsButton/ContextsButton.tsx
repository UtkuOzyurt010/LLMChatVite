import CircleIcon from '@mui/icons-material/Circle';
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../../../../../utils/AppContext";
import type { Session } from '../../../../../models/Session';
import { useTheme } from '@mui/material/styles';


//historySessionId is for the leftsideDrawer, to display the contexts belonging to the session
//currentsessionId is for the chatInputBox, to show the contexts of the current session
const ContextsButton = ({historySessionId, forChatInputBox, children} : 
  {
    historySessionId? : string
    forChatInputBox? : boolean
    children?: React.ReactNode;
  }
) =>
{
  const {contexts, sessions, currentSessionId, currentContextId, setCurrentContextId } = useAppContext(); 
  const sessionId = historySessionId ? historySessionId : currentSessionId
  const currentSession = sessions.find((s) => s.guid === sessionId)!; //currentSessionId
    //only reorder the contexts for for the ContextsButton displayed in the ChatInputBox
  const reorderedContextIds = forChatInputBox 
    ? [
        currentContextId,
        ...currentSession.contextIds.filter((cguid) => cguid !== currentContextId),
      ]
    : [...currentSession.contextIds];

  const theme = useTheme();
  const buttonHeight = theme.customSizes.buttonHeight
  const buttonHeightn = theme.customSizes.buttonHeightn
  const allCirclesWidth = "40px"

  const overlapOffset = 5;
  const [isHovering, setIsHovering] = useState(false);


  const handleSelectContext = (contextId : string) => {
    setCurrentContextId(contextId)
    currentSession.currentContextId = contextId
  }

  return(
    <Box
      //overflow={"visible"}
      display={"flex"}
      flexDirection={"row"}
      sx={{
        position: "relative",
        height: buttonHeight,
        alignItems: 'center',
        //border: "3px solid red",
      }}
    >
      {/* <Box
      sx={{
        //paddingLeft: "20px",
        overflow: "hidden"
      }}
      >
        <Typography noWrap={true}>
          {children}
        </Typography>
      </Box> */}
      <Box
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          right: allCirclesWidth,
          height: buttonHeight,
          overflow: "visible", 
        }}
      >
         <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: isHovering ? `${reorderedContextIds.length * (buttonHeightn + 4)}px` : allCirclesWidth, 
              height: "100%",
              backgroundColor: "purple",
              borderRadius: "12px",
              zIndex: 1,
              //visibility: isHovering ? "visible" : "hidden", //now changing the width to 0 instead
              opacity: isHovering ? 1 : 0,
              transition: isHovering ?
              "opacity 0.3s ease, width 0.3s ease"
              :"opacity 0.3s ease, width 0.3s ease" , //not sure about this one
            }}
          />
        {reorderedContextIds.map((contextId: string, index) => (
        <Box
          key={index}
          className="circle"
          sx={{
            //visibility: (isHovering || index < 3) ? "visible" : "hidden",
            display: "flex",
            alignItems: "center",
            width: (isHovering || index < 3) ? buttonHeight : "0px", //this is much prettier wow! :D
            height: "100%",
            position: "absolute",
            left: `${index * (isHovering ? buttonHeightn + 4 : overlapOffset)}px`, // spread if hovering
            zIndex: reorderedContextIds.length - index,
            opacity: (isHovering || index < 3) ? 1 : 0,
            transition: isHovering ?
              "left 0.3s ease, opacity 0.3s ease, width 0.3s ease"
              :"left 0.3s ease, opacity 0.8s ease, width 0.3s ease",
            // boxSizing: "border-box",
            // border: "3px solid purple"
          }}
        >
          <Button sx={{ padding: 0, minWidth: 0 }}
          onClick={() => handleSelectContext(contextId)}>
            <CircleIcon sx={{ 
              color: contexts.find((context) => context.guid == contextId)?.color, 
              fontSize: buttonHeight 
              }} />
          </Button>
        </Box>
        ))}
      </Box>
    </Box>

      
    
  )
}

export default ContextsButton;
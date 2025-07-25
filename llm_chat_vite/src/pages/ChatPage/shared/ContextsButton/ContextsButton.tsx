
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, IconButton } from "@mui/material";
import { useState } from "react";
import { alpha, lighten, useTheme } from '@mui/material/styles';
import { useContextController } from '../../../../controllers/ContextController';
import { useSessionController } from '../../../../controllers/SessionController';

const ContextsButton = ({historySessionId, forChatInputBox} : 
  {
    historySessionId : string
    forChatInputBox? : boolean
    children?: React.ReactNode;
  }
) =>
{
  const contextController = useContextController()
  const sessionController = useSessionController()

  const currentContextId = contextController.getCurrentContextId()

  const historySession = sessionController.getSession(historySessionId);

  const reorderedContextIds = forChatInputBox 
    ? [
        currentContextId,
        ...historySession.contextIds.filter((cguid) => cguid !== currentContextId),
      ]
    : [...historySession.contextIds];

  const theme = useTheme();
  const buttonHeight = theme.customSizes.buttonHeight
  const allCirclesWidth = "40px"

  const overlapOffset = 5;
  const [isHovering, setIsHovering] = useState(false);

  const handleAddContext = (contextId: string) => {
    if(contextController.isContextIdInCurrentSession(contextId)){
      contextController.selectContext(contextId)
    }
    else{
      contextController.addExistingContext(contextId)
    }
  }

  const handleRemoveContext = (contextId: string) => {
    if(contextController.isContextIdInCurrentSession(contextId)){
      sessionController.removeContextFromSession(contextId)
    }
  }

  return(
    <Box
      //overflow={"visible"}
      display={"flex"}
      flexDirection={"row"}
      sx={{
        position: "relative",
        height: buttonHeight,
        width: allCirclesWidth,
        alignItems: 'center',
        boxSizing: 'content-box'
      }}
    >
      <Box
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        sx={{
          alignItems: "center",
          height: "100%",
          width: "100%",
          overflow: "visible", 
          //border: "1px solid black",
          boxSizing: 'content-box'
        }}
      >
        {/* the background component*/}
        {
          reorderedContextIds.length > 1 &&
         <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: isHovering ? `${reorderedContextIds.length * (buttonHeight)}px` : allCirclesWidth, 
              height: "100%",
              backgroundColor: `${alpha(contextController.getCurrentContext().color, 0.2)}`,
              borderRadius: "12px",
              //border: "1px solid blue",
              boxSizing: 'content-box',
              zIndex: 1,
              //visibility: isHovering ? "visible" : "hidden", //now changing the width to 0 instead
              opacity: isHovering ? 1 : 0,
              transition: isHovering ?
              "opacity 0.3s ease, width 0.3s ease"
              :"opacity 0.3s ease, width 0.3s ease" , //not sure about this one
            }}
          />
        }
          {/* the listed contexts with buttons */}
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
            left: `${index * (isHovering ? buttonHeight + 4 : overlapOffset)}px`, // spread if hovering
            zIndex: reorderedContextIds.length - index,
            opacity: (isHovering || index < 3) ? 1 : 0,
            transition: isHovering ?
              "left 0.3s ease, opacity 0.3s ease, width 0.3s ease"
              :"left 0.3s ease, opacity 0.8s ease, width 0.3s ease",
            // boxSizing: "border-box",
            // border: "3px solid purple"
          }}
        >
          <Box sx={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <Button
              sx={{ padding: 0, minWidth: 0, margin: 0, height:buttonHeight, width: buttonHeight }}
              onClick={() => handleAddContext(contextId)}
              disableRipple
              disableElevation
            >
              <Box
                sx={{
                  width: buttonHeight,
                  height: buttonHeight,
                  background: (() => {
                    const color = contextController.getContextColor(contextId);
                    return `linear-gradient(
                      150deg,
                      ${color} 0%, 
                      ${color} 30%,
                      ${lighten(color, 0.4)} 100%
                    )`;
                  })(),
                  borderRadius: "50%",
                }}
              />

              {historySessionId !== sessionController.getCurrentSessionId() && (
                <AddIcon
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                  }}
                />
              )}
            </Button>

            {contextController.isContextIdInCurrentSession(contextId) 
            && sessionController.getSessionContextIdsLength() > 1 
            &&(
              <IconButton
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering add handler
                  handleRemoveContext(contextId);
                }}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  padding: 0,
                  width: buttonHeight / 2,
                  height: buttonHeight / 2,
                }}
              >
                <Box
                sx={{
                  width: buttonHeight / 2,
                  height: buttonHeight / 2,
                  backgroundColor: "red",
                  borderRadius: "50%",
                }}
              />
                <RemoveIcon
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    color: "white",
                    fontSize: buttonHeight / 2,
                  }}
                />
              </IconButton>
            )}
          </Box>
        </Box>
        ))}
      </Box>
    </Box>

      
    
  )
}

export default ContextsButton;
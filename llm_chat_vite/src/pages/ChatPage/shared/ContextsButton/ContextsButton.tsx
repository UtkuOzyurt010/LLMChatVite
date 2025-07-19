import ListItem from "@mui/material/ListItem";
import type { Context } from "../../../../models/Context";
import type { Session } from "../../../../models/Session";
import CircleIcon from '@mui/icons-material/Circle';
import { Box, Button, Popover, Typography } from "@mui/material";
import { useState } from "react";


//since this is currently used in ChatInputBox as well, consider moving this to a shared folder
const ContextsButton = ({session, children} : 
  {
    session : Session
    children?: React.ReactNode;
  }
) =>
{

const overlapOffset = 5;
const [isHovering, setIsHovering] = useState(false);
const buttonHeight = "24px"
const allCirclesWidth = "36px"
    
  return(
    <Box
      //overflow={"visible"}
      display={"flex"}
      flexDirection={"row"}
      sx={{backgroundColor: "green"}}
    >
      <Box
      sx={{
        paddingLeft: "20px",
        overflow: "hidden"
      }}
      >
        <Typography noWrap={true}>
          {children}
        </Typography>
      </Box>
      <Box
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        sx={{
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
              width: isHovering ? `${session.contexts.length * 28}px` : allCirclesWidth, 
              height: "100%",
              backgroundColor: "purple",
              borderRadius: "8px",
              zIndex: 1,
              //visibility: isHovering ? "visible" : "hidden", //now changing the width to 0 instead
              opacity: isHovering ? 1 : 0,
              transition: isHovering ?
              "opacity 0.3s ease, width 0.3s ease"
              :"opacity 0.3s ease, width 0.3s ease" , //not sure about this one
            }}
          />
        {session.contexts.map((context: Context, index) => (
        <Box
          key={index}
          className="circle"
          sx={{
            //visibility: (isHovering || index < 3) ? "visible" : "hidden",
            width: (isHovering || index < 3) ? "24px" : "0px", //this is much prettier wow! :D
            position: "absolute",
            left: `${index * (isHovering ? 28 : overlapOffset)}px`, // spread if hovering
            zIndex: session.contexts.length - index,
            opacity: (isHovering || index < 3) ? 1 : 0,
            transition: isHovering ?
              "left 0.3s ease, opacity 0.3s ease, width 0.3s ease"
              :"left 0.3s ease, opacity 0.8s ease, width 0.3s ease"
          }}
        >
          <Button sx={{ padding: 0, minWidth: 0 }}>
            <CircleIcon sx={{ color: context.color, fontSize: 24 }} />
          </Button>
        </Box>
        ))}
      </Box>
    </Box>

      
    
  )
}

export default ContextsButton;
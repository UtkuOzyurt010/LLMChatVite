import ListItem from "@mui/material/ListItem";
import type { Context } from "../../../../../models/Context";
import type { Session } from "../../../../../models/Session";
import CircleIcon from '@mui/icons-material/Circle';
import { Box, Button, Popover, Typography } from "@mui/material";
import { useState } from "react";



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
    
  return(
    <Box
      overflow={"visible"}
      display={"flex"}
      flexDirection={"row"}
      sx={{backgroundColor: "green"}}
    >
      <Box
      sx={{
        paddingLeft: "20px",
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
          position: "relative",
          height: buttonHeight,
          overflow: "visible", 
        }}
      >
         <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: isHovering ? `${session.contexts.length * 28}px` : "0px", // wider than container width
              height: "100%",
              backgroundColor: "purple",
              borderRadius: "8px",
              zIndex: 1,
              //visibility: isHovering ? "visible" : "hidden", //now changing the width to 0 instead
              opacity: isHovering ? 1 : 0,
              transition: isHovering ?
              "opacity 0.3s ease, width 0.3s ease"
              :"opacity 0.8s ease, width 0.3s ease" , //not sure about this one
            }}
          />
        {session.contexts.map((context: Context, index) => (
        <Box
          key={index}
          className="circle"
          sx={{
            position: "absolute",
            left: `${index * (isHovering ? 28 : overlapOffset)}px`, // spread if hovering
            transition: "left 0.3s ease",
            zIndex: session.contexts.length - index,
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
import ListItem from "@mui/material/ListItem";
import type { Context } from "../../../../../models/Context";
import type { Session } from "../../../../../models/Session";
import CircleIcon from '@mui/icons-material/Circle';
import { Box, Button, Typography } from "@mui/material";
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
          sx={{
            position: "relative",
            zIndex: 10,
            width: `${session.contexts.length * 24}px`,
            height: "24px",
            "&:hover .circle": {
              transform: "translateX(var(--spread))",
            },
            backgroundColor: "purple",
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
        {session.contexts.map((context: Context, index) => (
          // <Box
          //   key={index}
          //   className="circle"
          //   sx={{
          //     position: "absolute",
          //     left: `${index * overlapOffset}px`,
          //     transition: "transform 0.3s",
          //     zIndex: session.contexts.length - index, // ensures leftmost is on top
          //     "--spread": `${index * 20}px`, // how much to spread out on hover
          //   }}
          // >
          
          <Box
            key={index}
            className="circle"
            sx={{
              position: "absolute",
              left: `${index * overlapOffset}px`,
              //top: "-5px",
              //transform: "translateY(-50%)", // Center vertically
              transition: "transform 0.3s",
              zIndex: session.contexts.length - index,
              "--spread": `${index * 20}px`,
            }}
          >
            
            <Button sx={{padding: "0"}}>
              <CircleIcon sx={{ color: context.color, fontSize: 24 }} />
            </Button>
            
          </Box>
        ))}
      </Box>
    </Box>

    
    // session.contexts.map((context: Context, contextIndex) => (
    //   <ListItem>
    //     <CircleIcon sx={{ color: context.color }} />
    //   </ListItem>
    // ))
  )
}

export default ContextsButton;
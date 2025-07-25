import { useState } from "react";
import { IconButton, List, styled, Box} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { ChevronRight, ChevronDown, SquarePen } from 'lucide-react';
import CustomListItem from "./CustomListItem/CustomListItem";
import { type Session} from "../../../../models/Session";
import ContextsButton from "../../shared/ContextsButton/ContextsButton";
import { useSessionController } from "../../../../controllers/SessionController";
import { useLayoutContext } from "../../../../utils/LayoutContext";

const DrawerHeader = styled(Box)(({ theme }) => ({
  
  //width: "500px",
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar   ???????????still???????????
  //...theme.mixins.toolbar,
  //justifyContent: 'flex-end',
}));


const LeftSideDrawer = ()  =>
  {
    const { collapsedWidth, drawerWidth, appBarHeight, isLeftSideDrawerCollapsed, toggleIsLeftSideDrawerCollapsed } = useLayoutContext();
    const sessionController = useSessionController()
    const [showHistory, setShowHistory] = useState<boolean>(false)
    const sessions = sessionController.getAllSessions()

    const handleNewSession = () => {
      sessionController.addNewSession()
    }

    const handleSelectSession = (session : Session) => {
      sessionController.selectSession(session)
    }

  return(
    
    <Drawer
      elevation={0}
      sx={{
        boxShadow: "none",
        borderRight: 'none',
        overflow: "visible",
        width: isLeftSideDrawerCollapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        transition: (theme) =>
          theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
          overflow: "visible",
          boxShadow: "none",
          border: "none",
          backgroundColor: "#f9f9f9",
          width: isLeftSideDrawerCollapsed ? collapsedWidth : drawerWidth,
          boxSizing: 'border-box',
          transition: (theme) =>
            theme.transitions.create('width', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.leavingScreen,
          }),
        },
      }}
      variant="persistent"
      anchor="left"
      open={true}
    >
      <DrawerHeader
        sx={{
          height: appBarHeight,
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleIsLeftSideDrawerCollapsed}
          sx={[
            {
              minHeight: "0",
              position: "absolute",
              right: "0",
              mr: 2,
            },
            
          ]}
        >
          <MenuIcon sx={{
            minHeight: "0"
          //color:"black"
          }}/>
        </IconButton>
      </DrawerHeader>
      {<List sx={{
        overflow: "visible",}} >
          <CustomListItem 
            key={"New Chat"} 
            icon={<SquarePen></SquarePen>}
            onClick={handleNewSession}
          >
            New Chat
          </CustomListItem>
          <CustomListItem 
            key={"History"} 
            icon={showHistory ? <ChevronDown/> : <ChevronRight/>} 
            onClick={() => 
                {
                  setShowHistory(!showHistory)
                  if(isLeftSideDrawerCollapsed && showHistory) setShowHistory(false)
                  else if(isLeftSideDrawerCollapsed) toggleIsLeftSideDrawerCollapsed()
                }
              }
          >
            History
          </CustomListItem >
          {showHistory && <List key={"SessionsList"} sx={{padding: "0"}}>
            {sessions.map((session: Session, sessionIndex) => (
              <Box
                key={`session: ${sessionIndex}`}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    flexShrink: 1,
                    minWidth: 0 //this one allows child Typography to shrink!
                  }}
                >
                  <CustomListItem
                    onClick={() => handleSelectSession(session)}
                  >
                    {session.summary}
                  </CustomListItem>
                </Box>
                <Box 
                  sx={{marginRight: "12px", marginleft: "auto",}}
                >
                  <ContextsButton 
                    historySessionId={session.guid}
                  >
                  </ContextsButton>
                </Box>
              </Box>
            ))}
          </List>}
      </List>}
     
    </Drawer>
    )
  }

export default LeftSideDrawer;


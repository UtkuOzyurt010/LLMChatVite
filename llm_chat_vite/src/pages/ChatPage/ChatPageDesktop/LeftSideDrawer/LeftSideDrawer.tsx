import { useState } from "react";
import { IconButton, Divider, List, styled, useTheme, Box, Button} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { ChevronRight, ChevronDown, SquarePen } from 'lucide-react';
import CustomListItem from "./CustomListItem/CustomListItem";
import { type Session} from "../../../../models/Session";
import ContextsButton from "../../shared/ChatInputBox/ContextsButton/ContextsButton";
import { useSessionController } from "../../../../controllers/SessionController";

const DrawerHeader = styled('div')(({ theme }) => ({
  
  //width: "500px",
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar   ???????????still???????????
  ...theme.mixins.toolbar,
  //justifyContent: 'flex-end',
}));


const LeftSideDrawer = ({
  collapsed,
  collapsedWidth,
  drawerWidth,
  toggleDrawerCollapse,
}: {
  collapsed: boolean;
  collapsedWidth: number;
  drawerWidth: number;
  toggleDrawerCollapse: () => void;
  //contextIds: string[];
})  =>
  {
    const theme = useTheme()
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
      sx={{
        
        overflow: "visible",
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        transition: (theme) =>
          theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
          overflow: "visible",
          width: collapsed ? collapsedWidth : drawerWidth,
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
        sx={{backgroundColor: "yellow"}}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawerCollapse}
          edge="start"
          
          sx={[
            {
              position: "absolute",
              right: "0",
              mr: 2,
            },
            
          ]}
        >
          <MenuIcon sx={{
          //color:"black"
          }}/>
        </IconButton>
      </DrawerHeader>
      <Divider 
      //sx={{backgroundColor: "green"}} 
      />
      {<List sx={{backgroundColor: "orange" , overflow: "visible",}} >
          <CustomListItem 
            key={"New Chat"} 
            collapsed={collapsed} 
            collapsedWidth={collapsedWidth}
            icon={<SquarePen></SquarePen>}
            onClick={handleNewSession}
          >
            New Chat
          </CustomListItem>
          <CustomListItem 
            key={"History"} 
            collapsed={collapsed} 
            collapsedWidth={collapsedWidth} 
            icon={showHistory ? <ChevronDown/> : <ChevronRight/>} 
            onClick={() => 
                {
                  setShowHistory(!showHistory)
                  if(collapsed) toggleDrawerCollapse()
                }
              }
          >
            History
          </CustomListItem >
          {showHistory && <List key={"SessionsList"} sx={{backgroundColor: "red", padding: "0" }}>
            {sessions.map((session: Session, sessionIndex) => (
              <Box
                key={`session: ${sessionIndex}`}
                sx={{
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <CustomListItem
                collapsed={collapsed} 
                collapsedWidth={collapsedWidth}
                onClick={() => handleSelectSession(session)}
                >
                  {session.summary}
                </CustomListItem>
                <ContextsButton 
                  historySessionId={session.guid}
                >
                </ContextsButton>
              </Box>
            ))}
          </List>}
      </List>}
     
    </Drawer>
    )
  }

export default LeftSideDrawer;


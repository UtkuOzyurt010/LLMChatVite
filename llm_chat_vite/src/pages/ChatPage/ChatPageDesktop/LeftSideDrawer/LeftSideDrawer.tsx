import { useState } from "react";
import { IconButton, Divider, List, styled, useTheme} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { ChevronRight, SquarePen } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import CustomListItem from "./CustomListItem/CustomListItem";
import { type Session } from "../../../../models/Session";
import ContextsButton from "../../shared/ContextsButton/ContextsButton";
import { useAppContext } from "../../../../utils/AppContext";

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
  sessions: Session[];
  //contextIds: string[];
})  =>
  {
    const theme = useTheme();
    const [showHistory, setShowHistory] = useState<boolean>(false)
    const {sessions} = useAppContext(); 

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
          <CustomListItem key={"New Chat"} collapsed={collapsed} collapsedWidth={collapsedWidth} icon={<SquarePen></SquarePen>} text="New Chat"></CustomListItem>
          <CustomListItem 
            key={"History"} 
            collapsed={collapsed} 
            collapsedWidth={collapsedWidth} 
            icon={showHistory ? <ChevronDown/> : <ChevronRight/>} 
            text="History"
            onClick={() => 
                {
                  setShowHistory(!showHistory)
                  if(collapsed) toggleDrawerCollapse()
                }
              }>
            {/* <Button onClick={() => setShowHistory(!showHistory)}></Button> */}
          </CustomListItem >
          {showHistory && <List key={"SessionsList"} sx={{backgroundColor: "red", padding: "0" }}>
            {sessions.map((session: Session, sessionIndex) => (
              <ContextsButton 
                key={`session: ${sessionIndex}`}
                historySessionId={session.guid}
              >
                {session.summary}
              </ContextsButton>
            ))}
          </List>}
      </List>}
     
    </Drawer>
    )
  }

export default LeftSideDrawer;

function UseState(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
}

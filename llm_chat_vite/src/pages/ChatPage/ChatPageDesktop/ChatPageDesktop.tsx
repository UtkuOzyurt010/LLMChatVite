import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LeftSideDrawer from './LeftSideDrawer/LeftSideDrawer';
import type { Session } from '../../../models/Session';
import type { Context } from '../../../models/Context';
import ChatDisplay from '../shared/ChatDisplay/ChatDisplay';
import { height } from '@fortawesome/free-solid-svg-icons/faBars';
import useLocalStorage from '../../../utils/useLocalStorage';

const drawerWidth = 260;
const collapsedWidth = 70;
const appBarHeight = 60;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  collapsed?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'collapsed',
})<AppBarProps>(({ theme, open, collapsed }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    //height: `calc(100% - ${appBarHeight}px)`,
    width: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)`,
    marginLeft: `${collapsed ? collapsedWidth : drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



export default function ChatPageDesktop({sessions, contexts} :
  {
    sessions: Session[]
    contexts: Context[]
  }
) {
  const theme = useTheme();
  const [collapsed, setCollapsed] = React.useState(true);
  //const [currentSession, setCurrentSession] = useLocalStorage<Session | null>("currentSession", null)

  const handleDrawerCollapse = () => {
    setCollapsed(true);
  };

  const handleDrawerExpand = () => {
    setCollapsed(false);
  };

  const toggleDrawerCollapse = () => {
    setCollapsed(!collapsed);
  }

  return (
    <Box
    //display={"flex"}
    //flexDirection={"column"}
    sx={{
      height: "100vh",
      width: "100vw"
    }}
    >
      <LeftSideDrawer 
      collapsed={collapsed} 
      collapsedWidth={collapsedWidth} 
      drawerWidth={drawerWidth} 
      toggleDrawerCollapse={toggleDrawerCollapse}
      sessions={sessions}
      contexts={contexts}
      >
      </LeftSideDrawer>
      {/* <Box sx={{ 
        height: "100%",
      }}> */}
        <CssBaseline />

        <AppBar 
          position="relative"
           
          open={true}
          collapsed={collapsed}
          sx={{
              height: `${appBarHeight}px`,
              backgroundColor: "green"
            }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Green-L Writing
            </Typography>
          </Toolbar>
        </AppBar>
      
        <Box
        //flex={1} //calculating height once using appBarHeight might be more performant
           sx={{ 
            height: `calc(100vh - ${appBarHeight}px)`,
            //height: "50vh",
            width: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)`,
            marginLeft: `${collapsed ? collapsedWidth : drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: "border-box",
            //border: "4px solid red",
            
           }}
        >
          <ChatDisplay open={true} collapsed={collapsed} drawerwidth={drawerWidth} collapsedwidth={collapsedWidth}></ChatDisplay>
        </Box>
      {/* </Box> */}
    {/* </Box> */}
    </Box>
  );
}
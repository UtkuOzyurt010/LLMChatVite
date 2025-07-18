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

const drawerWidth = 260;
const collapsedWidth = 70;

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
    width: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)`,
    marginLeft: `${collapsed ? collapsedWidth : drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



export default function ChatPageDesktop({sessions, contexts, currentSession} :
  {
    sessions: Session[]
    contexts: Context[]
    currentSession: Session
  }
) {
  const theme = useTheme();
  const [collapsed, setCollapsed] = React.useState(true);

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
    <Box sx={{ 
      //display: 'flex',
        //width: drawerWidth
     }}>
      <CssBaseline />
      <AppBar 
        position="relative" 
        open={true}
        collapsed={collapsed}
        sx={{
                backgroundColor: "green"
            }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Green-L Writing
          </Typography>
        </Toolbar>

      </AppBar>
      <LeftSideDrawer 
      collapsed={collapsed} 
      collapsedWidth={collapsedWidth} 
      drawerWidth={drawerWidth} 
      toggleDrawerCollapse={toggleDrawerCollapse}
      sessions={sessions}
      contexts={contexts}
      ></LeftSideDrawer>

      <ChatDisplay open={true} collapsed={collapsed} drawerwidth={drawerWidth} collapsedwidth={collapsedWidth} currentSession={currentSession}></ChatDisplay>

    </Box>
  );
}
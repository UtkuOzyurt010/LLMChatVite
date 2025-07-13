import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { SquarePen } from 'lucide-react';
import LeftSideDrawer from './LeftSideDrawer/LeftSideDrawer';
import type { Session } from '../../../models/Session';
import type { Context } from '../../../models/Context';
import ChatHistory from '../ChatHistory/ChatHistory';

const drawerWidth = 260;
const collapsedWidth = 70;

// const Main = styled('main', {
//   shouldForwardProp: (prop) => prop !== 'open' && prop !== 'collapsed',
// })<{
//   open?: boolean;
//   collapsed?: boolean;
// }>(({ theme, open, collapsed }) => {
//   const shift = open ? (collapsed ? collapsedWidth : drawerWidth) : 0;

//   return {
//     position: 'relative',
//     transform: `translateX(${shift}px)`,
//     transition: theme.transitions.create('transform', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   };
// });

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
  //const [open, setOpen] = React.useState(true);
  const [collapsed, setCollapsed] = React.useState(true);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

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

      <ChatHistory open={true} collapsed={collapsed} drawerwidth={drawerWidth} collapsedwidth={collapsedWidth} currentSession={currentSession}></ChatHistory>

    </Box>
  );
}
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LeftSideDrawer from './LeftSideDrawer/LeftSideDrawer';
import ChatDisplay from '../shared/ChatDisplay/ChatDisplay';

import { useLayoutContext } from '../../../utils/LayoutContext';

export const AppBar = ({children} : {children : React.ReactNode}) => {
  const { collapsedWidth, drawerWidth, appBarHeight, isLeftSideDrawerCollapsed } = useLayoutContext();
  const theme = useTheme()

  return (
    <MuiAppBar
      elevation={0}
      sx = {{
        height: appBarHeight,
          backgroundColor: "white",
          color: "black",
          //border: "2px solid brown",
          width: `calc(100% - ${isLeftSideDrawerCollapsed ? collapsedWidth : drawerWidth}px)`,
          marginLeft: `${isLeftSideDrawerCollapsed ? collapsedWidth : drawerWidth}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
          }),
      }}
    >
      {children}
    </MuiAppBar>
  );
}

export default function ChatPageDesktop() 
{
  const theme = useTheme();
  const { collapsedWidth, drawerWidth, appBarHeight, isLeftSideDrawerCollapsed } = useLayoutContext();

  return (

    
    <Box
    sx={{
      //height: "100vh",
      //width: "100vw"
    }}
    >
      
      <LeftSideDrawer >
      </LeftSideDrawer>

      
      <CssBaseline />
      <AppBar >
        <Toolbar >
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
          width: `calc(100% - ${isLeftSideDrawerCollapsed ? collapsedWidth : drawerWidth}px)`,
          marginLeft: `${isLeftSideDrawerCollapsed ? collapsedWidth : drawerWidth}px`,
          marginTop: `${appBarHeight}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          boxSizing: "border-box",
          overflowY: 'auto',
          //border: "4px solid red",
          
          }}
      >
        <ChatDisplay></ChatDisplay>
      </Box>
      {/* </Box> */}
    {/* </Box> */}
    </Box>
  );
}
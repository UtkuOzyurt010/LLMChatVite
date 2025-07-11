import { IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, Typography, styled, useTheme } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import CircleIcon from '@mui/icons-material/Circle';
import Drawer from '@mui/material/Drawer';

import { SquarePen } from 'lucide-react';

import CustomListItem from "./CustomListItem/CustomListItem";
import { Session } from "../../../../models/Session";
import { Context } from "../../../../models/Context";

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
  sessions,
  contexts

}: {
  collapsed: boolean;
  collapsedWidth: number;
  drawerWidth: number;
  toggleDrawerCollapse: () => void;
  sessions: Session[];
  contexts: Context[];
})  =>
  {
    const theme = useTheme();
  return(
    
    <Drawer
      sx={{
        overflow: "clip",
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        transition: (theme) =>
          theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
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
      {<List sx={{backgroundColor: "orange" }}>
          <CustomListItem collapsed={collapsed} collapsedWidth={collapsedWidth} icon={<SquarePen></SquarePen>} text="New Chat"></CustomListItem>
          <CustomListItem collapsed={collapsed} collapsedWidth={collapsedWidth} icon={<SquarePen></SquarePen>} text="History">
            <List>
              {sessions.map((session: Session, sessionIndex) => (
                session.contexts.map((context: Context, contextIndex) => (
                  <CustomListItem
                    key={`${sessionIndex}-${contextIndex}`} // unique key combining both indexes
                    collapsed={collapsed}
                    collapsedWidth={collapsedWidth}
                  >
                    <CircleIcon sx={{ color: context.color }} />
                  </CustomListItem>
                ))
              ))}
            </List>
          </CustomListItem>


        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                  minWidth: "0",
                  width: collapsedWidth / 2, //cant use 100% because it's expandable, this somehow keeps it in place
                  minHeight: "0"
                }}
              >
                {index % 2 === 0 ? <InboxIcon/> : <MailIcon />}
              </ListItemIcon>
              {!collapsed &&
              <Typography
                noWrap
                sx={{
                  paddingLeft: '20px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: 1,
                  margin: 0,
                  fontSize: '1rem',
                  flexGrow: 1,
                }}
              >
                {text}
              </Typography>}
            </ListItemButton>
          </ListItem>
        ))} */}
        
      </List>}
      {/* <Divider />
      {<List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  minHeight: "0",
                  justifyContent: "center",
                  alignItems: 'center',
                  minWidth: "0",
                  width: collapsedWidth / 2, //cant use 100% because it's expandable, this somehow keeps it in place
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              {!collapsed &&
              <Typography
                noWrap
                sx={{
                  paddingLeft: '20px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: 1,
                  margin: 0,
                  fontSize: '1rem',
                  flexGrow: 1,
                }}
              >
                {text}
              </Typography>}
            </ListItemButton>
          </ListItem>
        ))}
      </List>} */}
    </Drawer>
    )
  }

export default LeftSideDrawer;
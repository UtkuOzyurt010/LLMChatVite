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

const drawerWidth = 180;
const collapsedWidth = 70;

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'collapsed',
})<{
  open?: boolean;
  collapsed?: boolean;
}>(({ theme, open, collapsed }) => {
  const shift = open ? (collapsed ? collapsedWidth : drawerWidth) : 0;

  return {
    position: 'relative',
    transform: `translateX(${shift}px)`,
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  };
});

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

const DrawerHeader = styled('div')(({ theme }) => ({
  
  width: "500px",
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  //justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [collapsed, setCollapsed] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
        position="fixed" 
        open={open}
        collapsed={collapsed}
        sx={{
                // width: "100%",
                // left: "0",
                backgroundColor: "green"
            }}
      >
        <Toolbar
          // sx={(theme) => ({
          //   width: '100%',
          //   transition: theme.transitions.create(['margin', 'padding-left'], {
          //     easing: theme.transitions.easing.sharp,
          //     duration: theme.transitions.duration.leavingScreen,
          //   }),
          //   //paddingLeft: collapsed ? theme.spacing(3) : theme.spacing(6),
          // })}
        >
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>

      </AppBar>
      <Drawer
        sx={{
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
        open={open}
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
            }} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        { <List sx={{backgroundColor: "orange" }}>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon
                sx={{
                  justifyContent: "center",
                  minWidth: "0",
                  width: collapsedWidth / 2, //cant use 100% because it's expandable, this somehow keeps it in place
                  minHeight: "0"
                }}>
                  {index % 2 === 0 ? 
                  <InboxIcon/> : <MailIcon />}
                </ListItemIcon>
                {!collapsed &&  <Typography
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
        </List>}
        <Divider />
        { <List>
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
                {!collapsed &&  <Typography
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
        </List>}
      </Drawer>
      <Main open={open} collapsed={collapsed}>
        <DrawerHeader />
        <Typography sx={{ marginBottom: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Main>
    </Box>
  );
}
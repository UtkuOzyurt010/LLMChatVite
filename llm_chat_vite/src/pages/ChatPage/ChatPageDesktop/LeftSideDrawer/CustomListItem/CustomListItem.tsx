//import { InboxIcon, MailIcon, SquarePen } from 'lucide-react';
import { ListItemIcon, ListItemButton, Typography, ListItem } from '@mui/material';
//import { icon, text } from '@fortawesome/fontawesome-svg-core';

const CustomListItem = ({collapsed, collapsedWidth, icon, text, onClick, children} : 
  {
    collapsed: boolean, 
    collapsedWidth: number, 
    icon?: React.ReactNode
    text?: string
    onClick?: () => void,
    children?: React.ReactNode;
  }) => 
{
return(
  <ListItem key="newChat" disablePadding>
    <ListItemButton onClick={onClick}>
      <ListItemIcon
        sx={{
          justifyContent: "center",
          minWidth: "0",
          width: collapsedWidth / 2, //cant use 100% because it's expandable, this somehow keeps it in place
          minHeight: "0"
        }}
      >
        {icon}
      </ListItemIcon>
      {!collapsed &&
      <Typography
        noWrap
        sx={{
          paddingLeft: '20px',
          //overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: 1,
          margin: 0,
          fontSize: '1rem',
          flexGrow: 1,
        }}
      >
        {text}
      </Typography>}
      {children}
    </ListItemButton>
  </ListItem>
  )
}

export default CustomListItem;

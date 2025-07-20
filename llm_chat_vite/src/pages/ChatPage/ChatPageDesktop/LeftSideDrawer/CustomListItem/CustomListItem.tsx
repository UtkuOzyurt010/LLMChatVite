import { ListItemIcon, ListItemButton, Typography, ListItem } from '@mui/material';

const CustomListItem = ({collapsed, collapsedWidth, icon, onClick, children} : 
  {
    collapsed: boolean, 
    collapsedWidth: number, 
    icon?: React.ReactNode
    onClick?: () => void,
    children?: React.ReactNode;
  }) => 
{
return(
  <ListItem key="newChat" disablePadding>
    <ListItemButton onClick={onClick}>
      {icon && <ListItemIcon
        sx={{
          justifyContent: "center",
          minWidth: "0",
          width: collapsedWidth / 2, //cant use 100% because it's expandable, this somehow keeps it in place
          minHeight: "0"
        }}
      >
        {icon}
      </ListItemIcon>}
      {!collapsed &&
      <Typography
        noWrap
        sx={{
          paddingLeft: icon ? '20px' : "0px",
          //overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: 1,
          margin: 0,
          fontSize: '1rem',
          flexGrow: 1,
        }}
      >
        {children}
      </Typography>}
      {/* {children} */}
    </ListItemButton>
  </ListItem>
  )
}

export default CustomListItem;

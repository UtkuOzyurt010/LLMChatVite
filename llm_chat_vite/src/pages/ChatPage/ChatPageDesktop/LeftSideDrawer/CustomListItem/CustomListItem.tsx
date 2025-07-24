import { ListItemIcon, ListItemButton, Typography, ListItem } from '@mui/material';
import { useLayoutContext } from '../../../../../utils/LayoutContext';

const CustomListItem = ({icon, onClick, children} : 
  {
    icon?: React.ReactNode
    onClick?: () => void,
    children?: React.ReactNode;
  }) => 
{

  const {isLeftSideDrawerCollapsed, collapsedWidth} = useLayoutContext()
return(
  <ListItem disablePadding>
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
      {!isLeftSideDrawerCollapsed &&
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

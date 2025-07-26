import { Box, useTheme,  } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';

export const RevealSeattingsButton = () => 
{
  const theme = useTheme();
  const buttonHeight = theme.customSizes.buttonHeight
  return(
    <Box
      key="settings-icon"
      sx={{position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center"}}
    >
      <Box
        sx={{
          width: buttonHeight,
          height: buttonHeight,
          backgroundColor: "green",
          borderRadius: "50%",
        }}
      />
      <SettingsIcon
        key="settings-icon"
        sx={{
          //zIndex: 10,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
        }}
      />
    </Box>
  )
}
import { Box } from "@mui/material"
import { CompressionButton } from "./CompressionButton/CompressionButton"
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from '@mui/material/styles';
import { BlackListButton } from "./BlackListButton/BlackListButton";
import type { Dispatch, SetStateAction } from "react";

export const ChatInputSettings = ({text, setText} : {text : string, setText : Dispatch<SetStateAction<string>>}) => {
  const buttons: any[] = []
  const theme = useTheme()
  const buttonHeight = theme.customSizes.buttonHeight

  buttons.push(
    <Box
      sx={{position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center"}}
    >
      <Box
        sx={{
          width: buttonHeight,
          height: buttonHeight,
          backgroundColor: "pink",
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

  buttons.push(<CompressionButton key="compression-button" />)
  buttons.push(<BlackListButton text={text} setText={setText} key="blacklist-button" />)

  return (
    <Box sx={{ 
      display: "flex",
      flexDirection: "row",
      position: "relative"
      }}>
      {buttons}
    </Box>
  )
}

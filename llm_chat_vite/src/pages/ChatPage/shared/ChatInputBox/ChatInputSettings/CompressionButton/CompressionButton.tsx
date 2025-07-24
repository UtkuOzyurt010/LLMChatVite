import { Box, Button, useTheme } from "@mui/material";

import CompressIcon from '@mui/icons-material/Compress';

export const CompressionButton = () => {
  const theme = useTheme()
  const buttonHeight = theme.customSizes.buttonHeight
    return(
      <Box>
        <Button
          sx={{ padding: 0, minWidth: 0, margin: 0, 
            height:buttonHeight, 
            width: buttonHeight }}
          // onClick={() => handleAddContext(contextId)}
          disableRipple
          disableElevation
        >
          <Box
            sx={{
              width: buttonHeight,
              height: buttonHeight,
              backgroundColor: "green",
              borderRadius: "50%",
            }}
          />
          <CompressIcon
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              //fontSize: buttonHeightn,
            }}
          />
        </Button>
      </Box>
    )
}
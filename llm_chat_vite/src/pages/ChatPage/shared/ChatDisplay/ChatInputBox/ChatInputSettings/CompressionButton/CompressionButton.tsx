import { Box, Button, useTheme } from "@mui/material";

import CompressIcon from '@mui/icons-material/Compress';
import type { Dispatch, SetStateAction } from "react";

export const CompressionButton = ({text, setText} : {text : string, setText : Dispatch<SetStateAction<string>>}) => {
  const theme = useTheme()
  const buttonHeight = theme.customSizes.buttonHeight

  const compressPrompt = async (prompt: string, targetTokens: number = Math.floor(prompt.length/20)) => {
    const response = await fetch("http://127.0.0.1:8000/compress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, target_tokens: targetTokens }),
    });

    const data = await response.json();
    return data.compressed_prompt.compressed_prompt
  }
  
  const handleClick = async () => {
    setText(await compressPrompt(text))
  }
    return(
      <Box>
        <Button
          sx={{ padding: 0, minWidth: 0, margin: 0, 
            height:buttonHeight, 
            width: buttonHeight }}
          onClick={handleClick}
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
            }}
          />
        </Button>
      </Box>
    )
}
import { Box, Button, TextField, Paper, useTheme, Avatar } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import ArrowUpward from '@mui/icons-material/ArrowUpward'
import { lighten, alpha } from "@mui/material";
import ContextsButton from "./ContextsButton/ContextsButton";
import AddContextButton from "./ContextsButton/AddcontextButton/AddContextbutton";
import { useContextController } from "../../../../controllers/ContextController";
import { useSessionController } from "../../../../controllers/SessionController";
import { createChatEntry } from "../../../../models/ChatEntry";
import { useState } from "react";
import { CompressionButton } from "./ChatInputSettings/CompressionButton/CompressionButton";
import { ChatInputSettings } from "./ChatInputSettings/ChatInputSettings";


export default function ChatInputBox({width} : {width: string}) {
  const theme = useTheme()
  const contextController = useContextController()
  const sessionController = useSessionController()
  const buttonHeight = theme.customSizes.buttonHeight
  const buttonHeightn = theme.customSizes.buttonHeightn

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent | React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    contextController.addChatEntry(createChatEntry(inputValue, contextController.getCurrentContextId(), "prompt"));
    const responseText = sessionController.createResponse();
    contextController.addChatEntry(createChatEntry(responseText, contextController.getCurrentContextId(), "response"));
    setInputValue(""); // clear input if desired
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: width,
        p: 2,
        pb: 1,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        borderRadius: 8,
      }}
    >
      {/* Input */}
      <Box 
        component="form" 
        noValidate 
        autoComplete="off" 
        sx={{ 
          width: "100%",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="prompt"
          variant="outlined"
          
          value={inputValue}
          placeholder="Ask me anything!"
          hiddenLabel
          fullWidth
          multiline
          onKeyDown={(e) => {
            if(e.key == "Enter") 
              {
                e.preventDefault()
                handleSubmit(e)
              }}}
          maxRows={6}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': { //remove outline... there's probably a better way not using textField at all, but I like multiline convenience
              border: 'none',
            },
            background: 
              `linear-gradient(
                    170deg,
                    ${lighten(contextController.getCurrentContext().color, 0.6)}0%, 
                    ${lighten(contextController.getCurrentContext().color, 0.7)}20%,
                    ${lighten(contextController.getCurrentContext().color, 0.7)}100%
                    )`,
            // bgcolor: `${alpha(contextController.getCurrentContext().color, 0.2)}`,
            borderRadius: 1,
          }}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Box>

      {/* Bottom Button Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 1,
          pb: 0,
          position: "relative",
          //height: buttonHeight
        }}
      >
        {/* Left group: AddContextButton + ContextsButton (should rename to ContextsList?) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <Box sx={{mr: "4px"}}>
            <AddContextButton ></AddContextButton>
          </Box>
          <Box sx={{}}>
            <ContextsButton 
              forChatInputBox={true}
              historySessionId={sessionController.getCurrentSessionId()} 
            />
          </Box>
        </Box>
        
        {/* Right Group, settings + Send Prompt button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row"
          }}
          >
          <Box sx={{mr: "4px"}}>
            <ChatInputSettings text={inputValue} setText={setInputValue}></ChatInputSettings>
          </Box>

          <Button
            sx={{ 
              p: 0, 
              minWidth: "auto",
              //border: "2px solid black"
            }}
            aria-label="Current context color"
            onClick={handleSubmit}
          >
            <Box
              sx={{
                width: buttonHeight,
                height: buttonHeight,
                backgroundColor: contextController.getContextColor(contextController.getCurrentContextId()),
                borderRadius: "50%",
              }}
            />
            <ArrowUpward
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                //fontSize: buttonHeightn, //this just looks to big, default value looks good but remember it's unset
              }}
            />
          </Button>
        </Box>
        
        
      </Box>
      
    </Paper>
  );
}

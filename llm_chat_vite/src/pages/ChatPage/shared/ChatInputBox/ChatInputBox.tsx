import { Box, Button, TextField, Paper, useTheme } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { lighten, alpha } from "@mui/material";
import ContextsButton from "./ContextsButton/ContextsButton";
import AddContextButton from "./ContextsButton/AddcontextButton/AddContextbutton";
import { useContextController } from "../../../../controllers/ContextController";
import { useSessionController } from "../../../../controllers/SessionController";
import { createChatEntry } from "../../../../models/ChatEntry";
import { useState } from "react";


export default function ChatInputBox({width} : {width: string}) {
  const theme = useTheme()
  const contextController = useContextController()
  const sessionController = useSessionController()
  const buttonHeight = theme.customSizes.buttonHeight

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
        //gap: 2,
        boxSizing: "border-box",
        borderRadius: 8,
      }}
    >
      {/* Input */}
      <Box 
      component="form" 
      noValidate 
      autoComplete="off" 
      sx={{ width: "100%" }}
      onSubmit={handleSubmit}
    >
        <TextField
          required
          id="prompt"
          variant="filled"
          placeholder="Ask me anything!"
          hiddenLabel
          fullWidth
          sx={{
            //bgcolor: "background.paper",
            bgcolor: `${alpha(contextController.getCurrentContext().color, 0.2)}`,
            //opacity: "20%",
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
        }}
      >
        {/* Left Circle Button */}
        <Button
          sx={{ p: 0, minWidth: "auto",
            //border: "2px solid black"
          }}
          aria-label="Current context color"
        >
          <CircleIcon
            sx={{
              color: contextController.getContextColor(contextController.getCurrentContextId()) || "grey",
              fontSize: buttonHeight,
            }}
          />
        </Button>

        {/* Right ContextsButton */}
        <ContextsButton 
        forChatInputBox={true}
        historySessionId={sessionController.getCurrentSessionId()} />

        <AddContextButton></AddContextButton>
      </Box>
    </Paper>
  );
}

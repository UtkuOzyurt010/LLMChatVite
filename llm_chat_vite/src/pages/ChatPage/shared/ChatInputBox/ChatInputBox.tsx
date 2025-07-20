import { Box, Button, TextField, Paper, useTheme } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { useAppContext } from "../../../../utils/AppContext";
import ContextsButton from "./ContextsButton/ContextsButton";
import AddContextButton from "./ContextsButton/AddcontextButton/AddContextbutton";


export default function ChatInputBox() {
  const { contexts, currentContextId } = useAppContext();
  const theme = useTheme()
  const buttonHeight = theme.customSizes.buttonHeight

  return (
    <Paper
      elevation={3}
      sx={{
        width: 800,
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
      <Box component="form" noValidate autoComplete="off" sx={{ width: "100%" }}>
        <TextField
          required
          id="prompt"
          variant="filled"
          placeholder="Ask me anything!"
          hiddenLabel
          fullWidth
          sx={{
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
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
              color: contexts.find((c) => c.guid === currentContextId)?.color || "grey",
              fontSize: buttonHeight,
            }}
          />
        </Button>

        {/* Right ContextsButton */}
        <ContextsButton forChatInputBox={true} />

        <AddContextButton></AddContextButton>
      </Box>
    </Paper>
  );
}

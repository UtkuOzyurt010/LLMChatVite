import { Box, Button, TextField, Paper } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { useAppContext } from "../../../../utils/AppContext";
import ContextsButton from "../ContextsButton/ContextsButton";

export default function ChatInputBox() {
  const { contexts, currentContextId } = useAppContext();

  return (
    <Paper
      elevation={3}
      sx={{
        width: 500,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxSizing: "border-box",
        borderRadius: 2,
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
          position: "relative",
        }}
      >
        {/* Left Circle Button */}
        <Button
          sx={{ p: 0, minWidth: "auto" }}
          aria-label="Current context color"
        >
          <CircleIcon
            sx={{
              color: contexts.find((c) => c.guid === currentContextId)?.color || "grey",
              fontSize: 24,
            }}
          />
        </Button>

        {/* Right ContextsButton */}
        <ContextsButton forChatInputBox={true} />
      </Box>
    </Paper>
  );
}

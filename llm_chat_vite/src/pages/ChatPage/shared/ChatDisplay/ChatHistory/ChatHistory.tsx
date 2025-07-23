import Box from "@mui/material/Box"
import type { ChatEntry } from "../../../../../models/ChatEntry"
import ChatInputBox from "../../ChatInputBox/ChatInputBox"
import { useContextController } from "../../../../../controllers/ContextController"

const ChatHistory = ({entries, focusedField, setFocusedField} 
  : 
  {
    entries : ChatEntry[]
    focusedField: string
    setFocusedField: (focusedField: string) => void
  }) =>
{
  const contextController = useContextController()

  return(
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        height: "100vh",
        overflowY: "auto",
        bgcolor: "#f5f5f5"
      }}
    >
      {entries.map((value: ChatEntry, index: number) => (
        <Box
          key={`chatEntry-${index}`}
          sx={{
            display: "flex",
            justifyContent: value.type === "prompt" ? "flex-end" : "flex-start",
          }}
        >
          <Box
            sx={{
              maxWidth: "70%",
              px: 2,
              py: 1,
              bgcolor: contextController.getContextColor(value.contextGuId),
              color: 'x000',
              borderRadius: 2,
              borderTopLeftRadius: value.type === "prompt" ? 16 : 0,
              borderTopRightRadius: value.type === "prompt" ? 0 : 16,
              boxShadow: 1,
            }}
          >
            {value.text}
          </Box>
        </Box>
      ))}

      {/* Chat Input at the bottom */}
      <Box sx={{ 
        display: "flex",
        mt: "auto", 
        pt: 2, 
        justifyContent: "center"
        }}>
        <ChatInputBox width="1200px" />
      </Box>
    </Box>

  )
}

export default ChatHistory

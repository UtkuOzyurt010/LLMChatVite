import Box from "@mui/material/Box"
import type { ChatEntry } from "../../../../../models/ChatEntry"
import ChatInputBox from "../../ChatInputBox/ChatInputBox"
import { useContextController } from "../../../../../controllers/ContextController"
import { useLayoutContext } from "../../../../../utils/LayoutContext"
import { useTheme } from "@mui/material"

const ChatHistory = ({
  entries,
  focusedField,
  setFocusedField
}: {
  entries: ChatEntry[]
  focusedField: string
  setFocusedField: (focusedField: string) => void
}) => {

  const contextController = useContextController()
  const {isLeftSideDrawerCollapsed, collapsedWidth, drawerWidth, inputBoxHeight} = useLayoutContext()
  const theme = useTheme()

  return (
    <>
      {/* Scrollable Chat Area */}
      <Box
        sx={{
          height: `calc(100% - ${inputBoxHeight}px)`, // adjust based on input height
          width: "100%",
          overflowY: "auto",
          position: "relative",
          border: "3px solid red"
          //paddingBottom: inputBoxHeight,
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            height: "60px",
            width: "100%",
            background: "linear-gradient(to bottom, white, rgba(255,255,255,0))",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />


        {entries.map((value: ChatEntry, index: number) => (
          <Box
            key={`chatEntry-${index}`}
            sx={{
              display: "flex",
              justifyContent: value.type === "prompt" ? "flex-end" : "flex-start",
              mb: 1
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                px: 2,
                py: 1,
                bgcolor: contextController.getContextColor(value.contextGuId),
                color: '#000',
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
      </Box>

      {/* Fixed Input Box */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: `${inputBoxHeight}px`,
          bgcolor: "#fff",
          //borderTop: "1px solid #ccc",
          display: "flex",
          justifyContent: "center",
          pb: 2,
          zIndex: 10,
          marginLeft: `${isLeftSideDrawerCollapsed ? collapsedWidth : drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            border: "3px solid blue"
        }}
      >
        <ChatInputBox width="1200px" />
      </Box>
    </>
  )
}

export default ChatHistory

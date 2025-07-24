import Box from "@mui/material/Box"
import AddIcon from '@mui/icons-material/Add';
import type { ChatEntry } from "../../../../../models/ChatEntry"
import ChatInputBox from "../../ChatInputBox/ChatInputBox"
import { useContextController } from "../../../../../controllers/ContextController"
import { useLayoutContext } from "../../../../../utils/LayoutContext"
import { Button, useTheme } from "@mui/material"
import { useEffect, useRef } from "react"

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
  const scrollableRef = useRef<HTMLDivElement>(null);
  const buttonHeight = theme.customSizes.buttonHeight

  const handleAddEntryToCurrentcontext = (chatEntry : ChatEntry) =>
  {
    contextController.addChatEntry(chatEntry)
  }

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({
        top: scrollableRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [entries]);

  return (
    <>
      {/* Scrollable Chat Area */}
      <Box
        ref={scrollableRef}
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
                display: "flex",
                flexDirection: "row",
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
              {/* display text to the left of Button for prompt, and to the right for response */}
              {value.type === "prompt" && 
              <Box textAlign={"left"}>
                {value.text} 
              </Box>}
              {value.contextGuId != contextController.getCurrentContextId() && 
              <Box>
                <Button
                  onClick={() => handleAddEntryToCurrentcontext(value)}
                  sx={{
                    position: "relative",
                    //border: "1px solid purple",
                    marginLeft: value.type === "prompt" ? 2 : 0,
                    marginRight: value.type === "response" ? 2 : 0,
                    padding: 0,
                    width: buttonHeight,
                    height: buttonHeight,
                    minWidth: 0, // remove default button min width
                  }}
                >
                  <Box
                    sx={{
                      width: buttonHeight,
                      height: buttonHeight,
                      backgroundColor: contextController.getContextColor(contextController.getCurrentContextId()),
                      borderRadius: "50%",
                    }}
                  />
                  <AddIcon
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      fontSize: buttonHeight,
                    }}
                  />
                </Button>
              </Box>}
              {/* display text to the left of Button for prompt, and to the right for response */}
              {
              value.type === "response" && 
              <Box textAlign={"left"}>
                {value.text}
              </Box>
              }
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

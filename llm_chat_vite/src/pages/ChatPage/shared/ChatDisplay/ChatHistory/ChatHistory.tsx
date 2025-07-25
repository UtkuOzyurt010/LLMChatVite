import Box from "@mui/material/Box"
import AddIcon from '@mui/icons-material/Add';
import type { ChatEntry } from "../../../../../models/ChatEntry"
import ChatInputBox from "../../ChatInputBox/ChatInputBox"
import { useContextController } from "../../../../../controllers/ContextController"
import { useLayoutContext } from "../../../../../utils/LayoutContext"
import { alpha, Button, useTheme } from "@mui/material"
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
  const {isLeftSideDrawerCollapsed, collapsedWidth, drawerWidth, inputBoxHeight, inputBoxWidthWide} = useLayoutContext()
  const theme = useTheme()
  const scrollableRef = useRef<HTMLDivElement>(null);
  const buttonHeight = theme.customSizes.buttonHeight

  const handleAddEntryToCurrentcontext = (chatEntry : ChatEntry) =>
  {
    contextController.addChatEntry({...chatEntry, contextGuId: contextController.getCurrentContextId()})
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
          //border: "3px solid red",
          paddingX: `calc((100% - ${inputBoxWidthWide}px)/2)`
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
                position: "relative",
                maxWidth: "70%",
                px: 2,
                py: 1,
                //bgcolor: alpha(contextController.getContextColor(value.contextGuId), 0.2),
                background: 
                  value.type === "prompt" ?
                    `linear-gradient(
                    210deg,
                    ${contextController.getContextColor(value.contextGuId)} 0%, 
                    ${alpha(contextController.getContextColor(value.contextGuId), 0.4)}10px, 
                    ${alpha(contextController.getContextColor(value.contextGuId), 0.3)}80%,
                    ${alpha(contextController.getContextColor(value.contextGuId), 0.3)}100%
                    )`
                    :
                    `linear-gradient(
                    150deg,
                    ${contextController.getContextColor(value.contextGuId)} 0%, 
                    ${alpha(contextController.getContextColor(value.contextGuId), 0.4)}10px,
                    ${alpha(contextController.getContextColor(value.contextGuId), 0.3)}80%,
                    ${alpha(contextController.getContextColor(value.contextGuId), 0.3)}100%
                    )`
                  ,
                color: '#000',
                borderRadius: 2,
                borderTopLeftRadius: value.type === "prompt" ? 16 : 0,
                borderTopRightRadius: value.type === "prompt" ? 0 : 16,
                boxShadow: 1,
                overflow: "hidden" // to hide gradient
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
                    zIndex: 2,
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
    </>
  )
}

export default ChatHistory

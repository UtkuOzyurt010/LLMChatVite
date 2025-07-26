import Box from "@mui/material/Box"
import AddIcon from '@mui/icons-material/Add';
import type { ChatEntry } from "../../../../../models/ChatEntry"
import { useContextController } from "../../../../../controllers/ContextController"
import { useLayoutContext } from "../../../../../utils/LayoutContext"
import { lighten, Button, useTheme } from "@mui/material"
import { useEffect, useRef } from "react"

const ChatHistory = ({entries } : 
  {
    entries: ChatEntry[]
  }) => 
{

  const contextController = useContextController()
  const {inputBoxHeight, inputBoxWidthWide} = useLayoutContext()
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
      //scrollable Chat Area 
      <Box 
        ref={scrollableRef}
        sx={{
          height: `calc(100% - ${inputBoxHeight}px)`, // adjust based on input height
          width: "100%",
          overflowY: "auto",
          position: "relative",
          paddingX: `calc((100% - ${inputBoxWidthWide}px)/2)`
        }}
      >
        {/* fadeout at top of Chat Area */}
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

        {/* list of ChatEntries as chat bubbles */}
        {entries.map((value: ChatEntry, index: number) => (
          <Box
            key={`chatEntry-${index}`}
            sx={{
              display: "flex",
              justifyContent: value.type === "prompt" ? "flex-end" : "flex-start",
              mb: 1,
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
                background: (() => {
                  const color = contextController.getContextColor(value.contextGuId)
                  return value.type === "prompt" ?
                    `linear-gradient(
                    210deg,
                    ${color} 0%, 
                    ${lighten(color, 0.6)}10px, 
                    ${lighten(color, 0.7)}80%,
                    ${lighten(color, 0.7)}100%
                    )`
                    :
                    `linear-gradient(
                    150deg,
                    ${color} 0%, 
                    ${lighten(color, 0.6)}10px,
                    ${lighten(color, 0.7)}80%,
                    ${lighten(color, 0.7)}100%
                    )`}
                  )(),
                //borderRadius: 2, //not sure why 2 here is rounder than 2 below
                borderBottomLeftRadius : 8,
                borderBottomRightRadius : 8,
                borderTopLeftRadius: value.type === "prompt" ? 8 : 0,
                borderTopRightRadius: value.type === "prompt" ? 0 : 8,
                boxShadow: 1,
                overflow: "hidden" //hide gradient around edges
              }}
            >

              {/* display text to the left of Button for prompt, and to the right for response */}
              {value.type === "prompt" && 
              <Box textAlign={"left"} 
                sx={{ 
                  whiteSpace: "pre-wrap", 
                  wordBreak: "break-word", 
                  maxWidth: "100%" 
                }}
              >
                {value.text} 
              </Box>}

              {/* if ChatEntry does not belong to current Context, display button that allows adding it */}
              {value.contextGuId != contextController.getCurrentContextId() && 
              <Box>
                <Button
                  onClick={() => handleAddEntryToCurrentcontext(value)}
                  sx={{
                    position: "relative",
                    marginLeft: value.type === "prompt" ? 2 : 0,
                    marginRight: value.type === "response" ? 2 : 0,
                    padding: 0,
                    width: buttonHeight,
                    height: buttonHeight,
                    minWidth: 0, // remove default button min width just in case
                  }}
                >
                  <Box
                    sx={{
                      width: buttonHeight,
                      height: buttonHeight,
                      background: `linear-gradient(
                        150deg,
                        ${contextController.getContextColor(contextController.getCurrentContextId())} 0%, 
                        ${contextController.getContextColor(contextController.getCurrentContextId())} 30%,
                        ${lighten(contextController.getContextColor(contextController.getCurrentContextId()), 0.4)}100%
                        )`,
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
              <Box textAlign={"left"} 
                sx={{ 
                  whiteSpace: "pre-wrap", 
                  wordBreak: "break-word", 
                  maxWidth: "100%" 
                }}
              >
                {value.text}
              </Box>
              }
            </Box> 
          </Box>
        )) //yes this entire segment is within map()
        }
      </Box>
    
  )
}

export default ChatHistory

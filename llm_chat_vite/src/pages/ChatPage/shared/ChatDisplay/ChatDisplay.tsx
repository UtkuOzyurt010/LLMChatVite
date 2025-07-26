import { Box } from "@mui/material";
import ChatHistory from "./ChatHistory/ChatHistory";
import { useSessionController } from "../../../../controllers/SessionController";
import ChatInputBox from "./ChatInputBox/ChatInputBox";
import { useLayoutContext } from "../../../../utils/LayoutContext";

export default function ChatDisplay() 
{
  const sessionController = useSessionController()

  //ChatDisplay should never be rendered if entries would be empty
  const entries = sessionController.getSortedEntriesCurrentSessionContexts(); 

  const  {inputBoxWidthWide}= useLayoutContext()
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        justifyContent: "center",

        boxSizing: "border-box",
      }}
    >
      {
        entries.length != 0 &&
          <ChatHistory entries={entries}/>}
          <Box
            sx={{
              bgcolor: "#fff",
              display: "flex",
              justifyContent: "center",
              pb: 2,
              zIndex: 10,
            }}
          >
            <ChatInputBox width= {`${inputBoxWidthWide}px`} />
          </Box>
      
    </Box>
  );
}


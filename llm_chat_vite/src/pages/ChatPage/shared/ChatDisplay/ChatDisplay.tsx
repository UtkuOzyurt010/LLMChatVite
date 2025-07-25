import { Box } from "@mui/material";
import ChatHistory from "./ChatHistory/ChatHistory";
import { useState } from "react";
import { useSessionController } from "../../../../controllers/SessionController";
import ChatInputBox from "../ChatInputBox/ChatInputBox";
import { useLayoutContext } from "../../../../utils/LayoutContext";

export default function ChatDisplay() 
{
  const sessionController = useSessionController()

  //ChatDisplay should never be rendered if entries would be empty
  const entries = sessionController.getSortedEntriesCurrentSessionContexts(); 
  const [focusedField, setFocusedField] = useState("");
  const  {inputBoxHeight, inputBoxWidthWide}= useLayoutContext()
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        boxSizing: "border-box",
       // border: "3px solid black"
      }}
    >
      {
        entries.length != 0 &&
          <ChatHistory entries={entries} focusedField={focusedField} setFocusedField={setFocusedField} />}
          <Box
            sx={{
              //width: "100%",
              //height: `${inputBoxHeight}px`,
              bgcolor: "#fff",
              display: "flex",
              justifyContent: "center",
              pb: 2,
              zIndex: 10,
              //border: "3px solid blue"
            }}
          >
            <ChatInputBox width= {`${inputBoxWidthWide}px`} />
          </Box>
      
    </Box>
  );
}


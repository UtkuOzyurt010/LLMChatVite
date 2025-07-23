import { Box } from "@mui/material"
import ChatInputBox from "../../ChatInputBox/ChatInputBox";

const EmptyChatDisplay = () => {

return(
  <Box 
    sx={{
      //height: 'calc(100vh - 60px)',
      //height: "100%",
      //paddingTop: "10%" //somehow this is based on the parent width? I'd rather not use vh here...
      paddingTop: `calc(100vh / 10 * 4)`,
      display: 'flex',
      //alignItems: 'center',
      justifyContent: 'center',
      boxSizing: "border-box"
    }}
  >
    <ChatInputBox width={"800px"}></ChatInputBox>
   

  </Box>
)
}

export default EmptyChatDisplay
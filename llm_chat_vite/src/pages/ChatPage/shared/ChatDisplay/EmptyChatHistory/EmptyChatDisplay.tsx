import { Box, TextField } from "@mui/material"
import { useState } from "react";
import ChatInputBox from "../../ChatInputBox/ChatInputBox";

const EmptyChatHistory = () => {
return(
  <Box sx={{
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
    <ChatInputBox>

    </ChatInputBox>
    {/* <Box
      component="form"
      sx={{ 
        '& .MuiTextField-root': {width: '25ch' } ,
        boxSizing: "border-box",
        border: "2px solid green",
    //     marginTop:"10%",
    //     paddingBottom:"10%",
    //     paddingX:"30%",
      }}
      noValidate
      autoComplete="off"
    >
      ask me something!
      <TextField 
        required
        id="prompt" 
        variant="filled"
        placeholder="Ask me anything!"
        hiddenLabel={true}
        
      >
      </TextField>
    </Box> */}
  </Box>
)
}

export default EmptyChatHistory
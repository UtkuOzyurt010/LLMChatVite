import { Box, TextField } from "@mui/material";

export default function ChatInputBox() {

    return(
    <Box
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
      <TextField 
        required
        id="prompt" 
        variant="filled"
        placeholder="Ask me anything!"
        hiddenLabel={true}
        
      >
      </TextField>
    </Box> 
    )
    
}
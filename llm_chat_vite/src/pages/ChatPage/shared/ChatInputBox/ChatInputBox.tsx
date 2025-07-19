import { Box, Button, TextField } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import useLocalStorage from "../../../../utils/useLocalStorage";
import { type Context, defaultContext } from "../../../../models/Context";
import { useContext } from "react";
import { useCurrentContextId } from "../../../../utils/ReactContextProvider";

export default function ChatInputBox() {

    //using LocalStorage had some issues with frame timing
  //const state = useContext(AppStateContext);
  //const currentContext = state.currentContext;

  const [contexts] = useLocalStorage<Context[]>("contexts", [])
  //const [currentContextId] = useLocalStorage<string>("currentContextId", "")
  const { currentContextId } = useCurrentContextId()

    return(
      <Box
        sx={{
          position: 'relative',
          width: "500px"

        }}
      >
        <Button 
          sx={{ 
            padding: 0, 
            //width: "100%",
            //minWidth: 0,
            position: 'absolute',
            zIndex: 1,
            left: '0',
            top: '0' 
          }}>
            <CircleIcon sx={{ color: contexts.find((context) => context.guid == currentContextId)?.color, fontSize: 24 }} />
        </Button>
      <Box
        component="form"
        sx={{ 
          width: "100%",
          '& .MuiTextField-root': {width: '100%' } ,
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
    </Box>
    )
    
}
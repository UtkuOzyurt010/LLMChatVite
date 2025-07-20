import { Box, Button } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import AddIcon from '@mui/icons-material/Add';
import { useAppContext } from "../../../../../../utils/AppContext";
import { createContext } from "../../../../../../models/Context";
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';


const AddContextButton = () => {

  const { contexts, currentSessionId, sessions, setCurrentContextId} = useAppContext();
  const [color, setColor] = useState("")
  const theme = useTheme()
  const buttonHeight = theme.customSizes.buttonHeight
  const buttonHeightn = theme.customSizes.buttonHeightn

  useEffect(() => setColor(getRandomHexColor()), []) //to display the color, before adding it

  const getRandomHexColor = () =>{
    const randomNum = Math.floor(Math.random() * 0xffffff);
    const hexString = randomNum.toString(16).padStart(6, '0');
    return `#${hexString}`;
  }

  const handleAddContext = () =>
  {
    const context = createContext(color)
    contexts.push(context) //add created context to all contexts
    setCurrentContextId(context.guid)
    const session = sessions.find((session) => session.guid === currentSessionId)!
    session.contextIds.push(context.guid) // add contextId to currentSession contexts
  }

return (
  <Box
    sx={{
      //border: "3px solid blue",
      //display: "inline-block", // shrink to fit content
    }}
  >
    <Button
      onClick={handleAddContext}
      sx={{
        position: "relative",
        //border: "3px solid yellow",
        padding: 0,
        width: buttonHeight,
        height: buttonHeight,
        minWidth: 0, // remove default button min width
      }}
    >
      <CircleIcon
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: color,
          fontSize: buttonHeight,
        }}
      />
      <AddIcon
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: buttonHeightn,
        }}
      />
    </Button>
  </Box>
)
}

export default AddContextButton
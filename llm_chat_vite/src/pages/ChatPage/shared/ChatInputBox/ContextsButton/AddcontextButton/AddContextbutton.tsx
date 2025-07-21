import { Box, Button } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { useContextController } from "../../../../../../controllers/ContextController";

const AddContextButton = () => {
  const [color, setColor] = useState("")
  const theme = useTheme()
  const contextController = useContextController()
  const buttonHeight = theme.customSizes.buttonHeight
  const buttonHeightn = theme.customSizes.buttonHeightn

  useEffect(() => setColor(contextController.getRandomHexColor()), []) //to display the color, before adding it

  
  const handleAddNewContext = () =>
  {
    const newColor : string = contextController.addNewContext(color);
    setColor(newColor)
  }

return (
  <Box
    sx={{
      //border: "3px solid blue",
      //display: "inline-block", // shrink to fit content
    }}
  >
    <Button
      onClick={handleAddNewContext}
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
import { Avatar, Box, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { useContextController } from "../../../../../controllers/ContextController"; 
import { useColorController } from "../../../../../controllers/ColorController";
import colorWheel from '../../../../../assets/new_color_wheel.png';


const AddContextButton = () => {
  const [color, setColor] = useState("")
  const theme = useTheme()
  const contextController = useContextController()
  const colorController = useColorController()
  const buttonHeight = theme.customSizes.buttonHeight

  //useEffect(() => setColor(contextController.getRandomHexColor()), []) //to display the color, before adding it
  useEffect(() => setColor(colorController.getDistinctColor()), []) 

  
  const handleAddNewContext = () =>
  {
    const newColor : string = contextController.addNewContext(color);
    setColor(newColor)
  }

return (
  <Box>
    <Button
      onClick={handleAddNewContext}
      sx={{
        position: "relative",
        padding: 0,
        width: buttonHeight,
        height: buttonHeight,
        minWidth: 0, // remove default button min width
      }}
    >
      <Avatar
        src={colorWheel}
        alt="Color Wheel"
        sx={{ 
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: buttonHeight, 
          height: buttonHeight,
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
  </Box>
)
}

export default AddContextButton
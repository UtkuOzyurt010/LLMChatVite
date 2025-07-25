import { Box } from "@mui/material"
import { CompressionButton } from "./CompressionButton/CompressionButton"
import { useTheme } from '@mui/material/styles';
import { BlackListButton } from "./BlackListButton/BlackListButton";
import { useState, type Dispatch, type SetStateAction } from "react";
import { RevealSeattingsButton } from "./RevealSettingsButton/RevealSettingsButton";

export const ChatInputSettings = ({text, setText} : {text : string, setText : Dispatch<SetStateAction<string>>}) => {
  const buttons: any[] = []
  const theme = useTheme();
  const buttonHeight = theme.customSizes.buttonHeight
  const buttonHeightn = theme.customSizes.buttonHeightn
  const allCirclesWidth = "40px"
  const overlapOffset = 0

  const [isHovering, setIsHovering] = useState(false);

  buttons.push(
    <RevealSeattingsButton/>
  )

  buttons.push(<CompressionButton text={text} setText={setText} key="compression-button" />)
  buttons.push(<BlackListButton text={text} setText={setText} key="blacklist-button" />)

  return (
     <Box
          //overflow={"visible"}
          display={"flex"}
          flexDirection={"row"}
          sx={{
            position: "relative",
            height: buttonHeight,
            width: allCirclesWidth,
            alignItems: 'center',
            //border: "1px solid blue",
            boxSizing: 'content-box'
          }}
        >
          <Box
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            sx={{
              alignItems: "center",
              height: "100%",
              width: "100%",
              overflow: "visible", 
              //border: "1px solid black",
              boxSizing: 'content-box'
            }}
          >
            {/* the purple background */}
             <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: isHovering ? `${buttons.length * (buttonHeightn)}px` : allCirclesWidth, 
                  height: "100%",
                  //backgroundColor: `${alpha(contextController.getCurrentContext().color, 0.2)}`,
                  backgroundColor: "#4BC469",
                  borderRadius: "12px",
                  //border: "1px solid blue",
                  boxSizing: 'content-box',
                  zIndex: 1,
                  //visibility: isHovering ? "visible" : "hidden", //now changing the width to 0 instead
                  opacity: isHovering ? 1 : 0,
                  transition: isHovering ?
                  "opacity 0.3s ease, width 0.3s ease"
                  :"opacity 0.3s ease, width 0.3s ease" , //not sure about this one
                }}
              />

              {/* the listed options buttons */}
              {buttons.map((button, index) => 
              (<Box
                key={index}
                className="circle"
                sx={{
                  //visibility: (isHovering || index < 3) ? "visible" : "hidden",
                  display: "flex",
                  alignItems: "center",
                  width: (isHovering || index < 3) ? buttonHeight : "0px", //this is much prettier wow! :D
                  height: "100%",
                  position: "absolute",
                  right: `${index * (isHovering ? buttonHeightn + 4 : overlapOffset)}px`, // spread if hovering //overlapOffset is set to 0 now
                  zIndex: buttons.length - index,
                  opacity: (isHovering || index < 3) ? 1 : 0,
                  transition: isHovering ?
                    "right 0.3s ease, opacity 0.3s ease, width 0.3s ease"
                    :"right 0.3s ease, opacity 0.8s ease, width 0.3s ease",
                  // boxSizing: "border-box",
                  // border: "3px solid purple"
                }}
              >
                {button}
              </Box>)
              )
            }
          </Box>
        </Box>

  )
}

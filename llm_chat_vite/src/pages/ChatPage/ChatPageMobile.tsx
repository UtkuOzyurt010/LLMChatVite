import { Box, Button} from "@mui/material";
import SessionHistory from "./SessionHistory/SessionHistory";
import ChatHistory from "./ChatHistory/ChatHistory";
import ChatInputBox from "./ChatInputBox/ChatInputBox";
import { useEffect, useState } from "react";
import { Context } from "../../models/Context";
import ChatTimeline from "./ChatTimeline/ChatTimeline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import NavBarMobile from "../../NavBarMobile";


export default function ChatPage(
) {
    
    const [ShowLeft, setShowLeft] = useState<boolean>(false);
    const [selectedContexts, setSelectedContexts] = useState<Context[]>([])
    const leftSideBarWidth = "300px"

    // useEffect(() =>

    // )
    return(
        //outer box containing 
        //flex column navbar <-> the rest
        <Box
            sx={{
                position: "relative",
                display:"flex",
                flexDirection: "column",
                height:"100%",
                width:"100%" 
            }}
        >
            {/* Top bar containing button to expand/collapse left sidebar */}
            <Box>
                <NavBarMobile isSmallScreen={true} showLeft={ShowLeft} setShowLeft={setShowLeft}></NavBarMobile>
            </Box>

            {/* Conditional Left side bar, absolute to overlay on everything*/}
            {ShowLeft && 
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    //width: leftSideBarWidth,
                    zIndex: 1, // make sure it's above other content
                }}
                >
                {/*SessionHistory contains position: "absolute", which will be based on the closest ancestor position  */}
                <SessionHistory width={leftSideBarWidth} isSmallScreen={true} setShowLeft={setShowLeft}></SessionHistory>
            </Box>
            }
            {/* Wrapper box for everything below navbar */}
            {/* flex row middle Chathistory + ChatInputBox <-> ChatTimeLine*/}
            <Box
                sx={{
                    flex: "1",
                    flexGrow: "10",
                    display: "flex",
                    flexDirection: "row",
                    overflow: 'hidden',
                    backgroundColor: "white",
                    color: "black",
                    boxSizing: 'border-box',
                    border: import.meta.env.VITE_DEBUG == 'true' ? "3px solid blue" : undefined
                }}
            >  
                {/* Wrapper Box for Middle ChatHistory + ChatInputBox */}
                {/* flex column middle Chathistory <-> ChatInputBox */}
                <Box
                    sx={{
                        flex: "1",
                        flexGrow: "1",
                        display: "flex",
                        flexDirection: "column",
                        overflow: 'hidden',
                        boxSizing: 'border-box',
                        border: import.meta.env.VITE_DEBUG === 'true' ? "5px dashed orange" : undefined,
                        
                    }}
                >
                    <Box
                        sx={{
                            flex: "1"
                        }}
                    >
                        <ChatHistory></ChatHistory>
                    </Box>
                    <Box
                        sx={{
                            flex: "1"
                        }}
                    >
                        <ChatInputBox></ChatInputBox>
                    </Box>
                
                </Box>

                {/* Wrapper Box for Right ChatTimeLine */}
                <Box
                    sx={{
                        boxSizing: 'border-box',
                        border: import.meta.env.VITE_DEBUG === 'true' ? "5px dashed green" : undefined,
                        width: "100px" 
                    }}
                >
                    <ChatTimeline></ChatTimeline>
                </Box>
            </Box>
        </Box>
    )
    
}
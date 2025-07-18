// import { Box, Button} from "@mui/material";
// import SessionHistory from "./SessionHistory/SessionHistory";
// import ChatHistory from "./ChatDisplay/ChatDisplay";
// import ChatInputBox from "./ChatInputBox/ChatInputBox";
// import { useEffect, useState } from "react";
// import { Context } from "../../models/Context";
// import ChatTimeline from "./ChatTimeline/ChatTimeline";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
// import NavBarMobile from "../../NavBarMobile";


// export default function ChatPage(
// ) {
    
//     const [ShowLeft, setShowLeft] = useState<boolean>(false);
//     const [selectedContexts, setSelectedContexts] = useState<Context[]>([])
//     const leftSideBarWidth = "300px"

//     // useEffect(() =>

//     // )
//     return(
//         //outer box
//         <Box
//             sx={{
//                 position: "absolute",
//                 display:"flex",
//                 flexDirection: "column",
//                 height:"100%",
//                 width:"100%" 
//             }}
//         >
//             <Box
//                 flex={1}
//                 flexGrow={10}
                 
//                 sx={{
//                     //position: "relative",
//                     display: "flex",
//                     flexDirection: "row",
//                     //overflow: 'hidden',
//                     backgroundColor: "white",
//                     color: "black",
//                     boxSizing: 'border-box',
//                     border: import.meta.env.VITE_DEBUG == 'true' ? "3px solid blue" : undefined
//                 }}
//             >  
                
//                 <Box
//                     sx={{
//                         display:"block",
//                         position: "absolute",
//                         left: "0px",
//                         border: import.meta.env.VITE_DEBUG == 'true' ? "3px solid blue" : undefined,
//                         zIndex: 1
//                     }}
//                 >
//                     <Button
//                     sx={{width: "40px"}}
//                         onClick={() => setShowLeft(!ShowLeft)}
//                     >
//                         <FontAwesomeIcon icon={faBars} />
//                     </Button>
//                 </Box>

//                 {/* Wrapper Box for Leftside SessionHistory */}
//                 <Box
//                     sx={{
//                         //flex: "1",

//                         display: {
//                             //position: "relative",
//                             //display: "flex",
//                             //flexDirection: "column",
//                             //overflow: 'hidden',
//                             boxSizing: 'border-box',
//                             border: import.meta.env.VITE_DEBUG === 'true' ? "5px dashed yellow" : undefined,
//                             maxWidth: "300px",
//                             width: leftSideBarWidth,
//                             //...(isSmallScreen ? { width: "0px" })
//                             //maxHeight: "100%"
//                         },
//                     }}
//                 >
//                     {/*SessionHistory contains position: "absolute", which will be based on the closest ancestor position  */}
//                     {ShowLeft && <SessionHistory width={leftSideBarWidth} isSmallScreen={false} setShowLeft={setShowLeft}></SessionHistory>}

                  
//                 </Box>

                

//                 {/* Wrapper Box for Middle ChatHistory + ChatInputBox */}
//                 <Box
//                     sx={{
//                         flex: "1",
//                         flexGrow: "1",
//                         display: "flex",
//                         flexDirection: "column",
//                         //overflow: 'hidden',
//                         boxSizing: 'border-box',
//                         border: import.meta.env.VITE_DEBUG === 'true' ? "5px dashed orange" : undefined,
                        
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             flex: "1"
//                         }}
//                     >
//                         {/* <ChatHistory></ChatHistory> */}
//                     </Box>
//                     <Box
//                         sx={{
//                             flex: "1"
//                         }}
//                     >
//                         <ChatInputBox></ChatInputBox>
//                     </Box>
                
//                 </Box>

//                 {/* Wrapper Box for Right ChatTimeLine */}
//                 <Box
//                     sx={{
//                         flex: "1",
//                         flexGrow: "1",
//                         boxSizing: 'border-box',
//                         border: import.meta.env.VITE_DEBUG === 'true' ? "5px dashed green" : undefined 
//                     }}
//                 >
//                     <ChatTimeline></ChatTimeline>
//                 </Box>
//             </Box>
//         </Box>
//     )
    
// }
// //unused in new LeftSideDrawer for desktop oops :O


// import { Box, Button } from "@mui/material";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

// export default function SessionHistory({width, isSmallScreen, setShowLeft} : 
//     { 
//         width: string
//         isSmallScreen : boolean
//         setShowLeft : (value : boolean) => void
    
//     }) {

// return(
//     <Box
//         sx={{
//             position: "absolute",
//             width: isSmallScreen ? "100vw" : width,
//             height: "100%",
//             border: import.meta.env.VITE_DEBUG == 'true' ? "3px solid red" : undefined,
//             color: "black",
//             backgroundColor: (theme) => theme.palette.custom.bggray,
//             overflow: "visible",
//             zIndex: 2
            
//         }}
//     >
//         <Box
//             sx={{
//                 display:"block",
//                 position: "absolute",
//                 right: "0px",
//             }}
//         >
//             <Button
//                 sx={{width: "40px"}}
//                 onClick={() => setShowLeft(false)}
//             >
//                 <FontAwesomeIcon icon={faBars} />
//             </Button>
//         </Box>
//         SessionHistory     
//     </Box>
// )
// }
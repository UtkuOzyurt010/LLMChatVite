import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button } from "@mui/material";


export default function NavBar ({isSmallScreen, showLeft, setShowLeft} : 
    {
        isSmallScreen: boolean
        showLeft: boolean
        setShowLeft: (value : boolean) => void
    }
) {
    return(
        <Box
            border={import.meta.env.VITE_DEBUG === 'true' ? "3px solid orange" : undefined}
            sx={{
                color:"black",
                backgroundColor: (theme) => theme.palette.custom.bggray,
                height: isSmallScreen ? "30px" : "40px",
                maxHeight: isSmallScreen ? "30px" : "40px",
                width: "100%",
                
            }}
        >
            <Box
                sx={{
                    display:"block",
                    position: "absolute",
                    left: "0px",
                    border: import.meta.env.VITE_DEBUG == 'true' ? "3px solid blue" : undefined,
                    zIndex: 1
                }}
            >
                <Button
                sx={{width: "40px"}}
                    onClick={() => setShowLeft(!showLeft)}
                >
                    <FontAwesomeIcon icon={faBars} />
                </Button>
            </Box>
            
        </Box>
    )
}
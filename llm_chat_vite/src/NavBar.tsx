import { Box, useTheme } from "@mui/material";
//import theme from "./theme";

export default function NavBar (
    
) {
    //const theme = useTheme()
    return(
        <Box
            border={import.meta.env.VITE_DEBUG === 'true' ? "3px solid orange" : undefined}
            sx={{
                color:"black",
                backgroundColor: (theme) => theme.palette.custom.bggray,
                height: "40px",
                maxHeight: "40px",
                width: "100%",
                
            }}
        >
            navbar
        </Box>
    )
}
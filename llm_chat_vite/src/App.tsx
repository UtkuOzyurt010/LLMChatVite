import './App.css'
import { Box, useMediaQuery } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme.ts';
import ChatPageMobile from './pages/ChatPage/ChatPageMobile/ChatPageMobile.tsx'
import ChatPageDesktop from './pages/ChatPage/ChatPageDesktop/ChatPageDesktop.tsx'

import { AppProvider } from './utils/AppProvider.tsx'
import { LayoutProvider } from './utils/LayoutProvider.tsx';

function App() {
  const isSmallScreen = !useMediaQuery(theme.breakpoints.up('sm'));

    return (
      <AppProvider>
        <LayoutProvider>
            <ThemeProvider theme={theme}>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    height={"100vh"}
                    width={"100vw"}
                    border={import.meta.env.VITE_DEBUG === 'true' ? "3px solid purple" : undefined}
                >
                    {/* <Box
                        //flex="1"
                        border={import.meta.env.VITE_DEBUG === 'true' ? "3px solid yellow" : undefined}
                        height={"100%"}
                        width={"100%"}
                    > */}
                        {/* {
                            isSmallScreen ? <NavBarMobile isSmallScreen={isSmallScreen} showLeft={showl}></NavBarMobile>
                        } */}
                        {/* <NavBar ></NavBar> */}
                    {/* </Box> */}
                    <Box
                        //flexGrow={"1"}
                        border={import.meta.env.VITE_DEBUG === 'true' ? "3px solid green" : undefined}
                        margin={"0"}
                        sx={{
                        }}
                        //overflow={"hidden"}
                    >
                        {isSmallScreen ?
                        <ChatPageMobile></ChatPageMobile> //SwipeableDrawer
                        :
                        <Box 
                        >
                        <ChatPageDesktop //</Box>contextIds={contextIds}
                        ></ChatPageDesktop>
                        </Box>
                        } 
                    </Box>
                </Box>
            </ThemeProvider>
        </LayoutProvider>
      </AppProvider>
    
    )
}

export default App
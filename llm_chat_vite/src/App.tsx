import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Home from './pages/Home/Home'
import ChatPage from './pages/ChatPage/ChatPage'
import { Box, useMediaQuery } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.ts';
import NavBar from './NavBar.tsx'
import NavBarMobile from './NavBarMobile.tsx'
import ChatPageMobile from './pages/ChatPage/ChatPageMobile.tsx'

function App() {
    const isSmallScreen = !useMediaQuery(theme.breakpoints.up('sm'));
    
    return (
        <ThemeProvider theme={theme}>
            <Box
                display={"flex"}
                flexDirection={"column"}
                height={"100vh"}
                width={"100vw"}
                border={import.meta.env.VITE_DEBUG === 'true' ? "3px solid purple" : undefined}
            >
                <Box
                    //flex="1"
                    border={import.meta.env.VITE_DEBUG === 'true' ? "3px solid yellow" : undefined}
                    width={"100%"}
                >
                    {/* {
                        isSmallScreen ? <NavBarMobile isSmallScreen={isSmallScreen} showLeft={showl}></NavBarMobile>
                    } */}
                    {/* <NavBar ></NavBar> */}
                </Box>
                <Box
                    //flex="1"
                    flexGrow={"1"}
                    //height={"100vh"}
                    //width={"100vw"}
                    border={import.meta.env.VITE_DEBUG === 'true' ? "3px solid green" : undefined}
                    margin={"0"}
                    overflow={"hidden"}
                >
                    {isSmallScreen ?
                    <ChatPageMobile></ChatPageMobile>
                    :
                    <ChatPage></ChatPage>}
                </Box>
            </Box>
        </ThemeProvider>
    
    )
}

export default App

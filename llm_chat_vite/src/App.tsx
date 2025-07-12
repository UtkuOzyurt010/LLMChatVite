import { useEffect, useState } from 'react'
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
import ChatPageDesktop from './pages/ChatPage/ChatPageDesktop/ChatPageDesktop.tsx'

import { Session } from './models/Session.tsx'
import { Context } from './models/Context.tsx'

function initContexts(): Context[] {
  const context = new Context(1, "pink");
  const context2 = new Context(2, "blue");
  const context3 = new Context(3, "red");
  const context4 = new Context(4, "green");
  const context5 = new Context(5, "black");
  const context6 = new Context(6, "brown");

  return [context, context2, context3, context4, context5, context6];
}

function initSessions(contexts : Context[]): Session[] {
  let session = new Session(1, contexts);
  let session2 = new Session(2, contexts);
  session.summary = "My first session!"
  session2.summary = "My second session!"
  return [session, session2];
}



function App() {
    const isSmallScreen = !useMediaQuery(theme.breakpoints.up('sm'));

    const [sessions, setSessions] = useState<Session[]>([]);
    const [contexts, setContexts] = useState<Context[]>([]);

    useEffect(() => {
    const initialContexts = initContexts();
    setContexts(initialContexts);

    const initialSessions = initSessions(initialContexts);
    setSessions(initialSessions);
  }, []);

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
                    flexGrow={"1"}
                    border={import.meta.env.VITE_DEBUG === 'true' ? "3px solid green" : undefined}
                    margin={"0"}
                    //overflow={"hidden"}
                >
                    {isSmallScreen ?
                    <ChatPageMobile></ChatPageMobile> //SwipeableDrawer
                    :
                    <ChatPageDesktop sessions={sessions} contexts={contexts}></ChatPageDesktop>
                    } 
                </Box>
            </Box>
        </ThemeProvider>
    
    )
}

export default App

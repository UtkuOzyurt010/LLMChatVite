import {useState } from 'react'
import './App.css'
import { Box, useMediaQuery } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.ts';
import ChatPageMobile from './pages/ChatPage/ChatPageMobile/ChatPageMobile.tsx'
import ChatPageDesktop from './pages/ChatPage/ChatPageDesktop/ChatPageDesktop.tsx'

import { Session } from './models/Session.tsx'
import { Context } from './models/Context.tsx'

function initContexts(): Context[] {
  const context = new Context("pink");
  const context2 = new Context("blue");
  const context3 = new Context("red");
  const context4 = new Context("green");
  const context5 = new Context("black");
  const context6 = new Context("brown");

  return [context, context2, context3, context4, context5, context6];
}

function initSessions(contexts : Context[]): Session[] {
  let session = new Session(contexts);
  let session2 = new Session(contexts);
  session.summary = "My first session!"
  session2.summary = "My second session!"
  return [session, session2];
}

function App() {
    const isSmallScreen = !useMediaQuery(theme.breakpoints.up('sm'));

  const initialContexts = initContexts();
  const initialSessions = initSessions(initialContexts);

  const [contexts, setContexts] = useState<Context[]>(initialContexts);
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [currentSession, setCurrentSession] = useState<Session>(initialSessions[0]);

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
                    <ChatPageDesktop sessions={sessions} contexts={contexts} currentSession={currentSession}></ChatPageDesktop>
                    } 
                </Box>
            </Box>
        </ThemeProvider>
    
    )
}

export default App

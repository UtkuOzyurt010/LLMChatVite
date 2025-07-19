import {useState } from 'react'
import './App.css'
import { Box, useMediaQuery } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.ts';
import ChatPageMobile from './pages/ChatPage/ChatPageMobile/ChatPageMobile.tsx'
import ChatPageDesktop from './pages/ChatPage/ChatPageDesktop/ChatPageDesktop.tsx'

import { type Session, createSession } from './models/Session.tsx'
import { createContext } from './models/Context.tsx'
import { type Context, defaultContext } from './models/Context.tsx';
import useLocalStorage from './utils/useLocalStorage.tsx';
import { CurrentContextIdProvider } from './utils/ReactContextProvider.tsx';

function initContexts(): Context[] {
  const context = createContext("pink");
  const context2 = createContext("blue");
  const context3 = createContext("red");
  const context4 = createContext("green");
  const context5 = createContext("black");
  const context6 = createContext("brown");

  return [context, context2, context3, context4, context5, context6];
}

function initSessions(contextIds : string[]): Session[] {
  const session : Session = createSession(contextIds)
  const session2 : Session = createSession(contextIds)
  session.summary = "My first session!"
  session2.summary = "My second session!"
  return [session, session2];
}

function App() {
  const isSmallScreen = !useMediaQuery(theme.breakpoints.up('sm'));

  const initialContexts = initContexts()
  const initialContextIds = initialContexts.map((context) => context.guid);
  const initialSessions = initSessions(initialContextIds);

  const [contexts, setContexts] = useLocalStorage<Context[]>("contexts", initialContexts);
  const [sessions, setSessions] = useLocalStorage<Session[]>("sessions", initialSessions);
  //const [currentSession, setCurrentSession] = useState<Session>(initialSessions[0]);
  const [currentSession, setCurrentSession] = useLocalStorage<Session>("currentSession", initialSessions[0])
  const [currentContextId, setCurrentContextId] = useLocalStorage<string>("currentContextId", initialContextIds[0])

    return (
      <CurrentContextIdProvider>
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
                      height: "100vh",
                      width: "100vw"
                    }}
                    //overflow={"hidden"}
                >
                    {isSmallScreen ?
                    <ChatPageMobile></ChatPageMobile> //SwipeableDrawer
                    :
                    <Box height={"100vh"}>
                    <ChatPageDesktop sessions={sessions} //</Box>contextIds={contextIds}
                    ></ChatPageDesktop>
                    </Box>
                    } 
                </Box>
            </Box>
        </ThemeProvider>
      </CurrentContextIdProvider>
    
    )
}

export default App

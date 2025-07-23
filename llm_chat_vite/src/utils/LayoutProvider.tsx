import { useState, type ReactNode } from "react"
import { LayoutContext } from "./LayoutContext"

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isLeftSideDrawerCollapsed, setIsLeftSideDrawerCollapsed] = useState(true)
  const toggleIsLeftSideDrawerCollapsed = () => setIsLeftSideDrawerCollapsed(!isLeftSideDrawerCollapsed)
  const drawerWidth = 260
  const collapsedWidth = 70
  const appBarHeight = 65
  const inputBoxHeight = 150

  const value = {
    isLeftSideDrawerCollapsed,
    setIsLeftSideDrawerCollapsed,
    toggleIsLeftSideDrawerCollapsed,
    drawerWidth,
    collapsedWidth,
    appBarHeight,
    inputBoxHeight
  }

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}
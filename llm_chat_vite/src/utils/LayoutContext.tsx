import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react"

type LayoutContextType = {
  isLeftSideDrawerCollapsed: boolean
  setIsLeftSideDrawerCollapsed: Dispatch<SetStateAction<boolean>>
  toggleIsLeftSideDrawerCollapsed: () => void,
  drawerWidth: number
  collapsedWidth: number
  appBarHeight: number
  inputBoxHeight: number
  inputBoxWidthWide: number
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export const useLayoutContext = () => {
  const context = useContext(LayoutContext)
  if (!context) throw new Error("useLayoutContext must be used within a LayoutProvider")
  return context
}

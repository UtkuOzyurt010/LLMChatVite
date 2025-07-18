import Box from "@mui/material/Box"
import type { ChatEntry } from "../../../../../models/ChatEntry"

const ChatHistory = ({entries, focusedField, setFocusedField} 
  : 
  {
    entries : ChatEntry[]
    focusedField: string
    setFocusedField: (focusedField: string) => void
  }) =>
{
  return(
  <div>
  {entries.map((value: ChatEntry, index: number) => {
    return(
      <Box
      position={"relative"}
        key={`chatEntry: ${index}`}
      >
        {value.type == "prompt" ?
        <Box
          sx={{
            position: "absolute",
            right: "0"
          }}
        >
          {value.text}
        </Box> 
        :
        <Box
          sx={{
            position: "absolute",
            left: "0"
          }}
        >
          {value.text}
        </Box>
        }
      </Box>)})}
</div>)
}

export default ChatHistory

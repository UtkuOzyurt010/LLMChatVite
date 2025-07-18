import Box from "@mui/material/Box"
import type { ChatEntry } from "../../../../../models/ChatEntry"
//import type { ChronologicalEntry } from "../../../../models/ChronologicalEntry"

const ChatHistory = ({entries} : {entries : ChatEntry[]}) =>
{
  return(
  <div>
  {entries.map((value: ChatEntry, index: number) => {
    return(
      <Box
      position={"relative"}
        key={`chronologicalentry: ${index}`}
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

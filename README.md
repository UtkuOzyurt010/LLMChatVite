This is a demo of an LLM chatbot with a few features meant to make it more sustainable:
-The context management system allows users to create smaller contexts within a session, so that only the information the user deems necessary for their prompt gets sent to an LLM, rather than the entire history of the session. This way users won't need to create a new chat if they want to lower their token usage, allowing them to keep related questions together within a session with no extra cost.
-A blacklist button which removes several unnecessary words/phrases from the user input like "please" or "could you"
-A compression button which uses LLMLingua and gpt2 to compress the user input.

# To run the frontend, please follow the following instructions:

# navigate to llm_chat_vite in terminal
  cd llm_chat_vite

# start frontend using: 
  npm run dev

The Python backend API uses FastAPI and [LLMLingua](https://github.com/microsoft/LLMLingua) to compress prompts for large language models using a small locally hosted LLM (gpt2)

The Compression Button only works with the backend running.

currently the only endpoint exposed is '/compress'

# To run the backend, please follow the following instructions:

# (optional) create a virtual environment:
  python -m venv .venv

# (optional) Activate the venv
  # Windows CMD
  .\.venv\Scripts\activate

  # PowerShell
  .\.venv\Scripts\Activate.ps1

  # macOS/Linux
  source .venv/bin/activate

# restore dependencies (while in LLMChatVite folder)
  pip install -r requirements.txt

# run backend on port 8000
  uvicorn llmlingua_api:app --reload --port 8000  

if you wish tou se a different port, please make sure to change the port number in compressPrompt() in CompressionButton.tsx
at llm_chat_vite/src/pages/ChatPage/shared/ChatDisplay/ChatInputBox/CompressionButton
or search using ctrl-shift-f
navigate to llm_chat_vite in terminal
and start frontend using: 
  
  npm run dev



The Python backend API uses FastAPI and [LLMLingua](https://github.com/microsoft/LLMLingua) to compress prompts for large language models using a small locally hosted LLM (gpt2)

The Compression Button only works with the backend running.

currently the only endpoint exposed is '/compress'

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

if you wish tou se a different port, be sure to change the port in compressPrompt() in CompressionButton.tsx
at llm_chat_vite/src/pages/ChatPage/shared/ChatDisplay/ChatInputBox/CompressionButton
or search using ctrl-shift-f
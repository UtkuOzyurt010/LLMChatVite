from fastapi import FastAPI
from pydantic import BaseModel
from llmlingua import PromptCompressor
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In dev, allow all. Restrict in prod!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

compressor = PromptCompressor(model_name="gpt2", device_map="cpu")  # or your choice

class PromptRequest(BaseModel):
    prompt: str
    target_tokens: int

@app.post("/compress")
def compress_prompt(req: PromptRequest):
    result = compressor.compress_prompt(req.prompt, target_token=req.target_tokens)
    return {"compressed_prompt": result}
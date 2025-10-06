
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

def root():
    return {"message": "Hello World"}

# request format
class SpeechInput(BaseModel):
    text: str


origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process")
def process_text(speech: SpeechInput):
    user_text = speech.text.lower()

    # simple keyword matching
    if "hello" in user_text:
        response = "Hi, I'm Jarvis"
    elif "how are you" in user_text:
        response = "I'm doing well, thank you!"
    elif "you are amzing" in user_text:
        response = "Thank you!"
    else:
        response = "Sorry, I didn't understand that."

    return {"response": response}
# # main.py
# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# import httpx
# import os

# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # set this in your env

# app = FastAPI()
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # adjust
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ---------- lightweight correction dictionary ----------
# CUSTOM_DICT = {
#     "surojit": ["sir jet", "sirojit", "sirjit"],
#     "ros": ["ross", "raws", "r.o.s."],
#     "jarvis": ["assistant", "jervis"],
# }

# def simple_correction(raw_text: str) -> str:
#     text = raw_text.lower()
#     # naive replace based on variants (you can improve with fuzzy matching)
#     for correct, variants in CUSTOM_DICT.items():
#         for v in variants:
#             text = text.replace(v, correct)
#     # fix common punctuation / capitalization (simple)
#     return text

# # ---------- endpoint that receives audio and returns transcription ----------
# @app.post("/stt")
# async def stt(file: UploadFile = File(...)):
#     # read file bytes
#     contents = await file.read()

#     # call OpenAI transcription endpoint (multipart/form-data)
#     # NOTE: this uses the public OpenAI audio transcription endpoint
#     headers = {"Authorization": f"Bearer {OPENAI_API_KEY}"}
#     data = {"model": "whisper-1"}
#     files = {"file": ("speech.webm", contents, "audio/webm")}

#     async with httpx.AsyncClient(timeout=120.0) as client:
#         resp = await client.post(
#             "https://api.openai.com/v1/audio/transcriptions",
#             headers=headers,
#             data=data,
#             files=files,
#         )
#     if resp.status_code != 200:
#         return {"error": resp.text, "status": resp.status_code}

#     res_json = resp.json()
#     # OpenAI returns e.g. {"text": "transcribed text ..."}
#     raw_text = res_json.get("text", "")

#     corrected = simple_correction(raw_text)
#     return {"raw_text": raw_text, "corrected_text": corrected}


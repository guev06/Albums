from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.albums import router as album_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow ALL origins (debugging only)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

app.include_router(album_router, prefix="/albums")

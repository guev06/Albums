from pydantic import BaseModel
from typing import List, Optional


class Album(BaseModel):
    id: Optional[int]=None
    title: str
    artist: str
    year: int
    genre: int
    cover: str
    stream: str
    deleted: bool
    viewcount: int

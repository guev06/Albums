from database import engine,Base
from models.album_model import Album
from models.Genres import Genres
Base.metadata.create_all(bind=engine)
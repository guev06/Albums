from fastapi import APIRouter,Depends,HTTPException
router = APIRouter()
from sqlalchemy.orm import Session
from database import get_db
from services.albums import add_album
from schemas.album import Album as AlbumSchema
from services.albums import get_albums_from_db,get_album_by_id,delete_album,get_albums_by_genres,get_album_by_artist, get_album_by_title
from models.album_model import Album
from models.Genres import Genres


# @router.get("/genres")
# def get_genres_route(new_album: AlbumSchema, db :Session = Depends(get_db)):
#     return add_album(db, new_album)



@router.post("/")
def add_album_route(new_album: AlbumSchema, db :Session = Depends(get_db)):
    return add_album(db, new_album)

@router.delete("/{id}")
def delete_album_route(id: int, db: Session = Depends(get_db)):
    return delete_album(db, id)

@router.get("/")
def get_albums_route(db:Session = Depends(get_db)):
    return get_albums_from_db(db)

@router.get("/{id}")
def get_album_route_id(id: int, db: Session = Depends(get_db)):
    # Pass the 'id' from the path to 'get_album_by_id'
    return get_album_by_id(db, id)

@router.get("/search/name/{artist}")
def get_album_route_artist(artist: str, db: Session = Depends(get_db)):
    # Pass the 'id' from the path to 'get_album_by_id'
    return get_album_by_artist(db, artist)

@router.get("/search/title/{title}")
def get_album_route_title(title: str, db: Session = Depends(get_db)):
    # Pass the 'id' from the path to 'get_album_by_id'
    return get_album_by_title(db, title)


@router.get("/genres/{id}")
def get_genres(id:int, db: Session=Depends(get_db)):
    return get_albums_by_genres(db, id)


import logging
logging.basicConfig(level=logging.INFO)

@router.put("/{id}")
def update_album(id: int, album: AlbumSchema, db: Session = Depends(get_db)):
    logging.info(f"Updating album with ID {id} with data: {album}")
    
    album_to_update = db.query(Album).filter(Album.id == id).first()

    if not album_to_update:
        logging.error(f"Album with ID {id} not found")
        raise HTTPException(status_code=404, detail="Album not found")

    album_to_update.title = album.title
    album_to_update.artist = album.artist
    album_to_update.year = album.year
    album_to_update.genre = album.genre
    album_to_update.cover = album.cover
    album_to_update.stream = album.stream

    db.commit()
    db.refresh(album_to_update)
    logging.info(f"Album updated successfully: {album_to_update}")
    return album_to_update



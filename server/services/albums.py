from sqlalchemy.orm import Session
from models.album_model import Album
from schemas.album import Album as AlbumSchema
from fastapi import HTTPException
from models.album_model import Album 

def add_album(db: Session,album:AlbumSchema):
    db_album=Album(
        year=album.year,
         title=album.title,
         genre=album.genre,
         artist=album.artist,
         cover= album.cover,
         stream= album.stream,
    )
    db.add(db_album)
    db.commit()
    db.refresh(db_album)
    return db_album

def get_albums_from_db(db: Session):
    return db.query(Album).filter(Album.deleted == False).all()



def delete_album(db: Session, album_id: int):
    """Hard delete an album from the database."""
    album = db.query(Album).filter(Album.id == album_id).first()

    if not album:
        raise HTTPException(status_code=404, detail="Album not found")

    db.delete(album)
    db.commit()
    return {"message": "Album deleted successfully"}





def get_album_by_id(db: Session, album_id: int):
    album = db.query(Album).filter(Album.id == album_id).first()
    if album is None:
        raise HTTPException(status_code=404, detail="Album not found")
    return album

def get_albums_by_genres(db: Session, album_genre: int):
    albums = db.query(Album).filter(Album.genre == album_genre).all()
    print(albums)
    if not albums:
        raise HTTPException(status_code=404, detail="No albums found for this genre")
    return albums


def update_album(db: Session, album_id: int, updated_album: AlbumSchema):
    album = db.query(Album).filter(Album.id == album_id).first()
    
    if not album:
        return {"error": "Album not found"}

    album.title = updated_album.title
    album.artist = updated_album.artist
    album.year = updated_album.year
    album.genre = updated_album.genre
    album.cover = updated_album.cover
    album.stream = updated_album.stream

    db.commit()
    db.refresh(album)
    return album



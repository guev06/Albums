from sqlalchemy import Column, String, Integer,DateTime,Boolean
from database import Base
from sqlalchemy.ext.declarative import declarative_base


class Album(Base):
    __tablename__="albums"
    id=Column(Integer, primary_key=True, index=True)
    year=Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    genre=Column(Integer,nullable=False)
    artist=Column(String,nullable=False)
    cover=Column(String,nullable=False)
    stream=Column(String,nullable=False)
    deleted=Column(Boolean,default=False)

  
from sqlalchemy import Column, String,ARRAY,Integer
from database import Base


class Genres(Base):
    __tablename__='Genres'
    id=Column(Integer,primary_key=True,index=True)
    name = Column(String,nullable=False)
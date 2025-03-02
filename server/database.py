from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import 
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://postgres:DaTApAss2307@localhost:5432/albums_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)
Base = declarative_base()

def get_db():
    db=SessionLocal()
    try:
        yield db#_SessionLocal
    finally:
        db.close()

mydb=get_db()
print()

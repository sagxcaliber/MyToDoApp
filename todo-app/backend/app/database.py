from sqlmodel import create_engine, Session, SQLModel
import os


# Use environment variable for database URL, fallback to local file
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")

# SQLite needs check_same_thread False when used with multiple threads
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

def get_session():
    with Session(engine) as session:
        yield session

def init_db():
    SQLModel.metadata.create_all(engine)


init_db()
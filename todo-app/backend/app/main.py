import uvicorn
from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session
from fastapi.middleware.cors import CORSMiddleware
from .database import get_session, init_db
from .models import Todo
from .crud import get_todos, get_todo, create_todo, update_todo, delete_todo

app = FastAPI(title="Todo API")

# Allow local frontend (vite dev or nginx build)
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:3002",
    "http://localhost",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/todos")
def list_todos(session: Session = Depends(get_session)):
    return get_todos(session)

@app.get("/todos/{todo_id}")
def read_todo(todo_id: int, session: Session = Depends(get_session)):
    todo = get_todo(session, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@app.post("/todos", status_code=201)
def create_todo_endpoint(todo: Todo, session: Session = Depends(get_session)):
    return create_todo(session, todo)

@app.put("/todos/{todo_id}")
def update_todo_endpoint(todo_id: int, todo: Todo, session: Session = Depends(get_session)):
    existing = get_todo(session, todo_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Todo not found")
    # only update provided fields
    updated = update_todo(session, todo_id,
                          title=todo.title,
                          description=todo.description,
                          completed=todo.completed)
    return updated

@app.delete("/todos/{todo_id}", status_code=204)
def delete_todo_endpoint(todo_id: int, session: Session = Depends(get_session)):
    ok = delete_todo(session, todo_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Todo not found")
    return None

from sqlmodel import select
from models import Todo
from sqlmodel import Session

def get_todos(session: Session):
    return session.exec(select(Todo).order_by(Todo.id)).all()

def get_todo(session: Session, todo_id: int):
    return session.get(Todo, todo_id)

def create_todo(session: Session, todo: Todo):
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo

def update_todo(session: Session, todo_id: int, **fields):
    todo = session.get(Todo, todo_id)
    if not todo:
        return None
    for k, v in fields.items():
        setattr(todo, k, v)
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo

def delete_todo(session: Session, todo_id: int):
    todo = session.get(Todo, todo_id)
    if not todo:
        return False
    session.delete(todo)
    session.commit()
    return True

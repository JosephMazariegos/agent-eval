from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Temporary in-memory storage (we'll replace with real DB later)
tasks = []

# initialize a task id starting from 1
next_task_id = 1

# Define our Task model
class Task(BaseModel):
    title: str
    description: str

@app.get("/")
def read_root():
    return {"message": "AgentEval backend is running"}

# Add a POST endpoint (create a task)
@app.post("/tasks")
def create_task(task: Task):
    global next_task_id
    
    new_task = {
        "id": next_task_id,
        "title": task.title,
        "description": task.description,
    }

    tasks.append(new_task)
    next_task_id += 1 # increment task id for next task

    return {"message": "Task created", "task": new_task}

# Add a GET endpoint (view tasks)
@app.get("/tasks/{task_id}")
def get_task(task_id: int):
    for task in tasks:
        if task["id"] == task_id:
            return {"task": task}

    raise HTTPException(status_code=404, detail="Task not found")
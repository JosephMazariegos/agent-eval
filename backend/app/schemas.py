from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: str

class TaskResponse(BaseModel):
    id: int
    title: str
    description: str

    class Config:
        from_attributes = True

class TaskUpdate(BaseModel):
    title: str
    description: str
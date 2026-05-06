from sqlalchemy import Column, Integer, String
from app.database import Base

class TaskDB(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)

class SubmissionsDB(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, nullable=False)
    tool_name = Column(String, nullable=False)
    prompt_used = Column(String, nullable=False)
    generated_code = Column(String, nullable=False)
    iteration_count = Column(Integer, nullable=False, default=1)
    manual_edits = Column(Integer, nullable=False, default=0)
    time_spent_seconds = Column(Integer, nullable=False, default=0)
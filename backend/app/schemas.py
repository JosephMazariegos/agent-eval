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

class SubmissionCreate(BaseModel):
    tool_name: str
    prompt_used: str
    generated_code: str
    iteration_count: int = 1
    manual_edits: int = 0
    time_spent_seconds: int = 0

class SubmissionResponse(BaseModel):
    id: int
    task_id: int
    tool_name: str
    prompt_used: str
    generated_code: str
    iteration_count: int
    manual_edits: int
    time_spent_seconds: int

    class Config:
        from_attributes = True

class EvaluationCreate(BaseModel):
    tests_passed: int = 0
    tests_failed: int = 0
    runtime_ms: int = 0
    lint_errors: int = 0
    score: int = 0
    notes: str | None = None

class EvaluationResponse(BaseModel):
    id: int
    submission_id: int
    tests_passed: int
    tests_failed: int
    runtime_ms: int
    lint_errors: int
    score: int
    notes: str | None = None

    class Confid:
        from_attributes = True
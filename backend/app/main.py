from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app import models, schemas
from app.database import SessionLocal, engine

models.TaskDB.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "AgentEval backend is running"}

# Add a POST endpoint (create a task)
@app.post("/tasks", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = models.TaskDB(title=task.title, description=task.description)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.get("/tasks", response_model=list[schemas.TaskResponse])
def get_tasks(db: Session =  Depends(get_db)):
    return db.query(models.TaskDB).all()

# Add a GET endpoint (view tasks)
@app.get("/tasks/{task_id}", response_model=schemas.TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.TaskDB).filter(models.TaskDB.id == task_id).first()

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return task

@app.put("/tasks/{task_id}", response_model=schemas.TaskUpdate)
def update_task(task_id: int, updated_task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(models.TaskDB).filter(models.TaskDB.id == task_id).first()

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    task.title = updated_task.title
    task.description = updated_task.description

    db.commit()
    db.refresh(task)

    return task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.TaskDB).filter(models.TaskDB.id == task_id).first()

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()

    return {"message": "Task deleted successfully"}

@app.post("/tasks/{task_id}/submissions", response_model=schemas.SubmissionResponse)
def create_submission(
    task_id: int,
    submission: schemas.SubmissionCreate,
    db: Session = Depends(get_db)
):
    task = db.query(models.TaskDB).filter(models.TaskDB.id == task_id).first()

    if task is None:
        raise HTTPException(status_code=404, detail="TESTING ERROR!!!")

    db_submission = models.SubmissionsDB(
        task_id=task_id,
        tool_name=submission.tool_name,
        prompt_used=submission.prompt_used,
        generated_code=submission.generated_code,
        iteration_count=submission.iteration_count,
        manual_edits=submission.manual_edits,
        time_spent_seconds=submission.time_spent_seconds
    )

    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)

    return db_submission

@app.get("/tasks/{task_id}/submissions", response_model=list[schemas.SubmissionResponse])
def get_submissions_for_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    task = db.query(models.TaskDB).filter(models.TaskDB.id == task_id).first()

    if task is None:
        raise HTTPException(status_code=404, detail="TESTING ERROR 2!")

    return (
        db.query(models.SubmissionsDB).filter(models.SubmissionsDB.task_id == task_id).all()
    )

@app.post(
    "/submissions/{submission_id}/evaluation",
    response_model=schemas.EvaluationResponse
)
def create_evaluation(
    submission_id: int,
    evaluation: schemas.EvaluationCreate,
    db: Session = Depends(get_db),
):
    submission = (db.query(models.SubmissionsDB).filter(models.SubmissionsDB.id == submission_id).first())

    if submission is None:
        raise HTTPException(status_code=404, detail="Submission not found")

    db_evaluation = models.EvaluationResultDB(
        submission_id = submission_id,
        tests_passed = evaluation.tests_passed,
        tests_failed = evaluation.tests_failed,
        runtime_ms = evaluation.runtime_ms,
        lint_errors = evaluation.lint_errors,
        score = evaluation.score,
        notes = evaluation.notes,
    )

    db.add(db_evaluation)
    db.commit()
    db.refresh(db_evaluation)

    return db_evaluation

@app.get(
    "/submissions/{submission_id}/evaluation",
    response_model=list[schemas.EvaluationResponse]
)
def get_evaluations_for_submission(
    submission_id: int,
    db : Session = Depends(get_db)
):
    submission = (db.query(models.SubmissionsDB).filter(models.SubmissionsDB.id == submission_id).first())

    if submission is None:
        raise HTTPException(status_code=404, detail="Submission not found")

    return (
        db.query(models.EvaluationResultDB).filter(models.EvaluationResultDB.submission_id == submission_id).all())
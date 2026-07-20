from typing import List
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, schemas 
from backend.database import engine, get_db
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)
app = FastAPI(title="SUMUP API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # React adress
    allow_credentials=True,
    allow_methods=["*"], # GET, POST, PUT, DELETE
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"status": "Server is running!"}

@app.get("/db-test")
def test_database(db: Session = Depends(get_db)):
    return {"message": "Connection to the database is successful"}

@app.post("/projects/", response_model=schemas.projectResponse)
def create_project(project:schemas.projectCreate, db: Session = Depends(get_db)):
    db_project = models.Project(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


@app.get("/projects/", response_model=List[schemas.projectResponse])
def get_projects(db: Session = Depends(get_db)):
    projects = db.query(models.Project).all()
    return projects
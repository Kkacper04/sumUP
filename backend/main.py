from typing import List
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, schemas 
from backend.database import engine, get_db


models.Base.metadata.create_all(bind=engine)
app = FastAPI(title="SUMUP API")

@app.get("/")
def read_root():
    return {"status": "Server is running!"}

@app.get("/db-test")
def test_database(db: Session = Depends(get_db)):
    return {"message": "Connection to the database is successful"}
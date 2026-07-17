from fastapi import FastAPI

app = FastAPI(title="sumUP api")

@app.get("/")
def read_root():
    return {"status": "Works"}
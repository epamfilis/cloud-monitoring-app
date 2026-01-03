from fastapi import FastAPI
import os, socket, time

app = FastAPI()

@app.get("/")
def root():
    return {"message": "hello from docker", "version": os.getenv("APP_VERSION", "dev")}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/debug")
def debug():
    return {"hostname": socket.gethostname(), "time": int(time.time())}

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os, socket, time

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
def root():
    return FileResponse("static/index.html")


@app.get("/api")
def api_info():
    return {"message": "hello from docker", "version": os.getenv("APP_VERSION", "dev")}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/debug")
def debug():
    return {"hostname": socket.gethostname(), "time": int(time.time())}

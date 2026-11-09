from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import engine, Base
from app.routers import auth, movies

# បង្កើត Table ក្នុង Database SQLite ដោយស្វ័យប្រវត្តិពេល Server Run
Base.metadata.create_all(bind=engine)

# បង្កើត instance app
app = FastAPI(title="Ousa Movie API", version="1.0.0")

# បើកសិទ្ធិ CORS ឱ្យ React Frontend អាចផ្ញើ Request មកបាន
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ភ្ជាប់ Router ទាំងអស់
app.include_router(auth.router)
app.include_router(movies.router)

@app.get("/")
def read_root():
    return {"status": "online", "message": "Ousa Movie API is running!"}
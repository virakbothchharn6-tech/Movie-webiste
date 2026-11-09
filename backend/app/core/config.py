from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Ousa Movie API"
    SECRET_KEY: str = "ousa_movie_super_secret_jwt_key_2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 ថ្ងៃ
    DATABASE_URL: str = "sqlite:///./ousa_movie.db"

    class Config:
        case_sensitive = True

settings = Settings()
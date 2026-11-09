from pydantic import BaseModel, ConfigDict

class MovieBase(BaseModel):
    tmdb_id: int | None = None
    title: str
    overview: str = ""
    overview_km: str = ""
    backdrop_path: str = ""
    poster_path: str = ""
    vote_average: float = 0.0
    release_date: str = ""

class MovieCreate(MovieBase):
    pass

class MovieUpdate(BaseModel):
    tmdb_id: int | None = None
    title: str | None = None
    overview: str | None = None
    overview_km: str | None = None
    backdrop_path: str | None = None
    poster_path: str | None = None
    vote_average: float | None = None
    release_date: str | None = None

class MovieOut(MovieBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
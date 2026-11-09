from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter(prefix="/movies", tags=["Movies"])

TMDB_API_KEY = "ced669a457e4b85d61dd79984ccabd1e"

# 1. API បកប្រែអត្ថបទពី English ទៅ Khmer (គ្មានបញ្ហា CORS)
@router.get("/translate")
async def translate_to_khmer(text: str):
    if not text.strip():
        return {"translated": ""}
    
    try:
        url = "https://translate.googleapis.com/translate_a/single"
        params = {
            "client": "gtx",
            "sl": "en",
            "tl": "km",
            "dt": "t",
            "q": text[:350]
        }
        async with httpx.AsyncClient(timeout=10.0) as client:
            res = await client.get(url, params=params)
            data = res.json()
            if data and data[0]:
                translated = "".join([part[0] for part in data[0] if part[0]])
                return {"translated": translated}
    except Exception as e:
        print("Translate error:", e)
    
    return {"translated": text}

# 2. API Stream មើលរឿង
@router.get("/watch/{movie_id}")
def get_watch_stream(movie_id: int):
    servers = [
        {"name": "Server 1 (VIP)", "url": f"https://vidsrc.xyz/embed/movie?tmdb={movie_id}"},
        {"name": "Server 2 (Fast)", "url": f"https://vidsrc.cc/v2/embed/movie/{movie_id}"},
        {"name": "Server 3 (HD)", "url": f"https://embed.su/embed/movie/{movie_id}"},
    ]
    return {"movie_id": movie_id, "servers": servers}

# 3. API ស្វែងរករឿង (Search)
@router.get("/search")
async def search_movies(query: str):
    if not query.strip():
        return []

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            res_en = await client.get(
                f"https://api.themoviedb.org/3/search/multi?api_key={TMDB_API_KEY}&query={query}&language=en-US"
            )
            data_en = res_en.json().get("results", []) if res_en.status_code == 200 else []

            res_km = await client.get(
                f"https://api.themoviedb.org/3/search/multi?api_key={TMDB_API_KEY}&query={query}&language=km-KH"
            )
            data_km = res_km.json().get("results", []) if res_km.status_code == 200 else []

        unique_movies = {}
        for item in (data_en + data_km):
            if item.get("id") and item.get("poster_path"):
                unique_movies[item["id"]] = item

        return list(unique_movies.values())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
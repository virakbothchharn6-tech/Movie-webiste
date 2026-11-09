import { useState, useEffect } from "react";
import { translations } from "./translations";

const API_KEY = "ced669a457e4b85d61dd79984ccabd1e";
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

// មុខងារកម្ចាត់ Space ស្កាត់ៗរវាងតួអក្សរខ្មែរ
const cleanKhmer = (text) => {
  if (!text) return "";
  return text.replace(/([\u1780-\u17D3])\s+(?=[\u1780-\u17D3])/g, "$1");
};

const Slideshow = ({ lang, onWatchMovie }) => {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);
  const [khmerOverviews, setKhmerOverviews] = useState({});

  const t = translations[lang] || translations.en;

  // ១. ទាញយកកំពូលភាពយន្តល្បីៗដែលបានចាក់បញ្ចាំងរួច (ធានាថាមាន File វីដេអូ ១០០%)
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc&vote_count.gte=10000&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          // យករឿងកំពូលៗចំនួន ៦ (Inception, Interstellar, The Dark Knight...)
          setMovies(data.results.slice(0, 6));
        }
      })
      .catch((err) => console.error("Error fetching TMDB:", err));
  }, []);

  // ២. បកប្រែសាច់រឿងតាម Backend FastAPI
  useEffect(() => {
    if (lang !== "km" || movies.length === 0) return;

    movies.forEach(async (movie) => {
      if (khmerOverviews[movie.id] || !movie.overview) return;

      try {
        const res = await fetch(
          `http://localhost:8000/movies/translate?text=${encodeURIComponent(
            movie.overview
          )}`
        );
        const data = await res.json();
        if (data.translated) {
          setKhmerOverviews((prev) => ({
            ...prev,
            [movie.id]: data.translated,
          }));
        }
      } catch (err) {
        console.error("Translation fetch error:", err);
      }
    });
  }, [lang, movies, khmerOverviews]);

  const prev = () =>
    setCurrent((c) => (c === 0 ? movies.length - 1 : c - 1));

  const next = () =>
    setCurrent((c) => (c === movies.length - 1 ? 0 : c + 1));

  useEffect(() => {
    if (movies.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c === movies.length - 1 ? 0 : c + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [movies.length]);

  if (movies.length === 0) {
    return (
      <div className="relative h-[75vh] w-full md:h-[88vh] flex items-center justify-center bg-neutral-900 text-gray-400">
        {t.loading}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="relative h-[75vh] md:h-[88vh] w-full overflow-hidden select-none">
        {movies.map((movie, index) => {
          const rawText =
            lang === "km" && khmerOverviews[movie.id]
              ? khmerOverviews[movie.id]
              : movie.overview;

          const overviewText = lang === "km" ? cleanKhmer(rawText) : rawText;

          return (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === current ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                src={`${IMAGE_BASE}${movie.backdrop_path}`}
                alt={movie.title}
                className="h-full w-full object-cover object-top"
              />

              {/* Gradient Dark Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/40 to-transparent" />

              {/* Movie Info */}
              <div className="absolute bottom-16 left-6 max-w-xl md:bottom-24 md:left-16 z-20 space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-md leading-[1.1]">
                  {movie.title}
                </h2>

                <p className="text-sm md:text-[15px] text-gray-300 leading-relaxed line-clamp-3 font-normal drop-shadow">
                  {overviewText}
                </p>

                {/* ប៊ូតុងទស្សនា (បញ្ជូនរឿងទៅចាក់ក្នុង WatchModal) */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onWatchMovie && onWatchMovie(movies[current])}
                    className="rounded-lg bg-red-600 px-7 py-2.5 text-sm md:text-base font-semibold text-white tracking-wide transition hover:bg-red-700 shadow-lg shadow-red-600/40 cursor-pointer active:scale-95 duration-150"
                  >
                    {t.watchNow}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prev / Next buttons */}
      <button
        type="button"
        onClick={prev}
        className="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 group-hover:bg-black/70 transition">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15 19-7-7 7-7" />
          </svg>
        </span>
      </button>

      <button
        type="button"
        onClick={next}
        className="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 group-hover:bg-black/70 transition">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Slideshow;
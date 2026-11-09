import { useState, useEffect } from "react";
import Header from "./components/Header";
import Slideshow from "./components/Slideshow";
import Footer from "./components/Footer";
import WatchModal from "./components/WatchModal";
import AuthModal from "./components/AuthModal";
import AdminDashboard from "./components/AdminDashboard";

const TMDB_API_KEY = "ced669a457e4b85d61dd79984ccabd1e";

function App() {
  const [lang, setLang] = useState("km");
  const [moviesList, setMoviesList] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");

  // Modals
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // ១. ទាញយកភាពយន្តចាស់ៗល្បីៗ + Anime ល្បីៗដាក់តាំងលើ Grid ដំបូង
  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        const tmdbLang = lang === "km" ? "km-KH" : "en-US";
        
        // ទាញយករឿងល្បីៗដែលបានចេញរួច
        const resMovies = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&sort_by=vote_count.desc&vote_count.gte=5000&primary_release_date.lte=2024-12-31&language=${tmdbLang}`
        );
        const dataMovies = await resMovies.json();

        // ទាញយក Anime ជប៉ុនល្បីៗ
        const resAnime = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=16&with_original_language=ja&sort_by=vote_count.desc&vote_count.gte=300&language=${tmdbLang}`
        );
        const dataAnime = await resAnime.json();

        // បញ្ចូលគ្នាឆ្លាស់គ្នា (Movies + Anime)
        const combined = [];
        const maxLen = Math.max(dataMovies.results?.length || 0, dataAnime.results?.length || 0);
        for (let i = 0; i < maxLen; i++) {
          if (dataMovies.results?.[i]) combined.push(dataMovies.results[i]);
          if (dataAnime.results?.[i]) combined.push(dataAnime.results[i]);
        }

        setMoviesList(combined.slice(0, 24));
        setSectionTitle(lang === "km" ? "ភាពយន្ត និង អានីមេល្បីៗ" : "Top Movies & Anime");
      } catch (err) {
        console.error("Error loading initial movies:", err);
      }
    };

    fetchInitialMovies();
  }, [lang]);

  // Search ពីរភាសា
  const handleSearch = async (query) => {
    try {
      const res = await fetch(`http://localhost:8000/movies/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setMoviesList(data);
      setSectionTitle(lang === "km" ? `លទ្ធផលស្វែងរក: "${query}"` : `Search: "${query}"`);
    } catch {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setMoviesList(data.results || []);
      setSectionTitle(`Search: "${query}"`);
    }
  };

  const handleDataFromHeader = (movies, title, key) => {
    if (key === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setMoviesList(movies);
    setSectionTitle(title);
    setTimeout(() => {
      document.getElementById("movie-section")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between font-['Kantumruy_Pro',sans-serif]">
      {/* Header */}
      <Header
        lang={lang}
        setLang={setLang}
        onFetchData={handleDataFromHeader}
        onSearchDual={handleSearch}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onLogout={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setCurrentUser(null);
        }}
      />

      {/* Main Content */}
      <main className="w-full grow">
        <Slideshow lang={lang} onWatchMovie={(movie) => setSelectedMovie(movie)} />

        {/* បញ្ជី Grid រឿង និង Anime */}
        {moviesList.length > 0 && (
          <section id="movie-section" className="scroll-mt-20 px-6 md:px-14 py-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6 tracking-wide text-white">
              {sectionTitle}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {moviesList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedMovie(item)}
                  className="group relative overflow-hidden rounded-lg bg-neutral-900 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/70 cursor-pointer"
                >
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : "https://via.placeholder.com/500x750?text=No+Poster"
                    }
                    alt={item.title || item.name}
                    className="h-auto w-full object-cover"
                  />
                  <div className="p-2.5">
                    <p className="truncate text-sm font-semibold text-white">
                      {item.title || item.name}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                      <span>{(item.release_date || item.first_air_date)?.split("-")[0] || ""}</span>
                      <span className="text-amber-400 font-bold">★ {item.vote_average?.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Modals */}
      <WatchModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} lang={lang} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={(u) => setCurrentUser(u)} />
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default App;
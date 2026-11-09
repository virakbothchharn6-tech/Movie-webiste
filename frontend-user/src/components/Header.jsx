import { useState } from "react";
import { translations } from "./translations";

const API_KEY = "ced669a457e4b85d61dd79984ccabd1e";

const languages = [
  {
    code: "km",
    name: "ភាសាខ្មែរ",
    label: "KH",
    flag: "https://flagcdn.com/w80/kh.png",
  },
  {
    code: "en",
    name: "English",
    label: "EN",
    flag: "https://flagcdn.com/w80/gb.png",
  },
];

const Header = ({
  lang,
  setLang,
  onFetchData,
  onSearchDual,
  onOpenAuth,
  currentUser,
  onOpenAdmin,
  onLogout,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState("Home");

  const t = translations[lang] || translations.en;
  const currentLang = languages.find((item) => item.code === lang) || languages[0];

  // បញ្ជី Menu ដែលទាញយកតែកំពូលរឿងចេញរួច និង Anime ល្បីៗ
  const navLinks = [
    { 
      key: "home", 
      name: t.home, 
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc&vote_count.gte=8000` 
    },
    { 
      key: "movies", 
      name: t.movies, 
      // ទាញយកតែភាពយន្តដែលបានចេញរួច និងមានពិន្ទុខ្ពស់ (ធានាថាមាន File វីដេអូចាក់ចេញ ១០០%)
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&vote_count.gte=2000&primary_release_date.lte=2024-12-31` 
    },
    { 
      key: "anime", 
      name: lang === "km" ? "អានីមេ" : "Anime", 
      // ទាញយក Anime ជប៉ុនល្បីៗ (Animation + Japanese Language)
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16&with_original_language=ja&sort_by=vote_count.desc&vote_count.gte=200` 
    },
    { 
      key: "tvShows", 
      name: t.tvShows, 
      url: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&sort_by=vote_count.desc&vote_count.gte=1000` 
    },
    { 
      key: "trending", 
      name: t.trending, 
      url: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=revenue.desc&vote_count.gte=5000` 
    },
  ];

  const handleNavClick = async (link) => {
    setActiveMenu(link.name);
    setOpen(false);

    if (link.key === "home") {
      if (onFetchData) onFetchData([], link.name, "home");
      return;
    }

    try {
      const tmdbLang = lang === "km" ? "km-KH" : "en-US";
      const res = await fetch(`${link.url}&language=${tmdbLang}`);
      const data = await res.json();
      if (onFetchData && data.results) {
        onFetchData(data.results, link.name, link.key);
      }
    } catch (err) {
      console.error("Error loading category:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    if (onSearchDual) onSearchDual(query);
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-neutral-950/80 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Brand */}
        <button
          onClick={() => handleNavClick(navLinks[0])}
          className="text-2xl font-extrabold tracking-wide text-white cursor-pointer uppercase"
        >
          Ousa <span className="text-red-600">Movie</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.key}
              type="button"
              onClick={() => handleNavClick(link)}
              className={`text-sm font-medium transition cursor-pointer ${
                activeMenu === link.name ? "text-red-500 font-bold" : "text-gray-300 hover:text-white"
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="hidden items-center gap-3 md:flex">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-48 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white placeholder-gray-400 outline-none ring-1 ring-white/20 focus:ring-red-600 transition"
            />
          </form>

          {/* Language Dropdown */}
          <div className="relative group py-2">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-xs font-semibold text-gray-200 group-hover:border-red-600 group-hover:text-white transition cursor-pointer"
            >
              <img src={currentLang.flag} alt={currentLang.name} className="w-6 h-4 object-cover rounded-xs" />
              <span>{currentLang.label}</span>
              <svg className="w-3.5 h-3.5 text-gray-400 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m19 9-7 7-7-7" />
              </svg>
            </button>

            <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out absolute right-0 top-full pt-1.5 w-40 z-50">
              <div className="rounded-xl bg-black/60 backdrop-blur-xl border border-white/15 py-1.5 shadow-2xl overflow-hidden">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setLang(item.code)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2 text-left text-xs transition duration-150 cursor-pointer ${
                      lang === item.code ? "text-red-500 font-bold bg-white/10" : "text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    <img src={item.flag} alt={item.name} className="w-6 h-4 object-cover rounded-xs" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User / Sign In */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              {currentUser.is_admin && (
                <button
                  onClick={onOpenAdmin}
                  className="rounded-md border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-yellow-400 hover:border-yellow-500 transition cursor-pointer"
                >
                  Dashboard
                </button>
              )}
              <span className="text-xs text-gray-300 font-medium">👤 {currentUser.username}</span>
              <button
                onClick={onLogout}
                className="rounded-md bg-neutral-800 px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-neutral-700 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="rounded-md bg-red-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-red-700 shadow-md shadow-red-600/30 cursor-pointer"
            >
              {t.signIn}
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setLang(lang === "en" ? "km" : "en")}
            className="px-2.5 py-1 rounded-full border border-white/20 bg-black/30 text-xs text-gray-200"
          >
            <img src={currentLang.flag} alt={currentLang.name} className="w-5 h-3.5 object-cover" />
          </button>
          <button onClick={() => setOpen(!open)} className="text-2xl text-white p-1">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="space-y-4 bg-black/90 backdrop-blur-xl px-4 pb-6 pt-2 md:hidden border-b border-white/10">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-full bg-white/10 px-4 py-2 text-sm text-white placeholder-gray-400 outline-none ring-1 ring-white/20 focus:ring-red-600"
            />
          </form>
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.key}
                type="button"
                onClick={() => handleNavClick(link)}
                className="text-left text-sm py-1 text-gray-300 hover:text-white"
              >
                {link.name}
              </button>
            ))}
          </div>
          {currentUser ? (
            <button onClick={onLogout} className="w-full rounded-md bg-neutral-800 py-2 font-semibold text-white">
              Logout ({currentUser.username})
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                onOpenAuth();
              }}
              className="w-full rounded-md bg-red-600 py-2 font-semibold text-white"
            >
              {t.signIn}
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
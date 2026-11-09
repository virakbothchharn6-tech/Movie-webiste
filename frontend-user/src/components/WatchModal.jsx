import { useState, useEffect } from "react";

const WatchModal = ({ movie, onClose, lang }) => {
  const [selectedServerIndex, setSelectedServerIndex] = useState(0);

  useEffect(() => {
    setSelectedServerIndex(0);
  }, [movie]);

  if (!movie) return null;

  // បញ្ជី Embed Stream Servers សកម្មបំផុតសម្រាប់ភាពយន្តដែលបានចេញរួច
  const servers = [
    {
      name: "Server 1 (VidSrc)",
      url: `https://vidsrc.me/embed/movie?tmdb=${movie.id}`,
    },
    {
      name: "Server 2 (MultiEmbed)",
      url: `https://multiembed.mov/?video_id=${movie.id}&tmdb=1`,
    },
    {
      name: "Server 3 (EmbedSu)",
      url: `https://embed.su/embed/movie/${movie.id}`,
    },
  ];

  const currentStreamUrl = servers[selectedServerIndex]?.url || servers[0].url;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900/90 border-b border-neutral-800">
          <div>
            <h3 className="text-white font-bold text-base md:text-lg truncate max-w-md">
              {movie.title || movie.name}
            </h3>
            <span className="text-xs text-gray-400">
              {lang === "km" ? "កំពុងចាក់ផ្សាយកម្រិត Full HD" : "Streaming in Full HD"}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 text-gray-300 hover:bg-red-600 hover:text-white flex items-center justify-center text-sm transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            key={currentStreamUrl}
            src={currentStreamUrl}
            title={movie.title || "Movie Player"}
            className="w-full h-full border-0"
            allowFullScreen
            referrerPolicy="origin"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {/* របារប្តូរ Server */}
        <div className="p-3.5 bg-neutral-900/80 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-gray-400 font-semibold shrink-0">
            {lang === "km" ? "ប្តូរម៉ាស៊ីនមេ (Servers):" : "Servers:"}
          </span>
          {servers.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedServerIndex(idx)}
              className={`px-3 py-1.5 rounded-md font-medium transition cursor-pointer shrink-0 ${
                selectedServerIndex === idx
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchModal;
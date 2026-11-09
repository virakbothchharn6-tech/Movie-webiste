import React from 'react';

const VideoPlayer = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <div className="w-full max-w-5xl bg-neutral-900 rounded-xl overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-red-600 rounded-full p-2 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        {/* Using a sample open-source movie for the demo */}
        <video 
          controls 
          autoPlay 
          className="w-full aspect-video"
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        >
          Your browser does not support the video tag.
        </video>
        
        <div className="p-6 bg-neutral-900">
          <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
          <p className="text-gray-400 text-sm">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
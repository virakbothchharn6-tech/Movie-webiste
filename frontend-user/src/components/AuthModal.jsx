import { useState } from "react";

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isLogin ? "/auth/signin" : "/auth/signup";
    const payload = isLogin ? { email, password } : { username, email, password };

    try {
      const res = await fetch(`http://localhost:8000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "ការផ្ទៀងផ្ទាត់មិនជោគជ័យឡើយ!");
      }

      // រក្សាទុក Token និង User Info ក្នុង Browser
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data));
      
      onLoginSuccess(data);
      onClose();
    } catch (err) {
      if (err.message.includes("Failed to fetch")) {
        setError("មិនអាចភ្ជាប់ទៅកាន់ Backend Server បានទេ! សូមប្រាកដថា uvicorn កំពុង run លើ Port 8000");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl bg-neutral-900 border border-neutral-800 p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-base cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-white mb-5 text-center">
          {isLogin ? "ចូលគណនី (Sign In)" : "ចុះឈ្មោះ (Sign Up)"}
        </h2>

        {error && (
          <div className="mb-4 text-xs text-red-400 bg-red-950/60 border border-red-800/60 p-2.5 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <input
                type="text"
                required
                placeholder="ឈ្មោះអ្នកប្រើប្រាស់ (Username)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg bg-neutral-800/90 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-neutral-700 focus:ring-red-600 transition"
              />
            </div>
          )}

          <div>
            <input
              type="email"
              required
              placeholder="អ៊ីមែល (Email Address)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-neutral-800/90 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-neutral-700 focus:ring-red-600 transition"
            />
          </div>

          <div>
            <input
              type="password"
              required
              placeholder="ពាក្យសម្ងាត់ (Password)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-neutral-800/90 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-neutral-700 focus:ring-red-600 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition cursor-pointer shadow-lg shadow-red-600/30 disabled:opacity-50"
          >
            {loading ? "កំពុងដំណើរការ..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-gray-400">
          {isLogin ? "មិនទាន់មានគណនីមែនទេ?" : "មានគណនីរួចហើយ?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-red-500 font-bold hover:underline cursor-pointer ml-1"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
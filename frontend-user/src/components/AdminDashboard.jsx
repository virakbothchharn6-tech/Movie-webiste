import { useEffect, useState } from "react";

const AdminDashboard = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:8000/auth/users")
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error("Error fetching users:", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-neutral-800">
          <h2 className="text-lg font-bold text-white">⚙️ Admin User Dashboard</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-sm">✕</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-neutral-800 text-gray-400 uppercase">
              <tr>
                <th className="py-2.5 px-3">ID</th>
                <th className="py-2.5 px-3">Username</th>
                <th className="py-2.5 px-3">Email</th>
                <th className="py-2.5 px-3">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-neutral-800/40">
                  <td className="py-2 px-3">{u.id}</td>
                  <td className="py-2 px-3 font-semibold text-white">{u.username}</td>
                  <td className="py-2 px-3">{u.email}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.is_admin ? "bg-red-950 text-red-400 border border-red-800" : "bg-neutral-800 text-gray-400"}`}>
                      {u.is_admin ? "ADMIN" : "USER"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
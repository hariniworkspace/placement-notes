import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  NotebookPen,
  Brain,
  Cpu,
  Network,
  Database,
  Layers,
  BookOpen,
  LogOut,
  X
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";
import { logoutUser } from "../services/authService";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },

  // Coding
  { name: "Coder Notes", icon: NotebookPen, path: "/notes" },

  // Placement Prep
  { name: "Aptitude", icon: Brain, path: "/aptitude" },
  
  { name: "System Design", icon: Layers, path: "/system-design" },
  { name: "OOPS", icon: BookOpen, path: "/oops" },

  // CS Fundamentals
  { name: "DBMS", icon: Database, path: "/dbms" },
  { name: "Computer Networks", icon: Network, path: "/cn" },
];


const Sidebar = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <>
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0b0f1a] border-r border-white/10 flex flex-col shadow-xl z-50">

        {/* BRAND */}
        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-2xl font-extrabold tracking-wide text-white">
            🚀 CoderNotes
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Recall-optimized learning
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {navItems.map(({ name, icon: Icon, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-pink-600/20 to-purple-600/20 text-white shadow-lg border border-pink-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Icon size={20} className="group-hover:scale-110 transition" />
              {name}
            </NavLink>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="px-3 py-4 border-t border-white/10">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut size={20} />
            Logout
          </motion.button>
        </div>
      </aside>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#0f1422] border border-white/10 rounded-xl w-[360px] p-6 shadow-xl">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Confirm Logout</h2>
              <button onClick={() => setShowLogoutModal(false)}>
                <X className="text-gray-400 hover:text-white transition" />
              </button>
            </div>

            {/* Body */}
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to logout from your account?
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

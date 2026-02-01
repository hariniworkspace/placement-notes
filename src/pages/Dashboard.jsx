import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import CoderNavbar from "../components/CoderNavbar";
import { getCoderNotes } from "../services/coderNoteService";
import toast from "react-hot-toast";
import { getProfile } from "../services/userService";
import { useNavigate } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const notesData = await getCoderNotes();
      const profileData = await getProfile();

      setNotes(notesData);
      setUser(profileData);
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  /* =================== ANALYTICS =================== */

  const total = notes.length;
  const revisionPending = notes.filter((n) => n.needsRevision).length;
  const revised = notes.filter((n) => n.isRevised).length;

  const weakNotes = notes.filter(
    (n) => n.needsRevision || (n.editCount || 0) >= 3
  );

  const strongNotes = notes.filter(
    (n) => !n.needsRevision && (n.editCount || 0) < 3
  );

  const strengthData = [
    { name: "Strong Concepts", value: strongNotes.length },
    { name: "Weak Concepts", value: weakNotes.length },
  ];

  const STRENGTH_COLORS = ["#00bfff", "#ff2d55"];

  const activityData = [
    { day: "Mon", solved: 2 },
    { day: "Tue", solved: 4 },
    { day: "Wed", solved: 1 },
    { day: "Thu", solved: 3 },
    { day: "Fri", solved: 2 },
    { day: "Sat", solved: 5 },
    { day: "Sun", solved: 1 },
  ];

  const weakAreaList = notes
    .map((note) => {
      const score =
        (note.needsRevision ? 5 : 0) +
        (note.difficulty === "Hard" ? 3 : 1) +
        (note.editCount || 0) * 0.5;

      return { ...note, weakScore: score };
    })
    .sort((a, b) => b.weakScore - a.weakScore)
    .slice(0, 5);

  if (loading) return <p className="p-8 text-white">Loading dashboard...</p>;

  return (
    
    <div className="flex min-h-screen bg-[#0b0f1a] text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-64">
        <CoderNavbar />

        <div className="p-10 space-y-10">

          {/* ================= HEADER ================= */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">
                Hello, {user?.name || "Learner"} 👋
              </h1>
              <p className="text-gray-400 mt-1">
                Track your coding journey & stay consistent
              </p>
            </div>

            <div className="bg-white/10 px-6 py-3 rounded-xl">
              <p className="text-sm text-gray-400">Today</p>
              <p className="font-semibold">
                {new Date().toDateString()}
              </p>
            </div>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid md:grid-cols-4 gap-6">
            <SquareStat title="Total Problems" value={total} />
            <SquareStat title="Weak Concepts" value={weakNotes.length} />
            <SquareStat title="Strong Concepts" value={strongNotes.length} />
            <SquareStat title="Revision Pending" value={revisionPending} />
          </div>

          {/* ================= GRAPHS ================= */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* ACTIVITY */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
              <h2 className="font-semibold mb-4">Weekly Activity</h2>

              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={activityData}>
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="solved"
                    stroke="#6366f1"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* PIE */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
              <h2 className="font-semibold mb-4">Concept Strength</h2>

              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={strengthData}
                    dataKey="value"
                    outerRadius={100}
                    innerRadius={55}
                    paddingAngle={6}
                  >
                    {strengthData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={STRENGTH_COLORS[index]}
                        style={{
                          filter: "drop-shadow(0px 0px 10px rgba(0,0,0,0.5))",
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================= WEAK AREAS ================= */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8">
            <h2 className="font-semibold mb-6 text-red-400">🔥 Weak Areas</h2>

            {weakAreaList.length === 0 ? (
              <p className="text-gray-400">No weak areas detected yet 🎯</p>
            ) : (
              <div className="space-y-3">
                {weakAreaList.map((note, index) => (
                  <div
                    key={note._id}
                    onClick={() => navigate(`/codernotes/${note._id}`)}
                    className="flex justify-between items-center border border-white/10 rounded-xl px-5 py-3 hover:bg-white/5 transition cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">
                        {index + 1}. {note.title}
                      </p>
                      <span className="text-xs text-gray-400">
                        {note.difficulty} · {note.needsRevision ? "Needs Revision" : "Stable"}
                      </span>
                    </div>

                    <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs">
                      Weak
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================= QUICK ACTIONS ================= */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6">
              🚀 Quick Actions
            </h2>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/notes")}
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition"
              >
                Add New Problem
              </button>

              <button
                onClick={() =>
                  navigate("/notes", { state: { filter: "revision" } })
                }
                className="border border-pink-500 text-pink-400 px-6 py-3 rounded-xl hover:bg-pink-500/10 transition"
              >
                Start Revision
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ================= COMPONENT ================= */

const SquareStat = ({ title, value }) => {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 text-center">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <div className="mt-3 inline-block px-4 py-1 rounded-full text-sm bg-white/10">
        {title.split(" ")[0]}
      </div>
    </div>
  );
};

export default Dashboard;

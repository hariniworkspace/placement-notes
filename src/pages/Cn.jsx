import { useState, useEffect } from "react";
import { Plus, X, Search, BookOpen, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  createCnNote,
  getCnNotes,
} from "../services/cnNoteService";

import Sidebar from "../components/Sidebar";
import CoderNavbar from "../components/CoderNavbar";

const Cn = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");

  const [completed, setCompleted] = useState({});

  /* ================= LOAD ================= */

  const loadNotes = async () => {
    const data = await getCnNotes();
    setNotes(data);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  /* ================= CREATE ================= */

  const handleCreate = async () => {
    if (!title.trim()) return;

    const newNote = await createCnNote(title);
    setShowCreate(false);
    setTitle("");
    navigate(`/cn/${newNote._id}`);
  };

  /* ================= FILTER ================= */

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= REVISION LOGIC ================= */

  const revisionNotes = notes.filter((n) => n.needsRevision);

  useEffect(() => {
    const initial = {};
    revisionNotes.forEach((n) => {
      initial[n._id] = false;
    });
    setCompleted(initial);
  }, [notes.length]);

  const completedCount = Object.values(completed).filter(Boolean).length;
  const totalRevision = revisionNotes.length;
  const pendingCount = totalRevision - completedCount;

  const progress =
    totalRevision === 0
      ? 0
      : Math.round((completedCount / totalRevision) * 100);

  const toggleComplete = (id) => {
    setCompleted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col">
        {/* NAVBAR */}
        <div className="sticky top-0 z-40 bg-[#0b0f1a]/80 backdrop-blur-md border-b border-white/10">
          <CoderNavbar />
        </div>

        <div className="flex flex-1 gap-8 px-10 py-8">
          {/* LEFT COLUMN */}
          <div className="flex-1">
            <div className="sticky top-24 z-30 bg-[#0b0f1a] pb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                  <Search size={16} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search CN notes..."
                    className="bg-transparent outline-none w-64 text-sm"
                  />
                </div>

                <button
                  onClick={() => setSearch("")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10"
                >
                  <X size={14} /> Clear
                </button>
              </div>
            </div>

            {filteredNotes.length === 0 ? (
              <p className="text-gray-400 mt-10">No CN notes yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {filteredNotes.map((n) => (
                  <div
                    key={n._id}
                    onClick={() => navigate(`/cn/${n._id}`)}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-purple-500/40 transition cursor-pointer"
                  >
                    <h3 className="text-base font-semibold mb-1">{n.title}</h3>
                    <p className="text-xs text-gray-400">
                      Open CN workspace →
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* REVISION DESK — FULL VERSION */}
          <div className="w-[340px] sticky top-28 h-fit bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <BookOpen className="text-purple-400" size={18} />
              <h2 className="text-base font-semibold text-white">
                Revision Desk
              </h2>
            </div>

            {/* Progress */}
            <div className="mb-5">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-400">Revision Progress</span>
                <span className="font-medium text-white">{progress}%</span>
              </div>

              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Completed: {completedCount}</span>
                <span>Pending: {pendingCount}</span>
              </div>
            </div>

            {/* List */}
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              <h3 className="text-xs font-semibold flex items-center gap-2 text-white mb-2">
                <CheckCircle size={14} className="text-purple-400" />
                Topics to Revise
              </h3>

              {revisionNotes.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-6">
                  No revision topics yet 🎯
                </p>
              ) : (
                revisionNotes.map((n) => (
                  <div
                    key={n._id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:bg-white/5 transition"
                  >
                    <input
                      type="checkbox"
                      checked={completed[n._id] || false}
                      onChange={() => toggleComplete(n._id)}
                      className="w-4 h-4 accent-purple-500"
                    />

                    <div
                      onClick={() => navigate(`/cn/${n._id}`)}
                      className="flex-1 cursor-pointer"
                    >
                      <p className="text-sm font-medium text-white hover:text-purple-400 transition">
                        {n.title}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* CREATE BUTTON */}
        <div className="fixed bottom-8 right-8 z-40">
          <div className="absolute -inset-1 rounded-xl bg-purple-600/30 blur-lg"></div>
          <button
            onClick={() => setShowCreate(true)}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-7 py-3.5 rounded-xl text-white font-semibold text-base bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 shadow-2xl border border-white/10 backdrop-blur-md hover:scale-105 transition-all"
          >
            <Plus size={18} />
            New Note
          </button>
        </div>

        {/* CREATE MODAL */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#0f1422] border border-white/10 rounded-2xl w-[420px] p-6 shadow-xl">
              <h2 className="text-lg font-semibold mb-6">Create CN Note</h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Eg: TCP vs UDP..."
                className="w-full bg-white/5 border border-white/10 px-4 py-2.5 rounded-lg mb-6"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreate(false)}
                  className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCreate}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/20 shadow-lg"
                >
                  Create Note
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cn;

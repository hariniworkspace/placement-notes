import { useEffect, useState, useRef } from "react";
import { Plus, X, Search, BookOpen, CheckCircle, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PageSkeleton from "../components/PageSkeleton";

import Sidebar from "../components/Sidebar";
import CoderNavbar from "../components/CoderNavbar";
import { getCoderNotes, createCoderNote } from "../services/coderNoteService";

/* ================= HELPERS ================= */

const formatTitle = (text) =>
  text
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

/* ================= CUSTOM DROPDOWN ================= */

const Dropdown = ({ value, options, onChange, width = "w-full" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className={`relative ${width}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition"
      >
        <span>{value}</span>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-[#0f1422] border border-white/10 rounded-lg shadow-2xl overflow-hidden">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition
                hover:bg-white/10
                ${value === opt ? "bg-purple-600/20 text-purple-300" : ""}
              `}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ================= COMPONENT ================= */

const CoderNotes = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const [showCreate, setShowCreate] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [priority, setPriority] = useState("Medium");
  const [companies, setCompanies] = useState("");
  const [tags, setTags] = useState("");

  /* ================= AUTH CHECK ================= */

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
      return;
    }
    loadNotes();
  }, []);

  /* ================= LOAD NOTES ================= */

  const loadNotes = async () => {
    try {
      setLoadingNotes(true);
      const data = await getCoderNotes();
      setNotes(data);
    } catch {
      toast.error("Failed to load notes");
    } finally {
      setLoadingNotes(false);
    }
  };

  /* ================= FILTERS ================= */

  const allTags = ["All", ...new Set(notes.flatMap((n) => n.tags || []))];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === "All" || note.tags?.includes(selectedTag);
    const matchesDifficulty =
      difficultyFilter === "All" || note.difficulty === difficultyFilter;

    return matchesSearch && matchesTag && matchesDifficulty;
  });

  /* ================= CREATE NOTE ================= */

  const handleCreateNote = async () => {
    if (!title.trim()) return toast.error("Title is required");

    try {
      setLoadingCreate(true);

      const payload = {
        title: formatTitle(title),
        difficulty,
        priority,
        companies: companies.split(",").map((c) => c.trim()).filter(Boolean),
        tags: tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean),
      };

      await createCoderNote(payload);
      await loadNotes();

      toast.success("Note created successfully 🎉");
      setShowCreate(false);
      setTitle("");
      setCompanies("");
      setTags("");
    } catch {
      toast.error("Failed to create note");
    } finally {
      setLoadingCreate(false);
    }
  };

  /* ================= REVISION LOGIC ================= */

  const revisionNotes = notes
    .filter((n) => n.needsRevision)
    .sort((a, b) => (b.editCount || 0) - (a.editCount || 0));

  const totalRevisionNotes = revisionNotes.length;

  const [completed, setCompleted] = useState({});

  useEffect(() => {
    const initial = {};
    revisionNotes.forEach((n) => {
      initial[n._id] = false;
    });
    setCompleted(initial);
  }, [totalRevisionNotes]);

  const completedCount = Object.values(completed).filter(Boolean).length;
  const pendingCount = totalRevisionNotes - completedCount;

  const progress =
    totalRevisionNotes === 0
      ? 0
      : Math.round((completedCount / totalRevisionNotes) * 100);

  const toggleComplete = (id) => {
    setCompleted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  /* ================= LOADING PLACEHOLDER ================= */

  if (loadingNotes) return <PageSkeleton />;

  /* ================= UI ================= */

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col">
        {/* NAVBAR */}
        <div className="sticky top-0 z-40 bg-[#0b0f1a]/80 backdrop-blur-md border-b border-white/10">
          <CoderNavbar />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-1 gap-8 px-10 py-8">

          {/* NOTES COLUMN */}
          <div className="flex-1">
            {/* FIXED SEARCH BAR */}
            <div className="sticky top-24 z-30 bg-[#0b0f1a] pb-6">
              <div className="flex items-center gap-4">

                {/* SEARCH INPUT */}
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                  <Search size={16} className="text-gray-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search problems..."
                    className="bg-transparent outline-none w-64 text-sm placeholder-gray-500"
                  />
                </div>

                {/* TAG FILTER */}
                <Dropdown
                  value={selectedTag}
                  options={allTags}
                  onChange={setSelectedTag}
                  width="w-44"
                />

                {/* DIFFICULTY FILTER */}
                <Dropdown
                  value={difficultyFilter}
                  options={["All", "Easy", "Medium", "Hard"]}
                  onChange={setDifficultyFilter}
                  width="w-36"
                />

                {/* CLEAR */}
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedTag("All");
                    setDifficultyFilter("All");
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                >
                  <X size={14} /> Clear
                </button>
              </div>
            </div>

            {/* NOTES GRID */}
            {filteredNotes.length === 0 ? (
              <p className="text-gray-400 mt-10">No problems found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {filteredNotes.map((note) => (
                  <div
                    key={note._id}
                    onClick={() => navigate(`/codernotes/${note._id}`)}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-purple-500/40 transition cursor-pointer"
                  >
                    <h3 className="text-base font-semibold mb-1">{note.title}</h3>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{note.difficulty}</span>
                      {note.companies?.length > 0 && (
                        <span>{note.companies[0]}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* REVISION DESK */}
          <div className="w-[340px] sticky top-28 h-fit bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <BookOpen className="text-purple-400" size={18} />
              <h2 className="text-base font-semibold text-white">Revision Desk</h2>
            </div>

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
                revisionNotes.map((note) => (
                  <div
                    key={note._id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:bg-white/5 transition"
                  >
                    <input
                      type="checkbox"
                      checked={completed[note._id] || false}
                      onChange={() => toggleComplete(note._id)}
                      className="w-4 h-4 accent-purple-500"
                    />

                    <div
                      onClick={() => navigate(`/codernotes/${note._id}`)}
                      className="flex-1 cursor-pointer"
                    >
                      <p className="text-sm font-medium text-white hover:text-purple-400 transition">
                        {note.title}
                      </p>

                      <span className="text-xs text-gray-400">
                        {note.difficulty}
                      </span>
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
            className="
              fixed bottom-8 right-8 z-50
              flex items-center gap-3
              px-7 py-3.5 rounded-xl
              text-white font-semibold text-base
              bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600
              shadow-2xl shadow-purple-900/40
              border border-white/10
              backdrop-blur-md
              hover:scale-105
              hover:shadow-purple-900/60
              transition-all duration-300
              active:scale-95
            "
          >
            <Plus size={18} className="stroke-[2.5]" />
            New Note
          </button>
        </div>

        {/* CREATE MODAL */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#0f1422] border border-white/10 rounded-2xl w-[420px] p-6 shadow-xl">
              <h2 className="text-lg font-semibold mb-6">Create New Note</h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Problem name (Two Sum)"
                className="w-full bg-white/5 border border-white/10 px-4 py-2.5 rounded-lg mb-4 outline-none text-sm"
              />

              <div className="grid grid-cols-2 gap-4 mb-4">
                <Dropdown
                  value={difficulty}
                  options={["Easy", "Medium", "Hard"]}
                  onChange={setDifficulty}
                />

                <Dropdown
                  value={priority}
                  options={["Low", "Medium", "High"]}
                  onChange={setPriority}
                />
              </div>

              <input
                value={companies}
                onChange={(e) => setCompanies(e.target.value)}
                placeholder="Companies (Google, Amazon...)"
                className="w-full bg-white/5 border border-white/10 px-4 py-2.5 rounded-lg mb-4 text-sm"
              />

              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags (array, dp, graph...)"
                className="w-full bg-white/5 border border-white/10 px-4 py-2.5 rounded-lg mb-6 text-sm"
              />
              

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreate(false)}
                  className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm"
                >
                  Cancel
                </button>

                <button
                  disabled={loadingCreate}
                  onClick={handleCreateNote}
                  className="
                    px-6 py-2.5 rounded-xl
                    text-sm font-semibold text-white
                    bg-gradient-to-r from-pink-600/20 to-purple-600/20
                    border border-pink-500/20
                    shadow-lg shadow-purple-900/30
                    backdrop-blur-md
                    transition-all duration-200
                    hover:from-pink-600/30 hover:to-purple-600/30
                    hover:shadow-purple-900/50
                    disabled:opacity-60 disabled:cursor-not-allowed
                  "
                >
                  {loadingCreate ? "Creating..." : "Create Note"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CoderNotes;

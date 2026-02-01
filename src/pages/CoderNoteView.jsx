import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import CoderNavbar from "../components/CoderNavbar";
import DrawingCanvas from "../components/coderNotes/DrawingCanvas";

import { coderNotesMock } from "../services/coderNotesMock";

const CoderNoteView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const existingNote = coderNotesMock.find((n) => n.id === id);

  const [note, setNote] = useState(existingNote);

  if (!note) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-6">
          <h2 className="text-xl font-semibold">Note not found</h2>
        </div>
      </div>
    );
  }

  /* ---------- ACTIONS ---------- */

  const handleSave = () => {
    console.log("Saved note (frontend):", note);
    alert("Note saved (frontend only)");
  };

  const handleDelete = () => {
    if (confirm("Delete this coder note?")) {
      navigate("/codernotes");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        <CoderNavbar />

        {/* CONTENT */}
        <div className="p-6 max-w-4xl">
          {/* HEADER */}
          <div className="mb-6 space-y-2">
            <input
              value={note.title}
              onChange={(e) =>
                setNote({ ...note, title: e.target.value })
              }
              className="text-2xl font-semibold w-full border-b pb-1 bg-transparent"
              placeholder="Problem title"
            />

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <select
                value={note.difficulty}
                onChange={(e) =>
                  setNote({ ...note, difficulty: e.target.value })
                }
                className="border rounded px-2 py-1"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

              <input
                value={note.companies.join(", ")}
                onChange={(e) =>
                  setNote({
                    ...note,
                    companies: e.target.value
                      .split(",")
                      .map((c) => c.trim())
                      .filter(Boolean),
                  })
                }
                className="border rounded px-2 py-1"
                placeholder="Companies (Google, Amazon...)"
              />
            </div>
          </div>

          {/* NOTES / EXPLANATION */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              🧠 Notes / Explanation
            </h2>
            <textarea
              value={note.explanation}
              onChange={(e) =>
                setNote({ ...note, explanation: e.target.value })
              }
              className="w-full bg-white p-4 rounded border min-h-[120px]"
              placeholder="Explain intuition, logic, mistakes, edge cases..."
            />
          </section>

          {/* DRAWING */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2">
              ✏️ Visual Notes
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              Draw diagrams, trees, graphs, or DP tables to improve recall.
            </p>

            <DrawingCanvas
              value={note.whiteboardImage}
              onSave={(img) =>
                setNote({ ...note, whiteboardImage: img })
              }
            />
          </section>

          {/* CODE */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              💻 Code
            </h2>
            <textarea
              value={note.code}
              onChange={(e) =>
                setNote({ ...note, code: e.target.value })
              }
              className="w-full bg-black text-green-400 p-4 rounded font-mono text-sm min-h-[180px]"
              placeholder="Write your solution here..."
            />
          </section>

          {/* FOOTER ACTIONS */}
          <div className="flex justify-between items-center mt-8">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={note.revised}
                onChange={(e) =>
                  setNote({ ...note, revised: e.target.checked })
                }
              />
              Mark as revised
            </label>

            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="px-4 py-2 border rounded"
              >
                Delete
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoderNoteView;

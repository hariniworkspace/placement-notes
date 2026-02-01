import { useNavigate } from "react-router-dom";
import { BookOpen, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

const RevisionPanel = ({ notes }) => {
  const navigate = useNavigate();

  // only notes marked for revision
  const revisionNotes = notes
    .filter((n) => n.needsRevision)
    .sort((a, b) => (b.editCount || 0) - (a.editCount || 0)); // weakest first

  const totalRevisionNotes = revisionNotes.length;

  const [completed, setCompleted] = useState({});

  // reset when revision list changes
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

  return (
    <div className="w-[360px] p-6 bg-[#f7f9fc] border-l">
      <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            Revision Desk
          </h2>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Revision Progress</span>
            <span className="font-medium text-gray-800">{progress}%</span>
          </div>

          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Completed: {completedCount}</span>
            <span>Pending: {pendingCount}</span>
          </div>
        </div>

        {/* Topics to Revise */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <CheckCircle size={16} className="text-indigo-500" />
            Topics to Revise
          </h3>

          {revisionNotes.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6">
              No revision topics yet 🎯
            </p>
          ) : (
            <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
              {revisionNotes.map((note) => (
                <div
                  key={note._id}
                  className="group flex items-center gap-3 rounded-xl border px-4 py-3 hover:shadow-md hover:border-indigo-200 transition-all"
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={completed[note._id] || false}
                    onChange={() => toggleComplete(note._id)}
                    className="w-4 h-4 accent-indigo-600"
                  />

                  {/* Content */}
                  <div
                    onClick={() => navigate(`/codernotes/${note._id}`)}
                    className="flex-1 cursor-pointer"
                  >
                    <p className="font-medium text-gray-800 group-hover:text-indigo-600 transition">
                      {note.title}
                    </p>

                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">
                        {note.difficulty}
                      </span>

                      <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                        Revise
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevisionPanel;

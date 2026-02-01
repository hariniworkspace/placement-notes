import { useNavigate } from "react-router-dom";

const NoteRow = ({ note }) => {
  const navigate = useNavigate();

  // SAFETY GUARDS
  const rawDifficulty = note?.difficulty ?? "";
  const normalized = rawDifficulty.toLowerCase().trim();

  let difficultyColor = "#6b7280"; // gray default

  if (normalized.startsWith("e")) {
    difficultyColor = "#16a34a"; // green
  } else if (normalized.startsWith("m")) {
    difficultyColor = "#f59e0b"; // yellow
  } else if (normalized.startsWith("h")) {
    difficultyColor = "#dc2626"; // red
  }

  return (
    <div
      onClick={() => {
  console.log("CLICKED NOTE", note._id);
  navigate(`/codernotes/${note._id}`);
}}

      className="flex items-center px-6 py-4 border-b hover:bg-gray-50 cursor-pointer"
    >
      {/* LEFT — TITLE */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {note.revision?.isMarked && (
            <span className="text-green-600 text-sm">✔</span>
          )}
          <span className="font-medium text-gray-800">
            {note.title}
          </span>
        </div>
      </div>

      {/* RIGHT — DIFFICULTY */}
      <div className="w-28 text-right">
        <span
          className="font-medium"
          style={{ color: difficultyColor }}
        >
          {rawDifficulty}
        </span>
      </div>

      {/* FAR RIGHT — COMPANY */}
      <div className="w-16 text-right">
        <span className="text-gray-500 text-sm truncate block">
          {Array.isArray(note.companies)
            ? note.companies.join(", ")
            : ""}
        </span>
      </div>
    </div>
  );
};

export default NoteRow;

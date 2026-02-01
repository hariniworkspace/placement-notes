import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Pin,
  PinOff,
  Archive,
  ArchiveRestore,
  Copy,
  Lock,
  Unlock,
  Trash2,
  MoreVertical,
} from "lucide-react";

const NoteCard = ({ note, onDelete, onUpdate, onDuplicate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const close = (e) =>
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      setMenuOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.01 }}
      className="
        relative p-5 rounded-2xl border border-white/10
        bg-white/5 backdrop-blur-xl
        hover:border-purple-500/40 hover:bg-white/10
        transition-all duration-300
        flex flex-col
      "
    >
      {/* PIN BADGE */}
      {note.pinned && (
        <div className="flex items-center gap-1 text-[10px] font-bold text-purple-400 mb-2 uppercase tracking-wider">
          <Pin size={12} />
          Pinned
        </div>
      )}

      {/* TITLE */}
      <h3 className="font-semibold text-lg text-white leading-tight">
        {note.title}
      </h3>

      {/* CONTENT */}
      <p
        className={`text-sm mt-2 flex-1 text-gray-400 leading-relaxed ${
          note.locked ? "blur-sm select-none" : ""
        }`}
      >
        {note.content}
      </p>

      {/* LOCK CTA */}
      {note.locked && (
        <button
          onClick={() => onUpdate(note._id, { locked: false })}
          className="mt-3 text-xs text-purple-400 hover:text-purple-300 transition"
        >
          🔓 Unlock note
        </button>
      )}

      {/* MENU */}
      <div ref={menuRef} className="relative mt-4 flex justify-end">
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="p-2 rounded-lg hover:bg-white/10 transition"
        >
          <MoreVertical size={18} />
        </button>

        {menuOpen && (
          <div className="
            absolute right-0 bottom-12 w-48
            bg-[#0b0f1a] border border-white/10 rounded-xl
            shadow-2xl overflow-hidden z-30
          ">
            <MenuItem
              onClick={() => onUpdate(note._id, { pinned: !note.pinned })}
              icon={note.pinned ? PinOff : Pin}
              label={note.pinned ? "Unpin" : "Pin"}
            />

            <MenuItem
              onClick={() => onUpdate(note._id, { archived: !note.archived })}
              icon={note.archived ? ArchiveRestore : Archive}
              label={note.archived ? "Unarchive" : "Archive"}
            />

            <MenuItem
              onClick={() => onDuplicate(note)}
              icon={Copy}
              label="Duplicate"
            />

            <MenuItem
              onClick={() => onUpdate(note._id, { locked: !note.locked })}
              icon={note.locked ? Unlock : Lock}
              label={note.locked ? "Unlock" : "Lock"}
            />

            <MenuItem
              onClick={onDelete}
              icon={Trash2}
              label="Delete"
              danger
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ================= MENU ITEM ================= */

const MenuItem = ({ icon: Icon, label, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`
      w-full px-4 py-3 text-sm flex items-center gap-3
      hover:bg-white/5 transition
      ${danger ? "text-red-400 hover:text-red-300" : "text-gray-300"}
    `}
  >
    <Icon size={16} />
    {label}
  </button>
);

export default NoteCard;

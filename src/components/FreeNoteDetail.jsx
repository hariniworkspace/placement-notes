// FreeNoteDetail.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  CheckCircle,
} from "lucide-react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import Sidebar from "./Sidebar";
import CoderNavbar from "./CoderNavbar";

/* ================= Thought Block ================= */

const ThoughtBlock = ({ block, updateBlock, deleteBlock }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your thoughts for this section...",
      }),
    ],
    content: block.content,
    onUpdate: ({ editor }) => {
      updateBlock(block.id, editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[140px] text-sm",
      },
    },
  });

  return (
    <div className="bg-[#111827] border border-white/10 rounded-lg p-5 relative group">
      <p className="text-xs text-gray-500 mb-1">Section Title</p>

      <input
        value={block.title}
        onChange={(e) =>
          updateBlock(block.id, block.content, e.target.value)
        }
        placeholder="Eg: Key Points / Definition / Interview Questions"
        className="w-full bg-transparent text-sm font-semibold mb-4 focus:outline-none text-purple-300 border-b border-white/10 pb-2"
      />

      <p className="text-xs text-gray-500 mb-2">Your Notes</p>

      <EditorContent editor={editor} />

      <button
        onClick={() => deleteBlock(block.id)}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-red-400"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};

/* ================= Delete Dialog ================= */

const DeleteDialog = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-[#111827] border border-white/10 rounded-xl w-[420px] p-8 shadow-2xl">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Delete this Note?
        </h2>
        <p className="text-sm text-gray-400 mb-8">
          This action cannot be undone. All your thoughts inside this note will
          be permanently removed.
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= Main Page ================= */

const FreeNoteDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ TITLE COMES FROM CREATOR PAGE
  const pageTitle = location.state?.title || "Untitled Note";

  const [needsRevision, setNeedsRevision] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [blocks, setBlocks] = useState([
    { id: Date.now(), title: "", content: "" },
  ]);

  const addBlock = () => {
    setBlocks([...blocks, { id: Date.now(), title: "", content: "" }]);
  };

  const updateBlock = (id, content, title) => {
    setBlocks(
      blocks.map((b) =>
        b.id === id
          ? { ...b, content: content ?? b.content, title: title ?? b.title }
          : b
      )
    );
  };

  const deleteBlock = (id) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const handleDeleteNote = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
      <Sidebar />

      {showDeleteDialog && (
        <DeleteDialog
          onCancel={() => setShowDeleteDialog(false)}
          onConfirm={handleDeleteNote}
        />
      )}

      <div className="flex-1 ml-64 flex flex-col">
        <div className="sticky top-0 z-40 bg-[#0b0f1a]/80 border-b border-white/10">
          <CoderNavbar />
        </div>

        <div className="flex-1 overflow-y-auto px-24 py-14 pb-32">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-white/10"
            >
              <ArrowLeft size={22} />
            </button>

            {/* ✅ Same style as CoderNoteDetail */}
            <div className="text-3xl font-semibold w-full border-b border-white/10 pb-2">
              {pageTitle}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-10">
            {blocks.map((block) => (
              <ThoughtBlock
                key={block.id}
                block={block}
                updateBlock={updateBlock}
                deleteBlock={deleteBlock}
              />
            ))}
          </div>

          <button
            onClick={addBlock}
            className="mt-10 flex items-center gap-2 text-purple-400 hover:text-purple-500"
          >
            <Plus size={18} />
            Add Thought
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="fixed bottom-0 left-64 right-0 z-50 border-t border-white/10 bg-[#0b0f1a]/95 px-24 py-4 flex justify-between">
          <label className="flex items-center gap-2 text-purple-400 font-medium">
            <input
              type="checkbox"
              checked={needsRevision}
              onChange={() => setNeedsRevision(!needsRevision)}
              className="w-5 h-5 accent-purple-500"
            />
            <CheckCircle size={18} />
            Mark for Revision
          </label>

          <div className="flex gap-6">
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="text-red-400 hover:text-red-500 flex gap-2"
            >
              <Trash2 size={18} />
              Delete
            </button>

            <button className="px-6 py-2 bg-purple-600 rounded-lg flex gap-2 hover:bg-purple-700">
              <Save size={18} />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeNoteDetail;

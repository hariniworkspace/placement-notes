import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import Sidebar from "../components/Sidebar";
import CoderNavbar from "../components/CoderNavbar";
import DeleteDialog from "../components/DeleteDialog";

import {
  getCnNoteById,
  updateCnNote,
  deleteCnNote,
} from "../services/cnNoteService";

/* ================= Thought Block ================= */

const ThoughtBlock = ({ block, updateBlock, deleteBlock }) => {
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: "Write your CN notes for this section...",
        }),
      ],
      content: block.content,
      onUpdate: ({ editor }) => {
        updateBlock(block._id, editor.getHTML());
      },
      editorProps: {
        attributes: {
          class: "focus:outline-none min-h-[140px] text-sm",
        },
      },
    },
    [block._id]
  );

  return (
    <div className="bg-[#111827] border border-white/10 rounded-lg p-5 relative group">
      <p className="text-xs text-gray-500 mb-1">Section Title</p>

      <input
        value={block.title}
        onChange={(e) =>
          updateBlock(block._id, block.content, e.target.value)
        }
        placeholder="Eg: Concept / Example / Diagram"
        className="w-full bg-transparent text-sm font-semibold mb-4 focus:outline-none text-purple-300 border-b border-white/10 pb-2"
      />

      <p className="text-xs text-gray-500 mb-2">Your Notes</p>
      <EditorContent editor={editor} />

      <button
        onClick={() => deleteBlock(block._id)}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-red-400"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};

/* ================= Main Page ================= */

const CnDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getCnNoteById(id);
      setNote(data);
    })();
  }, [id]);

  const addBlock = () => {
    setNote({
      ...note,
      blocks: [...note.blocks, { title: "", content: "" }],
    });
  };

  const updateBlock = (blockId, content, title) => {
    const updated = note.blocks.map((b) =>
      b._id === blockId
        ? { ...b, content: content ?? b.content, title: title ?? b.title }
        : b
    );
    setNote({ ...note, blocks: updated });
  };

  const deleteBlock = (blockId) => {
    setNote({
      ...note,
      blocks: note.blocks.filter((b) => b._id !== blockId),
    });
  };

  const handleSave = async () => {
    await updateCnNote(id, {
      blocks: note.blocks,
      needsRevision: note.needsRevision,
    });
    toast.success("Note saved");
  };

  const handleDelete = async () => {
    await deleteCnNote(id);
    navigate("/cn");
  };

  if (!note) return null;

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
      <Sidebar />

      {showDeleteDialog && (
        <DeleteDialog
          title="CN Note"
          onCancel={() => setShowDeleteDialog(false)}
          onConfirm={handleDelete}
        />
      )}

      <div className="flex-1 ml-64 flex flex-col">
        <CoderNavbar />

        <div className="flex-1 overflow-y-auto px-24 py-14 pb-32">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-white/10"
            >
              <ArrowLeft size={22} />
            </button>

            <div className="text-3xl font-semibold w-full border-b border-white/10 pb-2">
              {note.title}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-10">
            {note.blocks.map((block) => (
              <ThoughtBlock
                key={block._id}
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

        {/* CODER STYLE BOTTOM BAR */}
        <div className="fixed bottom-0 left-64 right-0 z-50 border-t border-white/10 bg-[#0b0f1a]/95 px-10 py-4 flex justify-between items-center">
          <label className="flex items-center gap-2 cursor-pointer text-purple-400 font-medium">
            <input
              type="checkbox"
              checked={note.needsRevision || false}
              onChange={() =>
                setNote({ ...note, needsRevision: !note.needsRevision })
              }
              className="w-5 h-5 accent-purple-500"
            />
            <CheckCircle size={18} />
            Mark for Revision
          </label>

          <div className="flex gap-4">
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="flex items-center gap-2 border border-red-500/30 px-5 py-2 rounded-lg text-red-400 hover:bg-red-500/10"
            >
              <Trash2 size={18} />
              Delete
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#141827] border border-white/10 px-6 py-2 rounded-lg hover:border-purple-400/40 transition"
            >
              <Save size={18} />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CnDetail;

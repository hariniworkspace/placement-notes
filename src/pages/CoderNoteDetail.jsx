import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  ArrowLeft,
  Trash2,
  Save,
  CheckCircle,
  ChevronDown,
  ExternalLink,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import CoderNavbar from "../components/CoderNavbar";

import {
  getCoderNoteById,
  updateCoderNote,
  deleteCoderNote,
  toggleRevision,
} from "../services/coderNoteService";

const emptyApproach = {
  intuition: "",
  logic: "",
  code: "",
  time: "",
  space: "",
  images: [],
};

const SectionTitle = ({ icon, title }) => (
  <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-300">
    <span>{icon}</span>
    {title}
  </h3>
);

/* 🔗 Clickable Link Field */
const LinkInput = ({ value, onChange, placeholder }) => (
  <div className="flex items-center gap-2 bg-[#0f172a] border border-white/10 rounded-lg px-3">
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="flex-1 bg-transparent py-3 outline-none text-sm"
    />
    {value && (
      <a href={value} target="_blank" rel="noreferrer">
        <ExternalLink size={18} className="text-purple-400" />
      </a>
    )}
  </div>

);
const DeleteDialog = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative bg-[#111827] border border-white/10 rounded-xl w-[420px] p-8 shadow-2xl">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Delete this Note?
        </h2>
        <p className="text-sm text-gray-400 mb-8">
          This action cannot be undone. All your approaches, images and notes will be permanently removed.
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


/* 🖼 Image Slot — FIXED */

const ImageSlot = ({ images = [], setImages }) => {
  const fileRef = useRef();

  const uploadToServer = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const token = localStorage.getItem("token");

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/codernotes/upload-image`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data = await res.json();

  
  return `${import.meta.env.VITE_API_URL}${data.imageUrl}`;
};



  const handleFiles = async (files) => {
    const arr = [...images];
    for (let file of files) {
      const url = await uploadToServer(file);
      arr.push(url);
    }
    setImages(arr);
  };

  const handlePaste = async (e) => {
    e.preventDefault();
    const items = e.clipboardData.items;
    for (let item of items) {
      if (item.type.includes("image")) {
        const file = item.getAsFile();
        await handleFiles([file]);
      }
    }
  };

  const removeImage = (idx) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  return (
    <div
      onPaste={handlePaste}
      className="border-2 border-dashed border-green-400/40 rounded-xl p-5 text-center"
    >
      <p className="text-xs text-gray-400 mb-3">
        Paste / Drop / Upload images
      </p>

      <button
        onClick={() => fileRef.current.click()}
        className="bg-green-500 text-white px-4 py-1.5 rounded-lg text-sm"
      >
        Upload Images
      </button>

      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/*"
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />

      {images?.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              <img
                src={img}
                alt=""
                className="rounded-lg border border-white/10 max-h-40 object-cover"
              />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-black/60 p-1 rounded-full hidden group-hover:block"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CoderNoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);



  useEffect(() => {
    (async () => {
      const data = await getCoderNoteById(id);
      setNote({
        ...data,
        brute: data.brute || { ...emptyApproach },
        better: data.better || { ...emptyApproach },
        optimal: data.optimal || { ...emptyApproach },
      });
      setLoading(false);
    })();
  }, [id]);

  const handleToggleRevision = async () => {
    const updated = await toggleRevision(id);
    setNote(updated);
  };

  const handleConfirmDelete = async () => {
    await deleteCoderNote(id);
    navigate("/notes");
  };

  const handleSave = async () => {
    await updateCoderNote(id, note);
    toast.success("Note saved");
  };

  if (loading || !note) return null;

  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-gray-200">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <CoderNavbar />

        <div className="flex-1 overflow-y-auto px-10 py-8 pb-32 space-y-8">


          {/* HEADER (unchanged) */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-white/10">
                <ArrowLeft size={22} />
              </button>

              <div className="text-3xl font-semibold w-full border-b border-white/10 pb-2">
              {note.title || "Untitled Note"}
            </div>


              <span className="px-4 py-1.5 rounded-lg bg-purple-600/20 border border-purple-500/20 text-sm">
                {note.difficulty}
              </span>
            </div>

            {/* 🔗 LINKS */}
            <div className="bg-white/5 border text-orange-400 border-white/10 rounded-xl p-5 grid grid-cols-3 gap-4">
              <LinkInput
                value={note.leetcodeLink}
                onChange={(e) => setNote({ ...note, leetcodeLink: e.target.value })}
                placeholder="LeetCode Link"
              />
              <div className="text-green-500">
                <LinkInput
                value={note.gfgLink}
                onChange={(e) => setNote({ ...note, gfgLink: e.target.value })}
                placeholder="GFG Link"
              />
              </div>
              
              <div className="text-red-500">
                <LinkInput
                value={note.youtubeLink}
                onChange={(e) => setNote({ ...note, youtubeLink: e.target.value })}
                placeholder="YouTube Link"
              />
              </div>
              
            </div>
          </div>

          {/* PROBLEM (unchanged) */}
          <div className="bg-white/5 rounded-xl border border-white/10 p-6">
            <SectionTitle icon="📘" title="Problem Statement" />
            <textarea
              value={note.problem}
              onChange={(e) => setNote({ ...note, problem: e.target.value })}
              className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-4 mt-3 min-h-[140px]"
            />
          </div>

          {/* APPROACHES */}
          {["brute", "better", "optimal"].map((key) => (
            <div key={key} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              <button
                onClick={() =>
                  setActiveAccordion(activeAccordion === key ? null : key)
                }
                className="w-full px-6 py-4 flex justify-between font-semibold hover:bg-white/10"
              >
                🚀 {key.toUpperCase()} APPROACH
                <ChevronDown />
              </button>

              {activeAccordion === key && (
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                  <SectionTitle icon="🧠" title=" Intuition" />
                  <textarea
                    placeholder=""
                    value={note[key].intuition}
                    onChange={(e) =>
                      setNote({
                        ...note,
                        [key]: { ...note[key], intuition: e.target.value },
                      })
                    }
                    className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-4"
                  />
                  <SectionTitle icon="⚙️" title=" Core Logic" />
                  <textarea
                    
                    value={note[key].logic}
                    onChange={(e) =>
                      setNote({
                        ...note,
                        [key]: { ...note[key], logic: e.target.value },
                      })
                    }
                    className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-4"
                  />

                  {/* CODE */}
                  <SectionTitle icon="🛠️" title=" Code" />
                  <textarea
                    value={note[key].code}
                    onChange={(e) =>
                      setNote({
                        ...note,
                        [key]: { ...note[key], code: e.target.value },
                      })
                    }
                    spellCheck={false}
                    className="w-full bg-[#0b1020] text-green-300 border border-white/10 rounded-lg p-5 font-mono text-sm leading-6 min-h-[300px]"
                  />

                  <ImageSlot
                    images={note[key].images || []}
                    setImages={(imgs) =>
                      setNote({
                        ...note,
                        [key]: { ...note[key], images: imgs },
                      })
                    }
                  />
                </div>
              )}
            </div>
          ))}

          {/* MISTAKES (unchanged position) */}
          <div className="bg-white/5 rounded-xl border border-white/10 p-6">
            <SectionTitle icon="⚠️" title="Mistakes I Made" />
            <textarea
              value={note.mistakes}
              onChange={(e) => setNote({ ...note, mistakes: e.target.value })}
              className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-4 mt-3 min-h-[120px]"
            />
          </div>
        </div>
        {showDeleteDialog && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-[#0f172a] border border-white/10 rounded-xl p-8 w-[380px] text-center space-y-6">
      <h2 className="text-lg font-semibold text-red-400">
        Delete this note?
      </h2>
      <p className="text-sm text-gray-400">
        This action cannot be undone.
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowDeleteDialog(false)}
          className="px-5 py-2 rounded-lg border border-white/10 hover:bg-white/10"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            await handleConfirmDelete();
            setShowDeleteDialog(false);
          }}
          className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
)}
{showDeleteDialog && (
  <DeleteDialog
    onCancel={() => setShowDeleteDialog(false)}
    onConfirm={async () => {
      await handleConfirmDelete();
      setShowDeleteDialog(false);
    }}
  />
)}



        {/* BOTTOM BAR — untouched */}
       <div className="fixed bottom-0 left-64 right-0 z-50 border-t border-white/10 bg-[#0b0f1a]/95 px-10 py-4 flex justify-between items-center">

          <label className="flex items-center gap-2 cursor-pointer text-purple-400 font-medium">
            <input
              type="checkbox"
              checked={note.needsRevision || false}
              onChange={handleToggleRevision}
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

export default CoderNoteDetail; 
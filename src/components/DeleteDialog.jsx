const DeleteDialog = ({ title, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative bg-[#111827] border border-white/10 rounded-xl w-[420px] p-8 shadow-2xl">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Delete this {title}?
        </h2>

        <p className="text-sm text-gray-400 mb-8">
          This action cannot be undone.
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

export default DeleteDialog;

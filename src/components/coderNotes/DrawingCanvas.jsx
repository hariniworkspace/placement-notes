import { useRef, useState, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const DrawingCanvas = ({ noteId }) => {
  const canvasRef = useRef(null);

  const [isErasing, setIsErasing] = useState(false);
  const [eraserSize, setEraserSize] = useState(10);
  const [savedImages, setSavedImages] = useState([]);

  const storageKey = `coder-note-drawings-${noteId}`;

  /* LOAD SAVED IMAGES */
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setSavedImages(JSON.parse(stored));
    }
  }, [storageKey]);

  /* SAVE TO STORAGE */
  const persistImages = (images) => {
    setSavedImages(images);
    localStorage.setItem(storageKey, JSON.stringify(images));
  };

  /* DRAW / ERASE */
  const enableDraw = () => {
    setIsErasing(false);
    canvasRef.current.eraseMode(false);
    canvasRef.current.setStrokeWidth(3);
  };

  const enableErase = () => {
    setIsErasing(true);
    canvasRef.current.eraseMode(true);
    canvasRef.current.setStrokeWidth(eraserSize);
  };

  const handleEraserSizeChange = (e) => {
    const size = Number(e.target.value);
    setEraserSize(size);
    canvasRef.current.setStrokeWidth(size);
  };

  /* SAVE CANVAS AS IMAGE */
  const handleSave = async () => {
    const image = await canvasRef.current.exportImage("png");
    const updated = [...savedImages, image];
    persistImages(updated);
    canvasRef.current.clearCanvas();
  };

  /* DELETE IMAGE */
  const handleDelete = (index) => {
    const updated = savedImages.filter((_, i) => i !== index);
    persistImages(updated);
  };

  /* EDIT IMAGE */
  const handleEdit = async (image) => {
    canvasRef.current.clearCanvas();
    await canvasRef.current.loadPaths(
      await canvasRef.current.importImage(image)
    );
  };

  return (
    <div className="bg-white border rounded-lg p-4">
      {/* TOOLBAR */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <button
          onClick={enableDraw}
          className={`px-3 py-1 text-sm border rounded ${
            !isErasing ? "bg-gray-100" : ""
          }`}
        >
          ✏️ Draw
        </button>

        <button
          onClick={enableErase}
          className={`px-3 py-1 text-sm border rounded ${
            isErasing ? "bg-gray-100" : ""
          }`}
        >
          🧽 Erase
        </button>

        {isErasing && (
          <input
            type="range"
            min="5"
            max="40"
            value={eraserSize}
            onChange={handleEraserSizeChange}
          />
        )}

        <button
          onClick={() => canvasRef.current.clearCanvas()}
          className="px-3 py-1 text-sm border rounded"
        >
          🗑 Clear
        </button>

        <button
          onClick={handleSave}
          className="ml-auto bg-indigo-600 text-white px-4 py-1.5 rounded text-sm"
        >
          💾 Save
        </button>
      </div>

      {/* CANVAS */}
      <div className="border rounded overflow-hidden mb-4">
        <ReactSketchCanvas
          ref={canvasRef}
          width="100%"
          height="300px"
          strokeWidth={3}
          strokeColor="#111827"
          canvasColor="#ffffff"
        />
      </div>

      {/* SAVED IMAGES */}
      {savedImages.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-2">
            Saved Illustrations
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {savedImages.map((img, idx) => (
              <div
                key={idx}
                className="border rounded p-2 relative group"
              >
                <img
                  src={img}
                  alt="saved drawing"
                  className="w-full rounded"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleEdit(img)}
                    className="bg-white px-2 py-1 text-xs rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="bg-red-600 text-white px-2 py-1 text-xs rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawingCanvas;

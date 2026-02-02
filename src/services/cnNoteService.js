import API from "./api";

/* ================= GET ALL ================= */
export const getCnNotes = async () => {
  try {
    const { data } = await API.get("/api/cn-notes");
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Get CN Notes Error:", err);
    return [];
  }
};

/* ================= CREATE ================= */
export const createCnNote = async (title) => {
  try {
    const { data } = await API.post("/api/cn-notes", { title });
    return data;
  } catch (err) {
    console.error("Create CN Note Error:", err);
    return null;
  }
};

/* ================= GET ONE ================= */
export const getCnNoteById = async (id) => {
  try {
    const { data } = await API.get(`/api/cn-notes/${id}`);
    return data;
  } catch (err) {
    console.error("Get CN Note By ID Error:", err);
    return null;
  }
};

/* ================= UPDATE ================= */
export const updateCnNote = async (id, note) => {
  try {
    const { data } = await API.put(`/api/cn-notes/${id}`, note);
    return data;
  } catch (err) {
    console.error("Update CN Note Error:", err);
    return null;
  }
};

/* ================= DELETE ================= */
export const deleteCnNote = async (id) => {
  try {
    await API.delete(`/api/cn-notes/${id}`);
  } catch (err) {
    console.error("Delete CN Note Error:", err);
  }
};

import API from "./api";

/* ================= GET ALL ================= */
export const getOopsNotes = async () => {
  try {
    const { data } = await API.get("/api/oops-notes");
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

/* ================= CREATE ================= */
export const createOopsNote = async (title) => {
  try {
    const { data } = await API.post("/api/oops-notes", { title });
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/* ================= GET ONE ================= */
export const getOopsNoteById = async (id) => {
  try {
    const { data } = await API.get(`/api/oops-notes/${id}`);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/* ================= UPDATE ================= */
export const updateOopsNote = async (id, note) => {
  try {
    const { data } = await API.put(`/api/oops-notes/${id}`, note);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/* ================= DELETE ================= */
export const deleteOopsNote = async (id) => {
  try {
    await API.delete(`/api/oops-notes/${id}`);
  } catch (err) {
    console.error(err);
  }
};

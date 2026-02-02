import API from "./api";

/* ================= GET ALL ================= */
export const getAptitudeNotes = async () => {
  try {
    const { data } = await API.get("/api/aptitude-notes");
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Get Aptitude Notes Error:", err);
    return [];
  }
};

/* ================= CREATE ================= */
export const createAptitudeNote = async (note) => {
  try {
    const { data } = await API.post("/api/aptitude-notes", note);
    return data;
  } catch (err) {
    console.error("Create Aptitude Note Error:", err);
    return null;
  }
};

/* ================= GET ONE ================= */
export const getAptitudeNoteById = async (id) => {
  try {
    const { data } = await API.get(`/api/aptitude-notes/${id}`);
    return data;
  } catch (err) {
    console.error("Get Aptitude Note By ID Error:", err);
    return null;
  }
};

/* ================= UPDATE ================= */
export const updateAptitudeNote = async (id, note) => {
  try {
    const { data } = await API.put(`/api/aptitude-notes/${id}`, note);
    return data;
  } catch (err) {
    console.error("Update Aptitude Note Error:", err);
    return null;
  }
};

/* ================= DELETE ================= */
export const deleteAptitudeNote = async (id) => {
  try {
    await API.delete(`/api/aptitude-notes/${id}`);
  } catch (err) {
    console.error("Delete Aptitude Note Error:", err);
  }
};

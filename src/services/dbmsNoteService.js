import API from "./api";

/* ================= GET ALL ================= */
export const getDbmsNotes = async () => {
  try {
    const { data } = await API.get("/api/dbms-notes");
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Get DBMS Notes Error:", err);
    return [];
  }
};

/* ================= CREATE ================= */
export const createDbmsNote = async (title) => {
  try {
    const { data } = await API.post("/api/dbms-notes", { title });
    return data;
  } catch (err) {
    console.error("Create DBMS Note Error:", err);
    return null;
  }
};

/* ================= GET ONE ================= */
export const getDbmsNoteById = async (id) => {
  try {
    const { data } = await API.get(`/api/dbms-notes/${id}`);
    return data;
  } catch (err) {
    console.error("Get DBMS Note By ID Error:", err);
    return null;
  }
};

/* ================= UPDATE ================= */
export const updateDbmsNote = async (id, note) => {
  try {
    const { data } = await API.put(`/api/dbms-notes/${id}`, note);
    return data;
  } catch (err) {
    console.error("Update DBMS Note Error:", err);
    return null;
  }
};

/* ================= DELETE ================= */
export const deleteDbmsNote = async (id) => {
  try {
    await API.delete(`/api/dbms-notes/${id}`);
  } catch (err) {
    console.error("Delete DBMS Note Error:", err);
  }
};
